import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Button from '../components/Button';


export default class WelcomeScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
				<Header />

				<View style={styles.container}>
					<View style={styles.welcome}>
						<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
							Welcome to Foodie!
						</Text>
						<Text>
							where you can find your recipes
						</Text>
					</View>
					<View style={styles.buttons}>
						<Button title="SIGN UP" onPress={() => this.props.navigation.navigate('SignUp')} />
						<Button title="SIGN IN" secondary onPress={() => this.props.navigation.navigate('SignIn')} style={{ marginTop: 10 }} />

						<Button title="HOME" secondary onPress={() => this.props.navigation.navigate('Main')} style={{ marginTop: 10 }} />
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: 'white',
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
});