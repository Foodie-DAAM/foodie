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
					Nutrition
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	},
});