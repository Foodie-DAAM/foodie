import React from 'react';
import {
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

import LogoFacebook from '../../assets/signin/facebook-2-opt.svg';


const FACEBOOK_APP_ID = "780679612335829";

export default class SignInFacebook extends React.Component {
	state = {
		user: null,
		token: null,
	};

	onPress = async () => {
		try {
			const permissions = [ 'public_profile', 'email' ];

			console.log("Facebook.initializeAsync");
			await Facebook.initializeAsync(FACEBOOK_APP_ID);
			console.log("Facebook.logInWithReadPermissionsAsync");
			const {
				type,
				token,
			} = await Facebook.logInWithReadPermissionsAsync({permissions});

			console.log("Facebook login type: " + type);
			if (type === 'success') {
				await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
				const credential = firebase.auth.FacebookAuthProvider.credential(token);

				console.log("Firebase login");
				await firebase.auth().signInWithCredential(credential)
					.catch((error) => alert('firebase login: Error:' + error));

				// Get the user's name using Facebook's Graph API
				console.log("Facebook Graph API: " + token);
				const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
				const user = await response.json();
				alert(`Hi ${user.name}!\n` + JSON.stringify(user, null, 2));

				this.setState({ user, token });
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		}
	};

	render() {
		return (
			<TouchableOpacity style={{ margin: 10, backgroundColor: '#1877f2', borderRadius: 120 }} onPress={this.onPress}>
				<LogoFacebook width={50} height={50} fill="#fff" style={{ borderRadius: 50 }} />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
});