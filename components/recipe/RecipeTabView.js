import * as React from 'react';
import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getTheme } from '../../theme';

import RecipeInfo from './RecipeInfo';
import RecipeIngredients from './RecipeIngredients';
import RecipeNutrition from './RecipeNutrition';

export default class RecipeTabView extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: 'info', title: 'Info' },
			{ key: 'ingredients', title: 'Ingredients' },
			{ key: 'nutrition', title: 'Nutrition' },
		],
	};

	_renderScene = SceneMap({
		info:        () => <RecipeInfo        recipe={this.props.recipe} />,
		ingredients: () => <RecipeIngredients recipe={this.props.recipe} />,
		nutrition:   () => <RecipeNutrition   recipe={this.props.recipe} />,
	});

	_renderTabBar = props => {
		return (
			<TabBar
				{...props}
				style={styles.tabBar}
				indicatorStyle={styles.indicator}
				// tabStyle={styles.tabStyle}
				// labelStyle={styles.label}

				activeColor={colors.primary}
				inactiveColor={colors.dark}
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

const { colors } = getTheme();
const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: 'transparent',
	},
	indicator: {
		backgroundColor: 'orange',
	},
});