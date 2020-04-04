import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { getTheme } from '../theme';

import Button from '../components/Button';
import IngredientList from '../components/IngredientList';

import { addIngredient } from '../store/ingredientsSlice';


class IngredientsScreen2 extends React.Component {
	static contextType = NavigationContext;

	constructor(props) {
		super(props);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
	}

	handleAddIngredient() {
		console.log("handleAddIngredient");
		this.props.addIngredient('New Ingredient');
	}

	render() {
		if (this.props.ingredients.list.length < 1) {
			return (
				<SafeAreaView style={styles.container}>
					<Text>Start by adding anything...</Text>
					<Button title="ADD INGREDIENT" onPress={this.handleAddIngredient} />
				</SafeAreaView>
			);
		}

		return (
			<SafeAreaView style={styles.container}>
				<Text>My Ingredients</Text>
				<Text>Search...</Text>
				<IngredientList data={this.props.ingredients.list} />
				<Button title="ADD INGREDIENT" onPress={this.handleAddIngredient} />
			</SafeAreaView>
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

const IngredientsScreen = connect(mapStateToProps, mapDispatchToProps)(IngredientsScreen2);
export default IngredientsScreen;

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.textLight,
		flex: 1,
	}
});