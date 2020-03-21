import React from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';
import * as Sentry from 'sentry-expo';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipeScreen from './screens/RecipeScreen';

import Header from "./components/Header";

const Stack = createStackNavigator();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Header />

				{/*<ScrollView style={styles.container}>*/}
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home"    component={HomeScreen} />
					<Stack.Screen name="Login"   component={LoginScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Recipe"  component={RecipeScreen} />
				</Stack.Navigator>
				{/*</ScrollView>*/}
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(192, 192, 192, 0)',
		padding: 15,
	},
});


if (!firebase.apps.length) {
	firebase.initializeApp({
		projectId: 'foodie-daam',
		apiKey: 'AIzaSyB1JoA88dbyHJP5r47AxAE8ZEtJzvi0b6E',
		authDomain: 'foodie-daam.firebaseapp.com',
		databaseURL: 'https://foodie-daam.firebaseio.com',
		storageBucket: 'foodie-daam.appspot.com'
	});

	//firebase.analytics();
	firebase.auth().useDeviceLanguage();
	firebase.auth().onAuthStateChanged((user) => {
		if (user != null) {
			console.log('[Firebase]', 'Authenticated with ' + user.displayName + ' <' + user.email + '>');
		}

		// Do other things
	});
}

Sentry.init({
	dsn: 'https://1a78220be5554a95aa9c3e8afc0cb0fc@sentry.io/5169592',
	enableInExpoDevelopment: true,
	debug: true
});