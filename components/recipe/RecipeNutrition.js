import React from 'react';
import {
	StyleSheet,
	View,
	Text, FlatList
} from 'react-native';
import { getTheme } from '../../theme';


class NutritionItem extends React.PureComponent {

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
		let { type, text } = this.props.nutrition;

		return (
			<View style={this.styles.item}>
				<Text style={this.styles.type}>
					{type.toLowerCase()}
				</Text>
				<Text style={this.styles.amount}>
					{text}
				</Text>
			</View>
		)
	}
}

export default class RecipeNutrition extends React.PureComponent {

	static styles = StyleSheet.create({
		container: {
			padding: 20,
		},
	})

	render() {
		return (
			<View style={RecipeNutrition.styles.container}>
				<FlatList
					data={this.props.recipe.nutritionFacts}
					renderItem={({ item }) => <NutritionItem nutrition={item} />}
					keyExtractor={item => item.type}
				/>
			</View>
		);
	}
}
