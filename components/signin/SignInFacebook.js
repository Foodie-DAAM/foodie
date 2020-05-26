import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import i18n from 'i18n-js';

import LogoFacebook from '../../assets/signin/facebook-2-opt.svg';


const FACEBOOK_APP_ID = "780679612335829";
const permissions = [ 'public_profile', 'email' ];

export default class SignInFacebook extends React.PureComponent {

	static styles = StyleSheet.create({
		touchable: {
			padding: 20,
		},
		container: {
			backgroundColor: '#1877f2',
			borderRadius: 120,
		},
	})

	constructor(props) {
		super(props);
		this.signInAsync = this.signInAsync.bind(this);
	}

	async signInAsync() {
		try {
			this.props.onLoading();

			console.log("Facebook.initializeAsync");
			await Facebook.initializeAsync(FACEBOOK_APP_ID);

			console.log("Facebook.logInWithReadPermissionsAsync");
			const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions });

			console.log("Facebook login type: " + type);
			if (type !== 'success') {
				this.props.onCancel();
				return;
			}

			console.log("Firebase login");
			const credential = firebase.auth.FacebookAuthProvider.credential(token);

			firebase.auth().signInWithCredential(credential)
				.then(async user => {
					const currentUser = firebase.auth().currentUser;
					// await currentUser.updateEmail(user.additionalUserInfo.email);
					await currentUser.updateProfile({
						displayName: user.additionalUserInfo?.name,
						photoURL: user.additionalUserInfo?.picture?.data?.url,
					});

					return user;
				})
				.then(this.props.onSuccess)
				.catch(this.props.onError);


		} catch (error) {
			this.props.onError(error);
		}
	};

	render() {
		return (
			<TouchableOpacity style={SignInFacebook.styles.touchable} onPress={this.signInAsync} accessibilityLabel={i18n.t('signIn.social.facebook')}>
				<View style={SignInFacebook.styles.container}>
					<LogoFacebook width={60} height={60} fill="#fff" />
				</View>
			</TouchableOpacity>
		)
	}
}
