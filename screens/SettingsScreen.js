import React from 'react';
import {
	StyleSheet,
	Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getTheme } from '../theme'


export default class SettingsScreen extends React.Component {

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text>
					Home
				</Text>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.textLight
	}
});