import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import i18n from 'i18n-js';

import LogoGoogle from '../../assets/signin/google.svg';


const config = {
	// OAuth 2.0 client ids
	iosClientId: '526860674382-uln1kf86egusrm1f3saaeu5bpkji8ihp.apps.googleusercontent.com',
	iosStandaloneAppClientId: '526860674382-0ronigr9a1n2il4gf18b2mujprfk5qoh.apps.googleusercontent.com',
	androidClientId: '526860674382-60r5t8gufr8knmu1pgo4eqgb2394450m.apps.googleusercontent.com',
	androidStandaloneAppClientId: '526860674382-d84ab335s5r97irdkkdmnkijtnmsf2u4.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

export default class SignInGoogle extends React.PureComponent {

	static styles = StyleSheet.create({
		touchable: {
			padding: 20,
		},
		container: {
			backgroundColor: 'white',
			borderRadius: 120,
		},
	})

	constructor(props) {
		super(props);
		this.signInAsync = this.signInAsync.bind(this);
	}

	signInAsync = async () => {
		try {
			this.props.onLoading();

			const { type, idToken } = await Google.logInAsync(config);
			if (type !== 'success') {
				this.props.onCancel();
				return;
			}

			const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
			firebase.auth().signInWithCredential(credential)
				.then(async user => {
					const currentUser = firebase.auth().currentUser;
					// await currentUser.updateEmail(user.additionalUserInfo?.profile?.email);
					await currentUser.updateProfile({
						displayName: user.additionalUserInfo?.profile?.name,
						photoURL: user.additionalUserInfo?.profile?.picture,
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
			<TouchableOpacity style={SignInGoogle.styles.touchable} onPress={this.signInAsync}  accessibilityLabel={i18n.t('signIn.social.google')}>
				<View style={SignInGoogle.styles.container}>
					<LogoGoogle width={60} height={60} />
				</View>
			</TouchableOpacity>
		)
	}
}
