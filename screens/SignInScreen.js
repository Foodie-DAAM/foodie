import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import { Formik } from 'formik';
import * as Yup from 'yup';
import * as firebase from 'firebase';

import { getTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';
import StyledInput from '../components/input/StyledInput';
import SignIn from '../components/signin/SignIn';


const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required()
		.email("enter a valid email"),
	password: Yup.string()
		.required()
		.min(6, "choose a stronger password")
});

export default class SignInScreen extends React.Component {
	static contextType = NavigationContext;

	state = {
		loading: false,
		error: null,
	};

	constructor(props) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
		this.inputEmail = null;
		this.inputPassword = null;
	}

	_onSubmit(values, { setSubmitting }) {
		const navigation = this.context;
		let { email, password } = values;

		console.log('SignInScreen _onSubmit', email, password);

		this.setState({
			loading: true
		});

		// let _this = this;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(data => {
				this._storeUser(data);
				this.setState({
					loading: false,
					error: null,
				});

				setSubmitting(false);

				// navigation.navigate('Main'); // TODO
			})
			.catch(error => {
				console.log('Error submitting:', error);

				this.setState({
					loading: false,
					error: error.message + ' (' + error.code + ')',
				});

				setSubmitting(false);
			});
	}

	_storeUser(user) {
		console.log('Storing user:', user);

		let newUser = {
			uid: user.uid,
			displayName: user.displayName,
			photo: user.photoURL,
			email: user.email,
			phone: user.phoneNumber,
		}

		AsyncStorage.setItem('auth', JSON.stringify(newUser));
	}

	render() {
		const navigation = this.context;

		let error;
		if (this.state.error) {
			error = <Text style={styles.error}>{this.state.error}</Text>;
		}

		let content;
		if (this.state.loading) {
			content = <ActivityIndicator animating size={Platform.OS === 'android' ? 60 : 'large'} color={colors.primary} />;
		} else {
			content = (
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={this._onSubmit}>
					{props => (
						<View style={styles.form}>
							{error}

							<StyledInput
								autoCorrect={false}
								keyboardType="email-address"
								autoCapitalize="none"

								placeholder="email"
								onChangeText={text => props.setFieldValue('email', text)}
								onBlur={() => props.setTouched('email')}
								error={props.touched.email || props.submitCount > 0 ? props.errors.email : null}

								inputRef={input => this.inputEmail = input}
								returnKeyType={"next"}
								onSubmitEditing={() => this.inputPassword.focus()}
								blurOnSubmit={false}

								icon="mail"
								style={styles.input}
							/>

							<StyledInput
								autoCorrect={false}
								secureTextEntry={true}
								autoCapitalize="none"

								placeholder="password"
								onChangeText={text => props.setFieldValue('password', text)}
								onBlur={() => props.setTouched('password')}
								error={props.touched.password || props.submitCount > 0 ? props.errors.password : null}

								inputRef={input => this.inputPassword = input}
								onSubmitEditing={props.handleSubmit}

								icon="lock"
								style={styles.input}
							/>

							<Button title="SIGN IN"
								onPress={props.handleSubmit}
								disabled={props.isSubmitting}
								style={styles.submitButton} />

							<HideWithKeyboard>
								<SignIn />

								<TouchableOpacity onPress={() => navigation.navigate('SignUp')}
									style={styles.buttonRegister}>
									<Text style={styles.text}>New user?</Text>
									<Text style={[ styles.text, { color: colors.primary } ]}>Create an account.</Text>
								</TouchableOpacity>
							</HideWithKeyboard>

						</View>
					)}
				</Formik>
			)
		}

		return (
			<SafeAreaView style={styles.container}>
				<Header title="Login" />

				<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
					{content}
				</View>
			</SafeAreaView>
		)
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.light,
	},
	form: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	submitButton: {
		marginTop: 10,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 10,
	},
	text: {
		color: colors.dark,
		paddingRight: 2,
		fontSize: 20,
	},
	error: {
		fontSize: 16,
		color: colors.dark,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 20,
	},
	input: {
		marginBottom: 10,
		marginLeft: 40,
		marginRight: 40,
	},
	buttonRegister: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 48,
	},
});