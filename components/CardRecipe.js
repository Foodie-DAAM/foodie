import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';

import Card from './Card';
import { getTheme } from "../theme";


export default class CardRecipe extends React.Component {
	static contextType = NavigationContext;

	render() {
		const navigation = this.context;
		let { title, picture, description } = this.props.recipe;

		return (
			<Card onPress={() => navigation.navigate('Recipe', { recipe: this.props.recipe })} style={styles.container} >
				<Image source={{ uri: picture, cache: 'force-cache' }} defaultSource={require('../assets/recipe.webp')} style={styles.image} />
				<View style={styles.info}>
					<Text style={styles.title} numberOfLines={1}>{title}</Text>
					<Text style={styles.description} numberOfLines={3}>{description}</Text>
				</View>
			</Card>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		height: 110,
	},
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
		color: colors.dark,
		fontWeight: 'bold',
		fontSize: 17,
		marginBottom: 5,
	},
	description: {
		color: colors.dark,
	}
});