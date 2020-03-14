import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

import AuthScreen from './components/AuthScreen';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app.</Text>
			<AuthScreen />
		</View>
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