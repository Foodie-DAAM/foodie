import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance'
import firebase from 'firebase'
import * as Sentry from 'sentry-expo'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import RecipeScreen from './screens/RecipeScreen'
import SettingsScreen from './screens/SettingsScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import WelcomeScreen from './screens/WelcomeScreen'

const Stack = createStackNavigator();

export default function App() {
	return (
		<SafeAreaProvider>
			<AppearanceProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Welcome" headerMode="none">
						<Stack.Screen name="Welcome"  component={WelcomeScreen} />
						<Stack.Screen name="Home"     component={HomeScreen} />
						<Stack.Screen name="SignIn"   component={SignInScreen} />
						<Stack.Screen name="SignUp"   component={SignUpScreen} />
						<Stack.Screen name="Profile"  component={ProfileScreen} />
						<Stack.Screen name="Settings" component={SettingsScreen} />
						<Stack.Screen name="Recipe"   component={RecipeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</AppearanceProvider>
		</SafeAreaProvider>
	);
}


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