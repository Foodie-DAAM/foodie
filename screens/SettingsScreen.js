import React from 'react';
import {
	StyleSheet,
	AsyncStorage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appearance } from 'react-native-appearance';
import SettingsList from 'react-native-settings-list';

import { getTheme } from '../theme';


export default class SettingsScreen extends React.Component {
	state = {
		theme: Appearance.getColorScheme() || 'light',
		unitSystem: false,
		stages: 20,
	}

	constructor(props) {
		super(props);
		this.onThemeChange = this.onThemeChange.bind(this);
	}

	onThemeChange(value) {
		let colorScheme = value ? 'dark' : 'light';

		this.setState({ theme: colorScheme });
		Appearance.set({ colorScheme });
		AsyncStorage.setItem('theme', colorScheme);
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
						onPress={() => alert('Report')} />

					<SettingsList.Item
						title='Logout'
						titleInfo='user@mail.com'
						titleStyle={{ color: colors.primaryDark, fontSize: 16 }}
						hasNavArrow={false} />
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