import React from 'react';
import { AsyncStorage, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { getTheme } from '../theme';

import Button from '../components/Button';
import ProfileInput from '../components/input/ProfileInput';
import ErrorBoundary from '../components/ErrorBoundary';


let mockProfile = {
	fullName: 'Juan Luis Londoño Arias',
	nickName: 'Maluma',
	birthDate: '28/01/1994',
	email: 'maluma@foodie.com',
	country: 'PT',
	imageUrl: 'https://i.sandrohc.net/maluma.jpg'
};

export default class ProfileScreen extends React.Component {

	state = {
		user: null
	};

	constructor(props) {
		super(props);
		this._onLogout = this._onLogout.bind(this);
	}

	componentDidMount() {
		AsyncStorage.getItem('auth')
			.then(data => JSON.parse(data))
			.then(user => {
				console.log('Profile user:', user);

				this.setState({ user: user });
			})
	}

	_onLogout() {
		// TODO
		alert('Logout\n[NOT IMPLEMENTED]');
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source={{ uri: mockProfile.imageUrl, cache: 'force-cache' }} style={ styles.image } />

				<Text style={styles.title}>Account Info</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
									<ProfileInput title="Name" isReadonly={false} value={mockProfile.fullName} />
									<ProfileInput title="Nickname" isReadonly={false} value={mockProfile.nickName} />
									<ProfileInput title="Date of Birth" isReadonly={false} value={mockProfile.birthDate} />
									<ProfileInput title="Email" isReadonly={false} value={mockProfile.email} />
									<ProfileInput title="Country" isReadonly={false} value={mockProfile.country} />
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