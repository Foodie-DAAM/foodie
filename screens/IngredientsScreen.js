import React from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { getTheme } from '../theme';

import Button from '../components/Button';
import IngredientList from '../components/IngredientList';
import InputIngredientAutocomplete from '../components/InputIngredientAutocomplete';

import { addIngredient } from '../store/ingredientsSlice';


class IngredientsScreen2 extends React.Component {
	static contextType = NavigationContext;

	constructor(props) {
		super(props);
		this._addIngredient = this._addIngredient.bind(this);
	}

	_addIngredient() {
		console.log('handleAddIngredient');
		this.props.addIngredient('Ingredient ' + (Math.floor(Math.random() * Math.floor(20))));
	}

	render() {
		let content;

		if (this.props.ingredients.list.length < 1) {
			content = (
				<View>
					<Text>Start by adding something...</Text>
				</View>
			)
		} else {
			content = <IngredientList data={this.props.ingredients.list} />
		}

		return (
			<SafeAreaView style={styles.container}>
				<InputIngredientAutocomplete />

				{content}

				<Button title="ADD INGREDIENT" onPress={this._addIngredient} style={styles.buttonAddIngredient} />
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
		backgroundColor: colors.light,
		flex: 1,
	},
	buttonAddIngredient: {
		margin: 10,
	}
});