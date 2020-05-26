import * as React from 'react';
import {
	StyleSheet,
} from 'react-native';
import i18n from 'i18n-js';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getTheme } from '../../theme';

import RecipeInfo from './RecipeInfo';
import RecipeIngredients from './RecipeIngredients';
import RecipeNutrition from './RecipeNutrition';

export default class RecipeTabView extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		tabBar: {
			backgroundColor: 'transparent',
		},
		indicator: {
			backgroundColor: 'orange',
		},
	})

	state = {
		index: 0,
		routes: [
			{ key: 'info',        title: i18n.t('recipe.nav.info') },
			{ key: 'ingredients', title: i18n.t('recipe.nav.ingredients') },
			{ key: 'nutrition',   title: i18n.t('recipe.nav.nutrition') },
		],
	}

	_renderScene = SceneMap({
		info:        () => <RecipeInfo        recipe={this.props.recipe} />,
		ingredients: () => <RecipeIngredients recipe={this.props.recipe} />,
		nutrition:   () => <RecipeNutrition   recipe={this.props.recipe} />,
	});

	_renderTabBar = props => {
		return (
			<TabBar
				{...props}
				style={this.styles.tabBar}
				indicatorStyle={this.styles.indicator}
				// tabStyle={this.styles.tabStyle}
				// labelStyle={this.styles.label}

				activeColor={this.colors.primary}
				inactiveColor={this.colors.dark}
			/>
		)
	};

	_handleIndexChange = index => this.setState({ index });

	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={this._renderScene}
				renderTabBar={this._renderTabBar}
				onIndexChange={this._handleIndexChange}
			/>
		)
	}
}
