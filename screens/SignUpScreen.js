import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as firebase from 'firebase';
import * as Yup from "yup";
import { Formik } from "formik";
import { getTheme } from '../theme';

import Header from '../components/Header';
import Button from '../components/Button';
import BasicInput from '../components/BasicInput';
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
	state = {
		user: null,
		accessToken: null,
		hasError: false,
		error: '',
	};

	constructor(props) {
		super(props);
		this.inputName = null;
		this.inputEmail = null;
		this.inputPassword = null;
		this.inputConfirm = null;
	}

	register({ name, email, password }) {
		alert("Name: " + name + "\nEmail: " + email + "\nPassword: " + password);

		let _this = this;
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(data => {
				alert('Data:\n' + JSON.stringify(data, null, 2));
			})
			.catch(error => {
				let errorCode = error.code;
				let errorMessage = error.message;

				_this.setState({
					error: errorMessage + ' (' + errorCode + ')'
				});

				alert('Error: ' + _this.state.error + '\n' + JSON.stringify(error, null, 2));
			})
			.then(data => {
				alert('Data 2:\n' + JSON.stringify(data, null, 2));
			});
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Header title="Create an account" />

				<View style={{ flex: 1, justifyContent: 'space-evenly' }}>

					<Formik
						initialValues={{ name: '', email: '', password: '', confirm: '' }}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							//alert(JSON.stringify(values, null, 2));
							this.register(values);

							setTimeout(() => {
								setSubmitting(false);
							}, 400);
						}}
					>
						{props => (
							<View>
								<BasicInput
									autoCorrect={true}
									keyboardType="default"
									autoCapitalize="words"

									placeholder="Full name"
									onChangeText={text => props.setFieldValue('name', text)}
									onBlur={() => props.setTouched('name')}
									error={props.touched.name || props.submitCount > 0 ? props.errors.name : null}

									inputRef={input => { this.inputName = input }}
									returnKeyType={"next"}
									onSubmitEditing={() => { this.inputEmail.focus() }}
									blurOnSubmit={false}

									icon="person"
								/>

								<BasicInput
									autoCorrect={false}
									keyboardType="email-address"
									autoCapitalize="none"

									placeholder="email"
									onChangeText={text => props.setFieldValue('email', text)}
									onBlur={() => props.setTouched('email')}
									error={props.touched.email || props.submitCount > 0 ? props.errors.email : null}

									inputRef={input => { this.inputEmail = input }}
									returnKeyType={"next"}
									onSubmitEditing={() => { this.inputPassword.focus() }}
									blurOnSubmit={false}

									icon="mail"
								/>

								<BasicInput
									autoCorrect={false}
									secureTextEntry={true}
									autoCapitalize="none"

									placeholder="Password"
									onChangeText={text => props.setFieldValue('password', text)}
									onBlur={() => props.setTouched('password')}
									error={props.touched.password || props.submitCount > 0 ? props.errors.password : null}

									inputRef={input => { this.inputPassword = input }}
									returnKeyType={"next"}
									onSubmitEditing={() => { this.inputConfirm.focus() }}
									blurOnSubmit={false}

									icon="lock"
								/>

								<BasicInput
									autoCorrect={false}
									secureTextEntry={true}
									autoCapitalize="none"

									placeholder="Confirm password"
									onChangeText={text => props.setFieldValue('confirm', text)}
									onBlur={() => props.setTouched('confirm')}
									error={props.touched.confirm || props.submitCount > 0 ? props.errors.confirm : null}

									inputRef={input => { this.inputConfirm = input }}
									onSubmitEditing={props.handleSubmit}

									icon="lock"
								/>

								<Button title="SIGN UP" onPress={props.handleSubmit} disabled={props.isSubmitting} style={styles.submitButton} />
							</View>
						)}
					</Formik>

					<SignIn />

					<TouchableOpacity onPress={() => this.props.navigate('SignIn')} style={{ flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={styles.text}>Already have an account?</Text>
						<Text style={[styles.text, { color: colors.primary }]}>Sign in.</Text>
					</TouchableOpacity>

				</View>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	submitButton: {
		marginTop: 8,
		marginLeft: 40,
		marginRight: 40,
	},
	text: {
		paddingRight: 2,
		fontSize: 20,
	}
});