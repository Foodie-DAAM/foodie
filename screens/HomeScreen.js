import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../theme';

import Button from '../components/Button';
import CardRecipe from '../components/CardRecipe';
import SearchBar from '../components/SearchBar';


export default class HomeScreen extends React.Component {
	static contextType = NavigationContext;

	constructor(props) {
		super(props);
	}

	render() {
		const navigation = this.context;

		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Text>Home</Text>

					<SearchBar style={{ marginLeft: 20, marginRight: 20, }} />

					<Text>Suggested</Text>
					<ScrollView style={styles.scroll}>
						<CardRecipe />
						<CardRecipe />
						<CardRecipe />
						<CardRecipe />
						<CardRecipe />
						<CardRecipe />
					</ScrollView>
					<Button title="INGREDIENTS (0)" style={styles.ingredientsButton} onPress={() => navigation.navigate('Ingredients')} />
				</View>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		backgroundColor: colors.textLight, // TODO: move to root component
		flex: 1,
		// padding: 20,
	},
	scroll: {
		flex: 1,
	},
	ingredientsButton: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
});