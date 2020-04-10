import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';

import Card from './Card';


export default class CardRecipe extends React.Component {
	static contextType = NavigationContext;

	render() {
		const navigation = this.context;
		let { title, description } = this.props.recipe;

		return (
			<Card onPress={() => navigation.navigate('Recipe', { recipe: this.props.recipe })}>
				<Image source={require('../assets/recipe.webp')} style={styles.image} />
				<View style={styles.info}>
					<Text style={styles.title} numberOfLines={1}>{title}</Text>
					<Text style={styles.description} numberOfLines={3}>{description}</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
	},
	info: {
		flex: 1,
		margin: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 17,
		marginBottom: 5,
	},
	description: {
	}
});