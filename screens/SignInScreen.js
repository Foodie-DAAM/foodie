import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import { Formik } from 'formik';
import * as Yup from 'yup';

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
		user: null, accessToken: null
	};

	constructor(props) {
		super(props);
		this.inputEmail = null;
		this.inputPassword = null;
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
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
								<StyledInput
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

									inputRef={input => { this.inputPassword = input }}
									onSubmitEditing={props.handleSubmit}

									icon="lock"
									style={styles.input}
								/>

								<Button title="SIGN IN" onPress={props.handleSubmit} disabled={props.isSubmitting} style={styles.submitButton} />
							</View>
						)}
					</Formik>

					<HideWithKeyboard>
						<SignIn />

						<TouchableOpacity onPress={() => this.props.navigate('SignUp')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={styles.text}>New user?</Text>
							<Text style={[styles.text, { color: colors.primary }]}>Create an account.</Text>
						</TouchableOpacity>
					</HideWithKeyboard>

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
	submitButton: {
		marginTop: 10,
		marginLeft: 40,
		marginRight: 40,
	},
	text: {
		color: colors.dark,
		paddingRight: 2,
		fontSize: 20,
	},
	input: {
		marginBottom: 10,
		marginLeft: 40,
		marginRight: 40,
	}
});