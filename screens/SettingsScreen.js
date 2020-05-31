import React from 'react';
import {
	StyleSheet,
	AsyncStorage,
	Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appearance } from 'react-native-appearance';
import SettingsList from 'react-native-settings-list';
import { NavigationContext } from "@react-navigation/native";
import { Updates } from 'expo';
import * as Linking from 'expo-linking';
import * as firebase from "firebase";
import Constants from 'expo-constants';
import i18n from 'i18n-js';

import { getTheme } from '../theme';
import { getNavigation } from '../navigation';


export default class SettingsScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
			backgroundColor: this.colors.light,
		},
		item: {
			color: this.colors.dark,
			fontSize: 16,
		},
		version: {
			fontSize: 20,
			marginBottom: 60,
			textAlign: 'center',
		}
	})

	state = {
		theme: getTheme().theme,
		navigation: getNavigation(),
		unitSystem: false,
		stages: 20,
		email: null,
	}

	constructor(props) {
		super(props);
		this.onThemeChange = this.onThemeChange.bind(this);
		this.onNavigationChange = this.onNavigationChange.bind(this);
		this._onReport = this._onReport.bind(this);
		this._onLogout = this._onLogout.bind(this);
	}

	componentDidMount() {
		this.setState({
			email: this._getEmail(firebase.auth().currentUser),
		})
	}

	_getEmail(user) {
		if (user?.email)
			return user.email;

		for (let provider of user?.providerData)
			if (provider.email)
				return provider.email;

		return null;
	}

	async onThemeChange(value) {
		let colorScheme = value ? 'dark' : 'light';

		Appearance.set({ colorScheme });
		this.setState({ theme: colorScheme });
		await AsyncStorage.setItem('theme', colorScheme);
		await Updates.reload();
	}

	async onNavigationChange(value) {
		let nav = value ? 'tab' : 'drawer';

		this.setState({ navigation: nav });
		await AsyncStorage.setItem('navigation', nav);
		await Updates.reload();
	}

	_onReport() {
		Linking.openURL('mailto:foodie@sandrohc.net');
	}

	_onLogout() {
		console.log('Logging out...');

		firebase.auth().signOut()
			.then(() => this.context.navigate('Welcome'));
	}

	render() {
		return (
			<SafeAreaView style={this.styles.container}>
				<SettingsList
					borderColor={this.colors.lightish}
					backgroundColor={this.colors.light}
					defaultItemSize={50}
				>
					<SettingsList.Item
						title={i18n.t('settings.theme._')}
						titleInfo={this.state.theme === 'dark' ? i18n.t('settings.theme.dark') : i18n.t('settings.theme.light')}
						titleStyle={this.styles.item}
						switchState={this.state.theme === 'dark'}
						switchOnValueChange={this.onThemeChange}
						hasNavArrow={false}
						hasSwitch={true} />

					<SettingsList.Item
						title={i18n.t('settings.nav._')}
						titleInfo={this.state.navigation === 'drawer' ? i18n.t('settings.nav.drawer') : i18n.t('settings.nav.tab')}
						titleStyle={this.styles.item}
						switchState={this.state.navigation === 'tab'}
						switchOnValueChange={this.onNavigationChange}
						hasNavArrow={false}
						hasSwitch={true} />

					<SettingsList.Item
						title={i18n.t('settings.units._')}
						titleInfo={this.state.unitSystem ? i18n.t('settings.units.imperial') : i18n.t('settings.units.metric')}
						titleStyle={this.styles.item}
						switchState={this.state.unitSystem}
						switchOnValueChange={value => this.setState({ unitSystem: value })}
						hasNavArrow={false}
						hasSwitch={true} />

					<SettingsList.Item
						id="report"
						title={i18n.t('settings.report._')}
						titleStyle={this.styles.item}
						onPress={this._onReport} />

					<SettingsList.Item
						title={i18n.t('settings.logout._')}
						titleInfo={this.state.email}
						titleStyle={[ this.styles.item, { color: this.colors.primaryDark } ]}
						hasNavArrow={false}
						onPress={this._onLogout} />
				</SettingsList>

				<Text style={this.styles.version}>
					{i18n.t('version', { version: Constants.manifest.version })}
				</Text>
			</SafeAreaView>
		);
	}
}
