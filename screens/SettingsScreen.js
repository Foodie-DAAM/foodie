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

		// console.log('THEME CHANGE', RNRestart)
		// RNRestart.Restart();
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
						title='Theme'
						titleInfo={this.state.theme}
						titleStyle={this.styles.item}
						switchState={this.state.theme === 'dark'}
						switchOnValueChange={this.onThemeChange}
						hasNavArrow={false}
						hasSwitch={true}
					/>

					<SettingsList.Item
						title='Unit System'
						titleInfo={this.state.unitSystem ? 'Imperial' : 'Metric'}
						titleStyle={this.styles.item}
						switchState={this.state.unitSystem}
						switchOnValueChange={value => this.setState({ unitSystem: value })}
						hasNavArrow={false}
						hasSwitch={true} />

					<SettingsList.Item
						id="report"
						title='Report a problem'
						titleStyle={this.styles.item}
						onPress={() => alert('Report\n[NOT IMPLEMENTED]')} />

					<SettingsList.Item
						title='Logout'
						titleInfo={this.state.email}
						titleStyle={[ this.styles.item, { color: this.colors.primaryDark } ]}
						hasNavArrow={false}
						onPress={this._onLogout} />
				</SettingsList>
			</SafeAreaView>
		);
	}
}
