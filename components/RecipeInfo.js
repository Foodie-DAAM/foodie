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
				<Text style={styles.description}>
					Beef Wellington is a pie made of fillet steak coated with pâté and duxelles, which is then wrapped
					in parma ham and puff pastry, then baked.
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	},
	description: {
	},
});