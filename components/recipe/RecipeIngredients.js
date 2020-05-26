import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
} from 'react-native';
import { getTheme } from '../../theme';


class IngredientItem extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		item: {
			flex: 1,
			flexDirection: 'row',
			padding: 15,
		},
		type: {
			color: this.colors.dark,
			flex: 1,
		},
		amount: {
			color: this.colors.dark,
			flex: 0,
			textAlign: 'right',
		},
	})

	render() {
		let { name, textImperial } = this.props.ingredient;

		return (
			<View style={this.styles.item}>
				<Text style={this.styles.type}>
					{name}
				</Text>
				<Text style={this.styles.amount}>
					{textImperial}
				</Text>
			</View>
		)
	}
}

export default class RecipeIngredients extends React.PureComponent {

	static styles = StyleSheet.create({
		container: {
			padding: 20,
		},
	})

	render() {
		return (
			<View style={RecipeIngredients.styles.container}>
				<FlatList
					data={this.props.recipe.ingredients}
					renderItem={({ item }) => <IngredientItem ingredient={item} />}
					keyExtractor={item => item.name}
				/>
			</View>
		)
	}
}
