import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';

const config = {
	// OAuth 2.0 client ids
	iosClientId: '526860674382-uln1kf86egusrm1f3saaeu5bpkji8ihp.apps.googleusercontent.com',
	iosStandaloneAppClientId: '526860674382-0ronigr9a1n2il4gf18b2mujprfk5qoh.apps.googleusercontent.com',
	androidClientId: '526860674382-60r5t8gufr8knmu1pgo4eqgb2394450m.apps.googleusercontent.com',
	androidStandaloneAppClientId: '526860674382-d84ab335s5r97irdkkdmnkijtnmsf2u4.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

export default class LoginScreen extends React.Component {
	state = { user: null, accessToken: null };

	componentDidMount() {
		this.initAsync();
	}

	// TODO: remove?
	initAsync = async () => {
		console.log("test");
	};

	signOutAsync = async () => {
		await Google.logOutAsync({ accessToken, ...config });
		this.setState({ user: null, accessToken: null });
	};

	signInAsync = async () => {
		try {
			const { type, accessToken, idToken, user } = await Google.logInAsync(config);

			if (type === 'success') {
				this.setState({ user, accessToken });

				// Authenticate into Firebase
				const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
				firebase.auth().signInWithCredential(credential).catch((error) => {
					alert('firebase login: Error:' + error);
				});

				console.log("Logged in with token " + accessToken + " and user:", user.name, user.email, user.photoUrl);
			}
		} catch ({ message }) {
			alert('login: Error:' + message);
		}
	};

	onPress = () => {
		if (this.state.user) {
			this.signOutAsync();
		} else {
			this.signInAsync();
		}
	};

	render() {
		return (
			<SafeAreaView>
				<Text onPress={this.onPress}>{this.state.user ? 'Sign out' : 'Sign in'}</Text>
			</SafeAreaView>
		);
	}
}