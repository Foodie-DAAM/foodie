import React from 'react';
import {
	Text,
	StyleSheet,
	View, ScrollView,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';

import ErrorBoundary from '../components/ErrorBoundary';
import Button from '../components/Button';


export default class RecipeStepsScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			backgroundColor: this.colors.light,
			flex: 1,
			flexDirection: 'column',
			alignItems: 'stretch',
		},
		icon: {
			padding: 15,
			color: this.colors.dark,
			width: 100, // larger box to make it easier to press
		},
		title: {
			fontSize: 50,
			marginLeft: 10,
			// padding: 15,
			color: this.colors.primary,
		},
		scrollView: {
			flexGrow: 1,
			margin: 10,
		},
		contentScrollView: {

		},
		description: {
			color: this.colors.dark,
			fontSize: 20,
		},
		buttonNext: {
			margin: 10,
			alignSelf: 'center',
		},
	})

	state = {
		recipe: null,
		steps: null,
		total: null,
		currentStep: 0,
		isFirst: true,
		isLast: false,
	}

	constructor(props) {
		super(props);
		this._loadData = this._loadData.bind(this);
		this._prevStep = this._prevStep.bind(this);
		this._nextStep = this._nextStep.bind(this);
	}

	componentDidMount() {
		console.log('RecipeStepsScreen componentDidMount');

		this._loadData();
	}

	_loadData() {
		const recipe = { ...this.props.route.params.recipe };
		const steps = recipe.steps || [];
		const total = steps.length;

		this.setState({
			recipe: recipe,
			steps: steps,
			total: total,
			currentStep: 0,
			isFirst: true,
			isLast: total === 1, // only one step
		});
	}

	_prevStep() {
		console.log('Previous step');

		let { isFirst, total, currentStep } = this.state;

		if (isFirst) {
			this.props.navigation.goBack();
			return;
		}

		let newCurrent = currentStep - 1;

		this.setState({
			currentStep: newCurrent,
			isFirst:     newCurrent === 0,
			isLast:      newCurrent === total-1,
		});
	}

	_nextStep() {
		console.log('Next step');

		let { isLast, total, currentStep } = this.state;

		if (isLast) {
			this.props.navigation.goBack();
			return;
		}

		let newCurrent = currentStep + 1;

		this.setState({
			currentStep: newCurrent,
			isFirst:     false,
			isLast:      newCurrent === total-1,
		})
	}

	render() {
		let current = this.state.currentStep;
		let steps   = this.state.steps;

		if (!steps) {
			console.log('Steps not loaded');
			return <View />;
		}

		let step = this.state.steps[current];

		return (
			<ErrorBoundary style={{ flex: 1 }}>
				<SafeAreaView style={this.styles.container}>
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + (this.state.isFirst ? 'close' : 'arrow-back')}
						size={34}
						style={this.styles.icon}
						onPress={this._prevStep} />

					<Text style={this.styles.title} numberOfLines={1}>{current + 1}.</Text>

					<ScrollView style={this.styles.scrollView} contentContainerStyle={this.styles.contentScrollView}>
						<Text style={this.styles.description}>{step.description}</Text>
					</ScrollView>

					<Button title={this.state.isLast ? 'RATE IT' : 'NEXT'} onPress={this._nextStep} style={this.styles.buttonNext} />
				</SafeAreaView>
			</ErrorBoundary>
		);
	}
}
