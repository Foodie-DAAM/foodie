import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	StatusBar,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../theme';

import Button from '../components/Button';
import CardRecipe from '../components/CardRecipe';
import SearchBar from '../components/SearchBar';


export default class HomeScreen extends React.Component {
	static contextType = NavigationContext;

	state = {
		recipe: {
			"id": 232086,
			"title": "(I Can't Believe It's) Mashed Cauliflower",
			"url": "https://www.allrecipes.com/recipe/232086/i-cant-believe-its-mashed-cauliflower/",
			"description": "A tasty alternative to mashed potatoes that is lower in carbohydrates, sodium, and saturated fat than typical mashed potato recipes.",
			"duration": 30,
			"servings": 3,
			"picture": "https://images.media-allrecipes.com/userphotos/560x315/1273282.jpg",
			"ingredients": [
				{ "name": "water", "textImperial": "1 cup", "textMetric": "WIP" },
				{ "name": "frozen cauliflower", "textImperial": "10 ounces", "textMetric": "WIP" },
				{ "name": "canola oil", "textImperial": "2 tablespoons", "textMetric": "WIP" },
				{ "name": "large onion", "textImperial": "1/2", "textMetric": "WIP" },
				{ "name": "cloves garlic", "textImperial": "2", "textMetric": "WIP" },
				{ "name": "nonfat plain yogurt", "textImperial": "2 tablespoons", "textMetric": "WIP" },
				{ "name": "chopped fresh parsley (optional)", "textImperial": "1 tablespoon", "textMetric": "WIP" },
				{ "name": "garlic and herb seasoning blend (such as Mrs. Dash)", "textImperial": "1 teaspoon", "textMetric": "WIP" }
			],
			"steps": [
				{
					"description": "Bring water to a boil in a saucepan. Add cauliflower, reduce heat to medium-low, place a cover on saucepan, and cook cauliflower until tender, about 10 minutes; drain. Set cauliflower aside to cool for about 5 minutes; transfer to a blender.",
					"url": null,
					"picture": null,
					"timer": null
				},
				{
					"description": "Heat oil in a skillet over medium-high heat. Cook and stir onion and garlic in hot oil until tender, 3 to 5 minutes. Set aside to cool for about 5 minutes; add to blender.",
					"url": null,
					"picture": null,
					"timer": null
				},
				{
					"description": "Pour yogurt into blender with cauliflower and onion mixture; blend until smooth. Season with parsley and garlic and herb seasoning to serve.",
					"url": null,
					"picture": null,
					"timer": null
				}
			],
			"nutritionFacts": [
				{ "type": "CALORIES", "amount": 125.0, "text": "125" },
				{ "type": "FAT", "amount": 9.5, "text": "9.5 g" },
				{ "type": "CARBOHYDRATES", "amount": 8.8, "text": "8.8 g" },
				{ "type": "PROTEIN", "amount": 2.9, "text": "2.9 g" },
				{ "type": "CHOLESTEROL", "amount": 0.001, "text": "1 mg" },
				{ "type": "SODIUM", "amount": 0.04, "text": "40 mg" }
			]
		},
	};

	constructor(props) {
		super(props);
	}

	render() {
		const navigation = this.context;

		return (
			<SafeAreaView style={styles.safeArea}>
				<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

				<View style={styles.container}>
					<Text>Home</Text>

					<SearchBar style={{ marginLeft: 20, marginRight: 20, }} />

					<Text>Suggested</Text>
					<ScrollView style={styles.scroll}>
						<CardRecipe recipe={this.state.recipe} />
						<CardRecipe recipe={this.state.recipe} />
						<CardRecipe recipe={this.state.recipe} />
						<CardRecipe recipe={this.state.recipe} />
						<CardRecipe recipe={this.state.recipe} />
						<CardRecipe recipe={this.state.recipe} />
					</ScrollView>
					<Button title="INGREDIENTS (0)" style={styles.ingredientsButton} onPress={() => navigation.navigate('Ingredients')} />
				</View>
			</SafeAreaView>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		backgroundColor: colors.textLight, // TODO: move to root component
		flex: 1,
		// padding: 20,
	},
	scroll: {
		flex: 1,
	},
	ingredientsButton: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
});