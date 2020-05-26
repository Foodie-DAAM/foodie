import React from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DialogInput from 'react-native-dialog-input';

import { getTheme } from '../theme';

import Button from '../components/Button';
import IngredientList from '../components/IngredientList';


const STORE_INGREDIENTS = 'ingredients';

export default class IngredientsScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			backgroundColor: this.colors.light,
			flex: 1,
		},
		loading: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		buttonAddIngredient: {
			margin: 10,
		}
	})

	state = {
		ingredients: [],
		loading: true,
		dialogVisible: false,
	}

	constructor(props) {
		super(props);
		this._loadIngredients = this._loadIngredients.bind(this);
		this._addIngredient = this._addIngredient.bind(this);
		this._addIngredientSubmit = this._addIngredientSubmit.bind(this);
		this._removeIngredient = this._removeIngredient.bind(this);
		this._setDialogVisibility = this._setDialogVisibility.bind(this);

		this._loadIngredients();
	}

	_loadIngredients() {
		AsyncStorage.getItem(STORE_INGREDIENTS)
			.then(data => {
				data = JSON.parse(data) || [];

				console.log('Loaded ingredients:', data);

				this.setState({
					ingredients: data,
					loading: false,
				})
			});
	}

	_setDialogVisibility(visible) {
		this.setState({
			dialogVisible: visible
		})
	}

	_addIngredient() {
		this._setDialogVisibility(true);
	}

	_addIngredientSubmit(name) {
		name = name.trim().toLowerCase();

		console.log('Adding ingredient:', name);

		this._setDialogVisibility(false);

		let newIngredients = Object.assign([], this.state.ingredients);

		if (newIngredients.indexOf(name) !== -1) {
			console.log('Ingredient already exists:', name);
			return;
		}

		newIngredients.push(name);

		AsyncStorage.setItem(STORE_INGREDIENTS, JSON.stringify(newIngredients));
		this.setState({ ingredients: newIngredients });

	}

	_removeIngredient(name) {
		console.log('Removing ingredient:', name);

		let newIngredients = Object.assign([], this.state.ingredients);
		newIngredients = newIngredients.filter(i => i !== name);

		AsyncStorage.setItem(STORE_INGREDIENTS, JSON.stringify(newIngredients));
		this.setState({ ingredients: newIngredients });
	}

	render() {
		let content;

		if (this.state.loading) {
			content = (
				<View style={this.styles.loading}>
					<ActivityIndicator size={Platform.OS === 'android' ? 60 : 'large'} color={this.colors.primary} />
				</View>
			)
		} else if (!this.state.ingredients || this.state.ingredients.length < 1) {
			content = (
				<View>
					<Text style={{ color: this.colors.dark }}>Start by adding something...</Text>
				</View>
			)
		} else {
			content = <IngredientList
							data={this.state.ingredients}
							onRemove={this._removeIngredient} />
		}

		return (
			<SafeAreaView style={this.styles.container}>
				{content}

				<Button title="ADD INGREDIENT"
					style={this.styles.buttonAddIngredient}
					onPress={this._addIngredient} />

				<DialogInput
					isDialogVisible={this.state.dialogVisible}
					title="Add Ingredient"
					hintInput="Name"
					submitInput={input => this._addIngredientSubmit(input)}
					closeDialog={() => this._setDialogVisibility(false)}>
				</DialogInput>
			</SafeAreaView>
		);
	}
}
