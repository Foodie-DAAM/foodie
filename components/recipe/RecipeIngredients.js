import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class RecipeInfo extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Ingredients
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});