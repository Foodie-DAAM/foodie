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

		return (
			<Card onPress={() => navigation.navigate('Recipe')}>
				<Image source={require('../assets/recipe.webp')} style={styles.image} />
				<View style={styles.info}>
					<Text style={styles.title}>Title</Text>
					<Text style={styles.description} numberOfLines={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla tempus cursus. Sed hendrerit libero at quam pellentesque fringilla. Fusce dui eros, rhoncus nec dignissim nec, tincidunt eu sem. Sed non lacus non metus vulputate accumsan. Integer iaculis eros diam, quis feugiat lectus semper vel. Maecenas mi velit, dignissim ac purus at.</Text>
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
		marginRight: 5,
	},
	info: {
		flex: 1,
		margin: 5,
	},
	title: {
		fontWeight: 'bold',
	},
	description: {
		// fontSize: 13,
	}
});