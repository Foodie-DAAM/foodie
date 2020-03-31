import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getTheme } from '../theme'
import { connect } from 'react-redux';

import { addIngredient } from '../store/ingredientsSlice';
import Button from '../components/Button';

class IngredientList extends React.Component {

	handleOnPress() {
		this.props.addIngredient('New Ingredient');
	}

	render() {
		return (
			<View>
				<Text>List:</Text>
				<Text>{this.props.ingredients.toString()}</Text>
				<Button title="ADD INGREDIENT" onPress={this.handleOnPress} />
			</View>
		);
	}

}

const mapStateToProps = state => {
	return { ingredients: state.ingredients };
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ingredient => dispatch(addIngredient(ingredient))
	};
};

export const IngredientList2 = connect(mapStateToProps, mapDispatchToProps)(IngredientList);

export default class HomeScreen extends React.Component {

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text>
					Home
				</Text>
				<IngredientList2 />
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