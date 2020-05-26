import React from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { NavigationContext } from "@react-navigation/native";
import i18n from 'i18n-js';
import * as firebase from "firebase";
import { getTheme } from '../theme';

import Button from '../components/Button';
import ProfileInput from '../components/input/ProfileInput';
import ErrorBoundary from '../components/ErrorBoundary';


const DEFAULT_PHOTO = 'https://i.sandrohc.net/default-user.png';

export default class ProfileScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: this.colors.light,
		},
		image: {
			width: Dimensions.get('window').width,
			height: 250,
		},
		title: {
			fontWeight: 'bold',
			fontSize: 30,
			color: this.colors.dark,
			marginLeft: 10,
			marginTop: 10,
		},
		contentScrollView: {
			flex: 1,
			marginLeft: 10,
			marginRight: 10,
			marginBottom: 15,
		},
		buttonSave: {
			margin: 10,
			// backgroundColor: 'transparent',
			// borderWidth: 0,
		}
	})

	state = {
		user: {
			uid: null,
			displayName: 'Juan Luis Londoño Arias',
			email: 'maluma@foodie.com',
			photoURL: 'https://i.sandrohc.net/maluma.jpg',
			phoneNumber: '',
		},
		isAnonymous: false,
	}

	constructor(props) {
		super(props);
		this._onSave = this._onSave.bind(this);
	}

	componentDidMount() {
		let user = firebase.auth().currentUser;
		let { uid, displayName, email, photoURL, phoneNumber, isAnonymous } = user;

		console.log(`User: <uid:${uid}, displayName:${displayName}, email:${email}, photo:${photoURL}, phone:${phoneNumber}, anonymous:${isAnonymous}>`);

		this.setState({
			user: {
				uid,
				displayName: isAnonymous ? i18n.t('profile.anonymous') : displayName,
				email,
				photoURL: photoURL || DEFAULT_PHOTO,
				phoneNumber
			},
			isAnonymous,
		});
	}

	_onSave() {
		alert('Save\n[NOT IMPLEMENTED]');
	}

	render() {
		let { uid, displayName, email, photoURL, phoneNumber } = this.state.user;
		let isAnonymous = this.state.isAnonymous;

		return (
			<View style={this.styles.container}>
				<Image source={{ uri: photoURL, cache: 'force-cache' }} style={this.styles.image} accessibilityLabel={i18n.t('profile.photoLabel')} />

				<Text style={this.styles.title}>{i18n.t('profile.title')}</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<ScrollView style={this.styles.scrollView} contentContainerStyle={this.styles.contentScrollView}>
									<ProfileInput title={i18n.t('profile.id')}    isReadonly={true} value={uid} />
									<ProfileInput title={i18n.t('profile.name')}  isReadonly={isAnonymous} value={displayName} />
									<ProfileInput title={i18n.t('profile.email')} isReadonly={isAnonymous} value={email} />
									<ProfileInput title={i18n.t('profile.phone')} isReadonly={isAnonymous} value={phoneNumber} />
								</ScrollView>

								<Button title={i18n.t('profile.save')} style={this.styles.buttonSave} onPress={this._onSave} />
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>
			</View>
		);
	}
}
