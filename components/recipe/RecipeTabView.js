import * as React from 'react';
import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import RecipeInfo from './RecipeInfo';
import RecipeIngredients from "./RecipeIngredients";
import RecipeNutrition from "./RecipeNutrition";

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
		info: RecipeInfo,
		ingredients: RecipeIngredients,
		nutrition: RecipeNutrition,
	});

	_renderTabBar = props => {
		return (
			<TabBar
				{...props}
				style={styles.tabBar}
				// tabStyle={styles.tabStyle}
				indicatorStyle={styles.indicator}
				// labelStyle={styles.label}

				activeColor="orange"
				inactiveColor="black"
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

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: 'transparent',
	},
	tabStyle: {
		backgroundColor: 'cyan',
	},
	indicator: {
		backgroundColor: 'orange',
	},
	label: {
		color: 'orange',
	},
});