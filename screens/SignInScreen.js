import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as Yup from 'yup'

import * as Google from 'expo-google-app-auth'
import * as firebase from 'firebase'

import { getTheme } from '../theme'

import Header from '../components/Header'
import Button from '../components/Button'
import BasicInput from '../components/BasicInput'


const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required()
		.email("Welp, that's not an email"),
	password: Yup.string()
		.required()
		.min(3, "That can't be very secure")
});

const config = {
	// OAuth 2.0 client ids
	iosClientId: '526860674382-uln1kf86egusrm1f3saaeu5bpkji8ihp.apps.googleusercontent.com',
	iosStandaloneAppClientId: '526860674382-0ronigr9a1n2il4gf18b2mujprfk5qoh.apps.googleusercontent.com',
	androidClientId: '526860674382-60r5t8gufr8knmu1pgo4eqgb2394450m.apps.googleusercontent.com',
	androidStandaloneAppClientId: '526860674382-d84ab335s5r97irdkkdmnkijtnmsf2u4.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
};

export default class SignInScreen extends React.Component {
	state = { user: null, accessToken: null };

	constructor(props) {
		super(props);
		this.inputPassword = null
	}

	componentDidMount() {
		this.initAsync();
	}

	// TODO: remove?
	initAsync = async () => {
		console.log("LOGIN - componentDidMount");
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
			<SafeAreaView style={{ flex: 1 }}>
				<Header title="Login" />

				<View style={{ flex: 1, justifyContent: 'space-evenly' }}>

					<Formik
						initialValues={{ email: '', password: '' }}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>
						{props => (
							<View>
								<BasicInput
									autoCorrect={false}
									keyboardType="email-address"
									autoCapitalize="none"

									placeholder="email"
									onChangeText={text => props.setFieldValue('email', text)}
									onBlur={() => props.setTouched('email')}
									error={props.touched.email || props.submitCount > 0 ? props.errors.email : null}

									returnKeyType={"next"}
									onSubmitEditing={() => { this.inputPassword.focus() }}
									blurOnSubmit={false}
								/>

								<BasicInput
									inputRef={input => { this.inputPassword = input }}
									onSubmitEditing={props.handleSubmit}

									autoCorrect={false}
									secureTextEntry={true}
									autoCapitalize="none"

									placeholder="password"
									onChangeText={text => props.setFieldValue('password', text)}
									onBlur={() => props.setTouched('password')}
									error={props.touched.password || props.submitCount > 0 ? props.errors.password : null}
								/>

								<Button title="SIGN IN" onPress={props.handleSubmit} disabled={props.isSubmitting} style={styles.submitButton} />
							</View>
						)}
					</Formik>

					<View style={{ alignItems: 'center' }}>
						<Text>or sign in with</Text>

						<Text onPress={this.onPress}>{this.state.user ? 'Sign out' : 'Sign in'}</Text>
					</View>

					<TouchableOpacity onPress={() => this.props.navigate('SignUp')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={styles.text}>New user?</Text>
						<Text style={[styles.text, { color: colors.primary }]}>Create an account.</Text>
					</TouchableOpacity>

				</View>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	submitButton: {
		marginLeft: 40,
		marginRight: 40,
	},
	text: {
		padding: 2,
		fontSize: 20,
	}
});