import React from 'react';
import { StyleSheet,
	View,
	Text,
} from 'react-native';
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../theme';

import Button from '../components/Button';


export default class HomeScreen extends React.Component {
	static contextType = NavigationContext;

	constructor(props) {
		super(props);
	}

	render() {
		const navigation = this.context;

		return (
			<SafeAreaView style={styles.container}>
				<Text>
					Home
				</Text>
				<Button title="INGREDIENTS (0)" onPress={() => navigation.navigate('Ingredients')} />
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.textLight,
		flex: 1,
	},
});