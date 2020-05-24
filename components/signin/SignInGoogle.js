import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import LogoGoogle from '../../assets/signin/google.svg';


const config = {
	// OAuth 2.0 client ids
	iosClientId: '526860674382-uln1kf86egusrm1f3saaeu5bpkji8ihp.apps.googleusercontent.com',
	iosStandaloneAppClientId: '526860674382-0ronigr9a1n2il4gf18b2mujprfk5qoh.apps.googleusercontent.com',
	androidClientId: '526860674382-60r5t8gufr8knmu1pgo4eqgb2394450m.apps.googleusercontent.com',
	androidStandaloneAppClientId: '526860674382-d84ab335s5r97irdkkdmnkijtnmsf2u4.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

export default class SignInGoogle extends React.Component {
	state = {
		user: null,
		accessToken: null
	};

	constructor(props) {
		super(props);
	}

	signInAsync = async () => {
		try {
			const { type, accessToken, idToken, user } = await Google.logInAsync(config);

			if (type === 'success') {
				this.setState({ user, accessToken });

				// Authenticate into Firebase
				const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
				firebase.auth().signInWithCredential(credential)
					.catch((error) => alert('firebase login: Error:' + error));

				console.log("Logged in with token " + accessToken + " and user:", user.name, user.email, user.photoUrl);
			}
		} catch ({ message }) {
			alert('login: Error:' + message);
		}
	};

	signOutAsync = async () => {
		await Google.logOutAsync({ accessToken, ...config });
		this.setState({ user: null, accessToken: null });
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
			<TouchableOpacity style={styles.touchable} onPress={this.onPress}  accessibilityLabel="Sign-in with Google">
				<View style={styles.container}>
					<LogoGoogle width={60} height={60} />
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20,
	},
	container: {
		backgroundColor: 'white',
		borderRadius: 120,
	},
});