import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { getTheme } from '../theme';

import Card from './Card';


export default class CardRecipe extends React.PureComponent {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
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
			color: this.colors.dark,
			fontWeight: 'bold',
			fontSize: 17,
			marginBottom: 5,
		},
		description: {
			color: this.colors.dark,
		}
	})

	render() {
		const navigation = this.context;
		let { title, picture, description } = this.props.recipe;

		return (
			<Card onPress={() => navigation.navigate('Recipe', { recipe: this.props.recipe })} style={this.styles.container} >
				<Image source={{ uri: picture, cache: 'force-cache' }} defaultSource={require('../assets/recipe.webp')} style={this.styles.image} />
				<View style={this.styles.info}>
					<Text style={this.styles.title} numberOfLines={1}>{title}</Text>
					<Text style={this.styles.description} numberOfLines={3}>{description}</Text>
				</View>
			</Card>
		);
	}
}
