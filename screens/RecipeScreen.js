import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ProfileScreen extends React.Component {
	state = { recipe: null };

	render() {
		return (
			<SafeAreaView>
				<Text>Recipe</Text>
				<Text>{this.state.recipe?.title}</Text>
			</SafeAreaView>
		);
	}
}