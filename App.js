import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { Ionicons } from "@expo/vector-icons";
import * as Sentry from 'sentry-expo';
import firebase from 'firebase';

import * as i18nConfig from './i18n';
import i18n from 'i18n-js';
import { getTheme, loadTheme } from './theme';


import IngredientsScreen from './screens/IngredientsScreen';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ErrorBoundary from './components/ErrorBoundary';
import RecipeScreen from "./screens/RecipeScreen";
import RecipeStepsScreen from './screens/RecipeStepsScreen';
import ProfileScreen from './screens/ProfileScreen';


enableScreens(); // https://reactnavigation.org/docs/react-native-screens
const Stack = createStackNavigator();

export default class App extends React.Component {

	colors = getTheme().colors;
	static styles = StyleSheet.create({
		loading: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	})

	state = {
		loadingThemeData: true,
		loadingUserData: true,
		error: null,
	}

	constructor(props) {
		super(props);
		this._initialScreen = this._initialScreen.bind(this);
	}

	componentDidMount() {
		// Load user data
		let unsubscribe = firebase.auth().onAuthStateChanged(_ => {
			console.log('[App]', 'Loaded user data');
			unsubscribe();
			this.setState({
				loadingUserData: false,
			});
		});

		// Load theme data
		loadTheme().then(theme => {
			console.log('[App]', 'Loaded theme:', theme);
			this.setState({
				loadingThemeData: false,
			});
		})
	}

	_initialScreen() {
		if (firebase.auth().currentUser) {
			console.log('[App]', 'User is authenticated, redirecting to home screen');
			return 'Main';
		} else {
			console.log('[App]', 'User is NOT authenticated');
			return 'Welcome';
		}
	}

	_renderLoading() {
		return (
			<View style={App.styles.loading}>
				<ActivityIndicator size={Platform.OS === 'android' ? 60 : 'large'} color={this.colors.primary} />
			</View>
		);
	}

	_renderNavigator() {
		return (
			<Stack.Navigator
				initialRouteName={this._initialScreen()}
				headerMode="float"
				screenOptions={{
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
				}}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} options={() => ({ headerShown: false })} />
				<Stack.Screen name="SignIn" component={SignInScreen}   options={() => ({ headerShown: false })} />
				<Stack.Screen name="SignUp" component={SignUpScreen}   options={() => ({ headerShown: false })} />
				<Stack.Screen name="Profile" component={ProfileScreen} options={() => ({ headerShown: false })} />
				<Stack.Screen name="Recipe" component={RecipeScreen}   options={() => ({ headerShown: false })} />
				<Stack.Screen name="RecipeSteps" component={RecipeStepsScreen} options={() => ({ headerShown: false })} />
				<Stack.Screen name="Ingredients" component={IngredientsScreen} />
				<Stack.Screen name="Main" component={MainScreen} options={({ navigation, route }) => ({
					headerTitle: this.getHeaderTitle(route),
					headerLeft: props => (
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'menu'}
							size={34}
							style={{ marginLeft: 20, color: 'white' }}
							onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
					)
				})} />
			</Stack.Navigator>
		)
	}

	getHeaderTitle(route) {
		const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'Home';
		switch (routeName) {
			case 'Home':     return i18n.t('nav.home');
			case 'Profile':  return i18n.t('nav.profile');
			case 'Settings': return i18n.t('nav.settings');
		}
	}

	render() {
		let content = this.state.loadingUserData || this.state.loadingThemeData ? this._renderLoading() : this._renderNavigator();

		return (
			<SafeAreaProvider>
				<AppearanceProvider>
					<ErrorBoundary>
						<NavigationContainer>
							{content}
						</NavigationContainer>
					</ErrorBoundary>
				</AppearanceProvider>
			</SafeAreaProvider>
		)
	}
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
	firebase.auth().onAuthStateChanged(user => {
		if (user != null)
			console.log('[Firebase]', 'Authenticated with ' + user.displayName + ' <mail:' + user.email + '> <photo:' + user.photoURL + '>');
		else
			console.log('[Firebase]', 'Unauthenticated');
	});
}

Sentry.init({
	dsn: 'https://1a78220be5554a95aa9c3e8afc0cb0fc@sentry.io/5169592',
	enableInExpoDevelopment: true,
	debug: true
});

i18nConfig.init();