import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
} from 'react-native';
import { getTheme } from '../../theme';


class IngredientItem extends React.Component {
	render() {
		let { name, textImperial } = this.props.ingredient;

		return (
			<View style={styles.item}>
				<Text style={[styles.itemText, { flex: 1 }]}>
					{name}
				</Text>
				<Text style={[styles.itemText, { flex: 0, textAlign: 'right' }]}>
					{textImperial}
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
					data={this.props.recipe.ingredients}
					renderItem={({ item }) => <IngredientItem ingredient={item} />}
					keyExtractor={item => item.name}
				/>
			</View>
		)
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