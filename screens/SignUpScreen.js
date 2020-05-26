import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from 'firebase';

import { getTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';
import StyledInput from '../components/input/StyledInput';
import SignIn from '../components/signin/SignIn';


const validationSchema = Yup.object().shape({
	name: Yup.string(),
	email: Yup.string()
		.required()
		.email("enter a valid email"),
	password: Yup.string()
		.required()
		.min(6, "choose a stronger password"),
	confirm: Yup.string().when("password", {
		is: val => val && val.length > 0,
		then: Yup.string()
			.oneOf([Yup.ref("password")], "passwords must match")
			.required()
	}),
});


export default class SignUpScreen extends React.Component {
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
		this.inputName = null;
		this.inputEmail = null;
		this.inputPassword = null;
		this.inputConfirm = null;
	}

	_onSubmit(values, { setSubmitting }) {
		let { name, email, password } = values;

		this._startLoading();

		console.log('SignUpnScreen _onSubmit', name, email, password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				return firebase.auth().currentUser.updateProfile({
					displayName: name
				})
			})
			.then(this._onSuccess)
			.catch(this._onError)
			.finally(() => setSubmitting(false));
	}

	_onSuccess(user) {
		console.log('Registered!', user);

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
					initialValues={{ name: '', email: '', password: '', confirm: '' }}
					validationSchema={validationSchema}
					onSubmit={this._onSubmit}>
					{props => (
						<View style={this.styles.form}>
							{error}

							<StyledInput
								autoCorrect={true}
								keyboardType="default"
								autoCapitalize="words"

								placeholder="Full name"
								onChangeText={text => props.setFieldValue('name', text)}
								onBlur={() => props.setTouched('name')}
								error={props.touched.name || props.submitCount > 0 ? props.errors.name : null}

								inputRef={input => this.inputName = input}
								returnKeyType={"next"}
								onSubmitEditing={() => this.inputEmail.focus()}
								blurOnSubmit={false}

								icon="person"
								style={this.styles.input}
							/>

							<StyledInput
								autoCorrect={false}
								keyboardType="email-address"
								autoCapitalize="none"

								placeholder="Email"
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

								placeholder="Password"
								onChangeText={text => props.setFieldValue('password', text)}
								onBlur={() => props.setTouched('password')}
								error={props.touched.password || props.submitCount > 0 ? props.errors.password : null}

								inputRef={input => this.inputPassword = input}
								returnKeyType={"next"}
								onSubmitEditing={() => this.inputConfirm.focus()}
								blurOnSubmit={false}

								icon="lock"
								style={this.styles.input}
							/>

							<StyledInput
								autoCorrect={false}
								secureTextEntry={true}
								autoCapitalize="none"

								placeholder="Confirm password"
								onChangeText={text => props.setFieldValue('confirm', text)}
								onBlur={() => props.setTouched('confirm')}
								error={props.touched.confirm || props.submitCount > 0 ? props.errors.confirm : null}

								inputRef={input => this.inputConfirm = input}
								onSubmitEditing={props.handleSubmit}

								icon="lock"
								style={this.styles.input}
							/>

							<Button title="SIGN UP"
								onPress={props.handleSubmit}
								disabled={props.isSubmitting}
								style={this.styles.submitButton} />

							<HideWithKeyboard>
								<SignIn onSuccess={this._onSuccess} onError={this._onError} onCancel={this._onCancel} onLoading={this._startLoading} />

								<TouchableOpacity onPress={() => navigation.navigate('SignIn')}
									style={this.styles.buttonRegister}>
									<Text style={this.styles.text}>Already have an account?</Text>
									<Text style={[ this.styles.text, { color: this.colors.primary } ]}>Sign in.</Text>
								</TouchableOpacity>
							</HideWithKeyboard>
						</View>
					)}
				</Formik>
			)
		}

		return (
			<SafeAreaView style={this.styles.container}>
				<Header title="Create an account" />

				<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
					{content}
				</View>
			</SafeAreaView>
		);
	}
}
