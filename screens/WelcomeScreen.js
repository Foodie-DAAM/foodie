import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import { getTheme } from '../theme';

import Header from '../components/Header';
import Button from '../components/Button';


export default class WelcomeScreen extends React.Component {

	theme = getTheme();
	colors = this.theme.colors;
	status = this.theme.status;
	styles = StyleSheet.create({
		safeArea: {
			flex: 1,
			backgroundColor: this.colors.light,
		},
		container: {
			flex: 1,
			justifyContent: 'space-evenly',
		},
		welcome: {
			alignItems: 'center',
		},
		buttons: {
			marginLeft: 50,
			marginRight: 50,
		},
		text: {
			color: this.colors.dark,
		},
	})

	render() {
		return (
			<SafeAreaView style={this.styles.safeArea}>
				<StatusBar barStyle={this.status} backgroundColor="transparent" translucent />
				<Header />

				<View style={this.styles.container}>
					<View style={this.styles.welcome}>
						<Text style={[this.styles.text, { fontWeight: 'bold', fontSize: 22 }]}>
							{i18n.t('welcome.title')}
						</Text>
						<Text style={[this.styles.text, { fontSize: 14 }]}>
							{i18n.t('welcome.slogan')}
						</Text>
					</View>
					<View style={this.styles.buttons}>
						<Button title={i18n.t('signUp.titleCaps')} onPress={() => this.props.navigation.navigate('SignUp')} />
						<Button title={i18n.t('signIn.titleCaps')} secondary onPress={() => this.props.navigation.navigate('SignIn')} style={{ marginTop: 8 }} />
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
