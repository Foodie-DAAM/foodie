import React from 'react';
import {
	Platform,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { getTheme } from '../theme';
import { getNavigation } from '../navigation';
import i18n from 'i18n-js';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default class MainScreen extends React.Component {
	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
		},
		drawer: {
			backgroundColor: this.colors.lightish,
			width: 240,
		},
		tab: {
			backgroundColor: this.colors.light,
		},
		icon: {
		},
	})

	state = {
		dimensions: null,
		nav: getNavigation(),
	}

	constructor(props) {
		super(props);
		this._renderDrawer = this._renderDrawer.bind(this);
		this._renderBottomTab = this._renderBottomTab.bind(this);

	}

	componentDidMount() {
		this.setState({
			dimensions: {
				width: Dimensions.get('window').width,
			},
		});
	}

	_getIcon({ focused, color, size }, routeName) {
		let iconName = this._getIconName(routeName);
		return <Ionicons
			name={(Platform.OS === 'android' ? 'md-' : 'ios-') + iconName}
			size={size}
			style={[ this.styles.icon, { color: color } ]}
		/>
	}

	_getIconName(routeName) {
		switch (routeName) {
			case 'Home':     return 'home';
			case 'Profile':  return 'person';
			case 'Settings': return 'settings';
		}
	}

	_renderDrawer() {
		const isLargeScreen = this.dimensions?.width >= 768;

		return <Drawer.Navigator
			initialRouteName="Home"
			drawerType={isLargeScreen ? 'permanent' : 'front'}
			drawerStyle={this.styles.drawer}
			drawerContentOptions={{ activeTintColor: this.colors.navItemActive, inactiveTintColor: this.colors.navItem }}
		>
			<Drawer.Screen name="Home"      component={HomeScreen}     options={{ drawerLabel: i18n.t('nav.home'),     drawerIcon: data => this._getIcon(data, 'Home') }} />
			{/*<Drawer.Screen name="MyRecipes" component={MyRecipesScreen} />*/}
			{/*<Drawer.Screen name="Liked"     component={LikedScreen} />*/}
			<Drawer.Screen name="Profile"   component={ProfileScreen}  options={{ drawerLabel: i18n.t('nav.profile'),  drawerIcon: data => this._getIcon(data, 'Profile') }} />
			<Drawer.Screen name="Settings"  component={SettingsScreen} options={{ drawerLabel: i18n.t('nav.settings'), drawerIcon: data => this._getIcon(data, 'Settings') }} />
		</Drawer.Navigator>
	}

	_renderBottomTab() {
		return <Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => this._getIcon({ focused, color, size }, route.name),
			})}
			tabBarOptions={{
				activeTintColor:   this.colors.primary,
				inactiveTintColor: this.colors.gray,
				style: this.styles.tab,
			}}
		>
			<Tab.Screen name="Home"     component={HomeScreen}     options={{ title: i18n.t('nav.home') }} />
			<Tab.Screen name="Profile"  component={ProfileScreen}  options={{ title: i18n.t('nav.profile') }} />
			<Tab.Screen name="Settings" component={SettingsScreen} options={{ title: i18n.t('nav.settings') }} />
		</Tab.Navigator>
	}

	render() {
		return this.state.nav === 'drawer' ? this._renderDrawer() : this._renderBottomTab();
	}
}
