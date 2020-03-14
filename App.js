import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipeScreen from './screens/RecipeScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home"    component={HomeScreen} />
					<Stack.Screen name="Login"   component={LoginScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Recipe"  component={RecipeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


// Initialize Firebase
const firebaseConfig = {
	projectId: "foodie-daam",
	apiKey: "AIzaSyB1JoA88dbyHJP5r47AxAE8ZEtJzvi0b6E",
	authDomain: "foodie-daam.firebaseapp.com",
	databaseURL: "https://foodie-daam.firebaseio.com",
	storageBucket: "foodie-daam.appspot.com"
};

firebase.initializeApp(firebaseConfig);
//firebase.analytics();
firebase.auth().useDeviceLanguage();
firebase.auth().onAuthStateChanged((user) => {
	if (user != null) {
		console.log("We are authenticated now!");
	}

	// Do other things
});