import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet
} from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'

import Button from '../components/Button';
import ErrorBoundary from '../components/ErrorBoundary';
import RecipeTabView from "../components/recipe/RecipeTabView";


export default class RecipeScreen extends React.Component {
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
				{ "name": "water", "type": "VOLUME", "amount": 1.0, "extra": null },
				{ "name": "frozen cauliflower", "type": "WEIGHT", "amount": 0.625, "extra": null },
				{ "name": "canola oil", "type": "VOLUME", "amount": 0.125, "extra": null },
				{ "name": "large onion", "type": "TYPELESS", "amount": 0.5, "extra": "sliced" },
				{ "name": "cloves garlic", "type": "TYPELESS", "amount": 2.0, "extra": "minced" },
				{ "name": "nonfat plain yogurt", "type": "VOLUME", "amount": 0.125, "extra": null },
				{ "name": "chopped fresh parsley (optional)", "type": "VOLUME", "amount": 0.0625, "extra": null },
				{ "name": "garlic and herb seasoning blend (such as Mrs. Dash)", "type": "VOLUME", "amount": 0.020833334, "extra": "or to taste (optional)" }
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
				{ "type": "CALORIES", "amount": 125.0 },
				{ "type": "FAT", "amount": 9.5 },
				{ "type": "CARBOHYDRATES", "amount": 8.8 },
				{ "type": "PROTEIN", "amount": 2.9 },
				{ "type": "CHOLESTEROL", "amount": 0.001 },
				{ "type": "SODIUM", "amount": 0.04 }
			]
		},
		liked: false
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<Image source={require('../assets/recipe.webp')} style={{ height: 250 }} />

				<SafeAreaConsumer>
					{insets => (
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'arrow-back'}
							size={34}
							style={{ position: 'absolute', left: insets.left, top: insets.top, padding: 15, color: 'white' }}
							onPress={() => this.props.navigation.back()}
						/>
					)}
				</SafeAreaConsumer>
				<SafeAreaConsumer>
					{insets => (
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'heart' + (this.state.liked ? '' : '-empty')}
							size={34}
							style={{ position: 'absolute', right: insets.right, top: insets.top, padding: 15, color: 'white' }}
							onPress={() => this.setState({ liked: !this.state.liked })}
						/>
					)}
				</SafeAreaConsumer>



				<Text>{this.state.recipe.title}</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<RecipeTabView />
								<Button title="START COOKING" />
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	scene: {
		// flex: 1,
	},
});