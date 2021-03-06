import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text
} from 'react-native';
import i18n from 'i18n-js';
import { getTheme } from '../../theme';

import Button from '../Button';


export default class RecipeInfo extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
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
			color: this.colors.dark,
		},
		details: {
		},
		detailsItem: {
			fontSize: 18,
			color: this.colors.dark,
		},
	})

	render() {
		let { description, duration, servings } = this.props.recipe;

		return (
			<View style={this.styles.container}>
				<ScrollView style={this.styles.descriptionContainer}>
					<Text style={this.styles.description}>
						{description}
					</Text>
				</ScrollView>
				<Button secondary style={this.styles.details}>
					<Text style={[this.styles.detailsItem, { paddingBottom: 8 }]}>
						{i18n.t('recipe.duration', { count: duration, formatted: i18n.toNumber(duration, { precision: 0 }) })}
					</Text>
					<Text style={this.styles.detailsItem}>
						{i18n.t('recipe.servings', { count: servings, formatted: i18n.toNumber(servings, { precision: 0 }) })}
					</Text>
					{/*<Text style={this.styles.detailsItem}>100% positive | hard</Text>*/}
				</Button>
			</View>
		);
	}
}
