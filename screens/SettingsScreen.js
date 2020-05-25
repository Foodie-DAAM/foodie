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

import { getTheme } from '../theme';


export default class SettingsScreen extends React.Component {
	static contextType = NavigationContext;

	state = {
		theme: Appearance.getColorScheme() || 'light',
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

	onThemeChange(value) {
		let colorScheme = value ? 'dark' : 'light';

		this.setState({ theme: colorScheme });
		Appearance.set({ colorScheme });
		AsyncStorage.setItem('theme', colorScheme);
	}

	_onLogout() {
		console.log('Attempting to log out...');

		firebase.auth().signOut()
			.then(() => {
				console.log('Logout successful');

				const navigation = this.context;
				navigation.navigate('Welcome');
			});
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<SettingsList borderColor={colors.lightish} defaultItemSize={50} backgroundColor={colors.light}>
					<SettingsList.Item
						title='Theme'
						titleInfo={this.state.theme}
						titleStyle={{ color: colors.dark, fontSize: 16 }}
						switchState={this.state.theme === 'dark'}
						switchOnValueChange={this.onThemeChange}
						hasNavArrow={false}
						hasSwitch={true}
					/>

					<SettingsList.Item
						title='Unit System'
						titleInfo={this.state.unitSystem ? 'Imperial' : 'Metric'}
						titleStyle={{ color: colors.dark, fontSize: 16 }}
						switchState={this.state.unitSystem}
						switchOnValueChange={value => this.setState({ unitSystem: value })}
						hasNavArrow={false}
						hasSwitch={true} />

					<SettingsList.Item
						id="report"
						title='Report a problem'
						titleStyle={{ color: colors.dark, fontSize: 16 }}
						onPress={() => alert('Report\n[NOT IMPLEMENTED]')} />

					<SettingsList.Item
						title='Logout'
						titleInfo={this.state.email}
						titleStyle={{ color: colors.primaryDark, fontSize: 16 }}
						hasNavArrow={false}
						onPress={this._onLogout} />
				</SettingsList>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
	}
});