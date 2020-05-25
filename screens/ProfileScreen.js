import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { NavigationContext } from "@react-navigation/native";
import * as firebase from "firebase";
import { getTheme } from '../theme';

import Button from '../components/Button';
import ProfileInput from '../components/input/ProfileInput';
import ErrorBoundary from '../components/ErrorBoundary';


export default class ProfileScreen extends React.Component {
	static contextType = NavigationContext;

	state = {
		user: {
			uid: null,
			displayName: 'Juan Luis Londoño Arias',
			email: 'maluma@foodie.com',
			photoURL: 'https://i.sandrohc.net/maluma.jpg',
			phoneNumber: '',
		},
		isAnonymous: false,
	};

	constructor(props) {
		super(props);
		this._onLogout = this._onLogout.bind(this);
	}

	componentDidMount() {
		let user = firebase.auth().currentUser;
		let { uid, displayName, email, photoURL, phoneNumber, isAnonymous } = user;

		if (isAnonymous) {
			displayName = 'Anonymous User';
		}

		console.log(`User: <uid:${uid}, displayName:${displayName}, email:${email}, photo:${photoURL}, phone:${phoneNumber}, anonymous:${isAnonymous}>`);

		this.setState({
			user: { uid, displayName, email, photoURL, phoneNumber },
			isAnonymous,
		});
	}

	_onLogout() {
		const navigation = this.context;
		console.log('Attempting to log out...');

		firebase.auth().signOut()
			.then(() => {
				console.log('Logout successful');
				navigation.navigate('Welcome');
			});
	}

	render() {
		let { uid, displayName, email, photoURL, phoneNumber } = this.state.user;
		let isAnonymous = this.state.isAnonymous;

		return (
			<View style={styles.container}>
				<Image source={{ uri: photoURL, cache: 'force-cache' }} style={ styles.image } />

				<Text style={styles.title}>Account Info</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
									<ProfileInput title="ID"    isReadonly={true} value={uid} />
									<ProfileInput title="Name"  isReadonly={isAnonymous} value={displayName} />
									<ProfileInput title="Email" isReadonly={isAnonymous} value={email} />
									<ProfileInput title="Phone" isReadonly={isAnonymous} value={phoneNumber} />
								</ScrollView>

								<Button secondary title="Log Out" style={styles.logOut} onPress={this._onLogout} />
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>
			</View>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.light,
	},
	image: {
		width: Dimensions.get('window').width,
		height: 250,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 30,
		color: colors.dark,
		marginLeft: 5,
		marginTop: 10,
	},
	contentScrollView: {
		flex: 1,
		marginBottom: 15,
	},
	logOut: {
		backgroundColor: 'transparent',
		borderWidth: 0,
	}
})