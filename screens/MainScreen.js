import React from 'react';
import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import { getTheme } from '../theme';
import i18n from 'i18n-js';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';


const Drawer = createDrawerNavigator();

export default class MainScreen extends React.Component {
	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
		},
		drawer: {
			backgroundColor: this.colors.lightish,
			width: 240,
		},
		icon: {
		},
	})

	state = {
		dimensions: null,
	}

	componentDidMount() {
		this.setState({
			dimensions: {
				width: Dimensions.get('window').width,
			},
		});
	}

	_getIcon({ focused, color, size }, icon) {
		return <Ionicons
			name={(Platform.OS === 'android' ? 'md-' : 'ios-') + icon}
			size={size}
			style={[ this.styles.icon, { color: color } ]}
		/>
	}

	render() {
		const isLargeScreen = this.dimensions?.width >= 768;

		return (
			<Drawer.Navigator
				initialRouteName="Home"
				drawerType={isLargeScreen ? 'permanent' : 'front'}
				drawerStyle={this.styles.drawer}
				drawerContentOptions={{ activeTintColor: this.colors.navItemActive, inactiveTintColor: this.colors.navItem }}
			>
				<Drawer.Screen name="Home"      component={HomeScreen}     options={{ drawerLabel: i18n.t('nav.home'), drawerIcon: data => this._getIcon(data, 'home') }} />
				{/*<Drawer.Screen name="MyRecipes" component={MyRecipesScreen} />*/}
				{/*<Drawer.Screen name="Liked"     component={LikedScreen} />*/}
				<Drawer.Screen name="Profile"   component={ProfileScreen}  options={{ drawerLabel: i18n.t('nav.profile'), drawerIcon: data => this._getIcon(data, 'person') }} />
				<Drawer.Screen name="Settings"  component={SettingsScreen} options={{ drawerLabel: i18n.t('nav.settings'), drawerIcon: data => this._getIcon(data, 'settings') }} />
			</Drawer.Navigator>
		);
	}
}
