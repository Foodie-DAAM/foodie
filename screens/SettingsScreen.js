import React from 'react';
import {
	StyleSheet,
	AsyncStorage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appearance } from 'react-native-appearance';
import SettingsList from 'react-native-settings-list';
import { NavigationContext } from "@react-navigation/native";
import * as firebase from "firebase";
import i18n from 'i18n-js';

import { getTheme, currentTheme } from '../theme';


export default class SettingsScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: this.colors.light,
		},
		item: {
			color: this.colors.dark,
			fontSize: 16,
		}
	})

	state = {
		theme: currentTheme || Appearance.getColorScheme(),
		unitSystem: false,
		stages: 20,
		email: null,
	}

	constructor(props) {
		super(props);
		this.onThemeChange = this.onThemeChange.bind(this);
		this._onLogout = this._onLogout.bind(this);
	}

	componentDidMount() {
		this.setState({
			email: firebase.auth().currentUser?.email
		})
	}

	async onThemeChange(value) {
		let colorScheme = value ? 'dark' : 'light';

		this.setState({ theme: colorScheme });
		Appearance.set({ colorScheme });
		await AsyncStorage.setItem('theme', colorScheme);
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
						hasSwitch={true}
					/>

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
						onPress={() => alert('Report\n[NOT IMPLEMENTED]')} />

					<SettingsList.Item
						title={i18n.t('settings.logout._')}
						titleInfo={this.state.email}
						titleStyle={[ this.styles.item, { color: this.colors.primaryDark } ]}
						hasNavArrow={false}
						onPress={this._onLogout} />
				</SettingsList>
			</SafeAreaView>
		);
	}
}
