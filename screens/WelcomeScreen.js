import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header'
import Button from '../components/Button'


export default class WelcomeScreen extends React.Component {

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
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
						<Button title="SIGN UP" onPress={() => this.props.navigation.navigate('SignUp')} style={{ marginBottom: 10 }} />
						<Button title="SIGN IN" secondary onPress={() => this.props.navigation.navigate('SignIn')} />

						<View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
							<Button title="HOME"     secondary style={{ margin: 0, flexBasis: '100%', height: 60 }} onPress={() => this.props.navigation.navigate('Home')} />
							<Button title="PROFILE"  secondary style={{ margin: 0, flexBasis: '50%', height: 60 }} onPress={() => this.props.navigation.navigate('Profile')} />
							<Button title="SETTINGS" secondary style={{ margin: 0, flexBasis: '50%', height: 60 }} onPress={() => this.props.navigation.navigate('Settings')} />
						</View>
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