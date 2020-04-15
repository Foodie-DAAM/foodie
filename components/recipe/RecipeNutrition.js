import React from 'react';
import {
	StyleSheet,
	View,
	Text, FlatList
} from 'react-native';


class NutritionItem extends React.Component {
	render() {
		let { type, text } = this.props.nutrition;

		return (
			<View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
				<Text  style={{ flex: 1 }}>
					{type.toLowerCase()}
				</Text>
				<Text  style={{ flex: 0, textAlign: 'right' }}>
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

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});