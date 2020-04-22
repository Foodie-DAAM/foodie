import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text
} from 'react-native';

import Button from '../Button';


export default class RecipeInfo extends React.Component {
	render() {
		let { description, duration, servings } = this.props.recipe;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.descriptionContainer}>
					<Text style={styles.description}>
						{description}
					</Text>
				</ScrollView>
				<Button secondary style={styles.details}>
					<Text style={[styles.detailsItem, { paddingBottom: 8 }]}>{duration} minutes</Text>
					<Text style={[styles.detailsItem, { paddingBottom: 8 }]}>{servings} servings</Text>
					<Text style={styles.detailsItem}>X% positive | hard</Text>
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingBottom: 0,
		flex: 1,
	},
	descriptionContainer: {
		flex: 1,
		marginBottom: 20,
	},
	description: {
		fontSize: 17,
	},
	details: {
	},
	detailsItem: {
		fontSize: 18,
	},
});