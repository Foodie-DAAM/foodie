import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import * as Sentry from 'sentry-expo';
import firebase from 'firebase';

import { store } from './store';

import IngredientsScreen from './screens/IngredientsScreen';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ErrorBoundary from './components/ErrorBoundary';
import RecipeScreen from "./screens/RecipeScreen";
import ProfileScreen from "./screens/ProfileScreen";

enableScreens(); // https://reactnavigation.org/docs/react-native-screens
const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<AppearanceProvider>
					<ErrorBoundary>
						<NavigationContainer>
							<Stack.Navigator initialRouteName="Welcome"
								headerMode="float"
								screenOptions={{
									headerStyle: {
										backgroundColor: '#f4511e',
									},
									headerTintColor: '#fff',
								}}>
								<Stack.Screen name="Welcome"     component={WelcomeScreen} options={() => ({ headerShown: false })} />
								<Stack.Screen name="SignIn"      component={SignInScreen} options={() => ({ headerShown: false })} />
								<Stack.Screen name="SignUp"      component={SignUpScreen} options={() => ({ headerShown: false })} />
								<Stack.Screen name="Profile"	 component={ProfileScreen} options={() =>({headerShown: false})} />
								<Stack.Screen name="Recipe"      component={RecipeScreen}  options={() => ({ headerShown: false })} />
								<Stack.Screen name="Ingredients" component={IngredientsScreen} />
								<Stack.Screen name="Main"        component={MainScreen}    options={({ navigation }) => ({ headerLeft: props => (
										<Ionicons
											name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'menu'}
											size={34}
											style={{ marginLeft: 20, color: 'white' }}
											onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
									)})} />
							</Stack.Navigator>
						</NavigationContainer>
					</ErrorBoundary>
				</AppearanceProvider>
			</SafeAreaProvider>
		</Provider>
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