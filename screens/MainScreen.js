import React from 'react';
import {
	StyleSheet,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { getTheme } from '../theme';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';


const Drawer = createDrawerNavigator();

export default class MainScreen extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
		},
	})

	render() {
		return (
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home"      component={HomeScreen} />
				{/*<Drawer.Screen name="MyRecipes" component={MyRecipesScreen} />*/}
				{/*<Drawer.Screen name="Liked"     component={LikedScreen} />*/}
				<Drawer.Screen name="Profile"   component={ProfileScreen} />
				<Drawer.Screen name="Settings"  component={SettingsScreen} />
			</Drawer.Navigator>
		);
	}
}