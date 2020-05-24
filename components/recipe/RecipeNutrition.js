import React from 'react';
import {
	StyleSheet,
	View,
	Text, FlatList
} from 'react-native';
import { getTheme } from '../../theme';


class NutritionItem extends React.Component {
	render() {
		let { type, text } = this.props.nutrition;

		return (
			<View style={styles.item}>
				<Text style={[styles.itemText, { flex: 1 }]}>
					{type.toLowerCase()}
				</Text>
				<Text style={[styles.itemText, { flex: 0, textAlign: 'right' }]}>
					{text}
				</Text>
			</View>
		)
	}
}

export default class RecipeInfo extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.recipe.nutritionFacts}
					renderItem={({ item }) => <NutritionItem nutrition={item} />}
					keyExtractor={item => item.type}
				/>
			</View>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		padding: 15,
	},
	itemText: {
		color: colors.dark,
	},
});