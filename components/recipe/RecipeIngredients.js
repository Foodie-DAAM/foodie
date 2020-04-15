import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
} from 'react-native';


class IngredientItem extends React.Component {
	render() {
		let { name, textImperial } = this.props.ingredient;

		return (
			<View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
				<Text  style={{ flex: 1 }}>
					{name}
				</Text>
				<Text  style={{ flex: 0, textAlign: 'right' }}>
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

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});