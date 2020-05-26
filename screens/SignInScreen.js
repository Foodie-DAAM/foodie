import React from 'react';
import {
	ActivityIndicator,
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
import i18n from 'i18n-js';

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

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: this.colors.light,
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
			color: this.colors.dark,
			paddingRight: 2,
			fontSize: 20,
		},
		error: {
			fontSize: 16,
			color: this.colors.dark,
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
	})

	state = {
		loading: false,
		error: null,
	}

	constructor(props) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
		this._onSuccess = this._onSuccess.bind(this);
		this._onError = this._onError.bind(this);
		this._onCancel = this._onCancel.bind(this);
		this._startLoading = this._startLoading.bind(this);
		this._doAnonymousLogin = this._doAnonymousLogin.bind(this);
		this.inputEmail = null;
		this.inputPassword = null;
	}

	_onSubmit(values, { setSubmitting }) {
		let { email, password } = values;

		console.log('SignInScreen _onSubmit', email, password);

		this._startLoading();

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this._onSuccess)
			.catch(error => {
				setSubmitting(false)
				this._onError(error);
			});
	}

	_onSuccess(user) {
		console.log('Logged in!', user);

		const navigation = this.context;
		navigation.navigate('Main');
	}

	_onError(error) {
		console.log('Error submitting:', error);

		this.setState({
			loading: false,
			error: error.message + ' (' + error.code + ')',
		});
	}

	_onCancel() {
		this.setState({
			loading: false,
			error: null,
		});
	}

	_startLoading() {
		this.setState({
			loading: true,
			error: null,
		});
	}

	_doAnonymousLogin() {
		firebase.auth().signInAnonymously()
			.then(this._onSuccess)
			.catch(this._onError);
	}

	render() {
		const navigation = this.context;

		let error;
		if (this.state.error) {
			error = <Text style={this.styles.error}>{this.state.error}</Text>;
		}

		let content;
		if (this.state.loading) {
			content = <ActivityIndicator animating size={Platform.OS === 'android' ? 60 : 'large'} color={this.colors.primary} />;
		} else {
			content = (
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={this._onSubmit}>
					{props => (
						<View style={this.styles.form}>
							{error}

							<StyledInput
								autoCorrect={false}
								keyboardType="email-address"
								autoCapitalize="none"

								placeholder={i18n.t('profile.email')}
								onChangeText={text => props.setFieldValue('email', text)}
								onBlur={() => props.setTouched('email')}
								error={props.touched.email || props.submitCount > 0 ? props.errors.email : null}

								inputRef={input => this.inputEmail = input}
								returnKeyType={"next"}
								onSubmitEditing={() => this.inputPassword.focus()}
								blurOnSubmit={false}

								icon="mail"
								style={this.styles.input}
							/>

							<StyledInput
								autoCorrect={false}
								secureTextEntry={true}
								autoCapitalize="none"

								placeholder={i18n.t('profile.password')}
								onChangeText={text => props.setFieldValue('password', text)}
								onBlur={() => props.setTouched('password')}
								error={props.touched.password || props.submitCount > 0 ? props.errors.password : null}

								inputRef={input => this.inputPassword = input}
								onSubmitEditing={props.handleSubmit}

								icon="lock"
								style={this.styles.input}
							/>

							<Button title={i18n.t('signIn.titleCaps')}
								onPress={props.handleSubmit}
								disabled={props.isSubmitting}
								style={this.styles.submitButton} />

							<HideWithKeyboard>
								<SignIn onSuccess={this._onSuccess} onError={this._onError} onCancel={this._onCancel} onLoading={this._startLoading} />

								<TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={this.styles.buttonRegister}>
									<Text style={this.styles.text}>{i18n.t('signIn.gotoSignUp.text')}</Text>
									<Text style={[ this.styles.text, { color: this.colors.primary } ]}>{i18n.t('signIn.gotoSignUp.link')}</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={this._doAnonymousLogin} style={this.styles.buttonRegister}>
									<Text style={[ this.styles.text, { color: this.colors.primary } ]}>{i18n.t('signIn.anonymous')}</Text>
								</TouchableOpacity>
							</HideWithKeyboard>

						</View>
					)}
				</Formik>
			)
		}

		return (
			<SafeAreaView style={this.styles.container}>
				<Header title={i18n.t('signIn.title')} />

				<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
					{content}
				</View>
			</SafeAreaView>
		)
	}
}
