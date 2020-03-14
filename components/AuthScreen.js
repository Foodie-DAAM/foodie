import React from 'react';
import { Text } from 'react-native';
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

export default class AuthScreen extends React.Component {
	state = { user: null, accessToken: null };

	componentDidMount() {
		// this.initAsync();
	}

	// TODO: remove?
	initAsync = async () => {
		await Google.initAsync({ });
		this._syncUserWithStateAsync();
	};

	// TODO: remove?
	_syncUserWithStateAsync = async (accessToken) => {
		const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		this.setState({ user });
	};

	signOutAsync = async () => {
		await Google.logOutAsync({ accessToken, ...config });
		this.setState({ user: null, accessToken: null });
	};

	signInAsync = async () => {
		try {
			const { type, accessToken, user } = await Google.logInAsync(config);

			if (type === 'success') {
				this.setState({ user, accessToken });

				// Authenticate into Firebase
				const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);
				firebase.auth().signInWithCredential(credential).catch((error) => {
					alert('firebase login: Error:' + error);
				});

				alert('login: token: ' + accessToken + '; user: ' + user);
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
		return <Text onPress={this.onPress}>Toggle Auth</Text>;
	}
}