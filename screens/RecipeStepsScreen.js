import React from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
} from 'react-native';
import i18n from 'i18n-js';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';

import ErrorBoundary from '../components/ErrorBoundary';
import Button from '../components/Button';


export class Step extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
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
		},
	})

	constructor(props) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
	}

	_onSubmit() {
		this.props.onSubmit();
	}

	render() {
		let { description } = this.props.step;
		return (
			<View style={this.styles.container}>
				<Text style={this.styles.title} numberOfLines={1}>{this.props.index}.</Text>

				<ScrollView style={this.styles.scrollView} contentContainerStyle={this.styles.contentScrollView}>
					<Text style={this.styles.description}>{description}</Text>
				</ScrollView>

				<Button
					title={i18n.t('recipe.steps.next').toUpperCase()}
					onPress={this._onSubmit}
					style={this.styles.buttonNext} />
			</View>
		)
	}
}


export class Rating extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
		},
		ratingContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
		},
		description: {
			color: this.colors.dark,
			textAlign: 'center',
			fontSize: 20,
			marginBottom: 30,
		},
		icon: {
			width: 100,
			height: 100,
			padding: 30,
			margin: 10,
			borderRadius: 100,
			borderWidth: 1,
			borderColor:     this.colors.primary,
			color:           this.colors.primary,
		},
		selected: {
			color:           this.colors.light,
			backgroundColor: this.colors.primary,
		},
		buttonNext: {
			margin: 10,
		},
		spacer: {
			flexGrow: 1,
		}
	})

	state = {
		rating: null,
	}

	constructor(props) {
		super(props);
		this._onPositive = this._onPositive.bind(this);
		this._onNegative = this._onNegative.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	_onPositive() {
		let current = this.state.rating;
		this.setState({
			rating: current !== true ? true : null
		})
	}

	_onNegative() {
		let current = this.state.rating;
		this.setState({
			rating: current !== false ? false : null
		})
	}

	_onSubmit() {
		this.props.onSubmit();

		// if (this.state.rating === null) {
		// 	this.props.onSubmit();
		// 	return;
		// }
		//
		// return fetch(`https://foodie.sandrohc.net/review/${recipeId}?user=${userId}&rating=${rating}`)
		// 	.then(response => response.json())
		// 	.then(data => console.log('Rating submitted!', data))
		// 	.catch(error => console.error('Error while submitting rating:', error))
		// 	.finally(() => this.props.onSubmit());
	}

	render() {
		let { rating } = this.state;

		let stylePositive = this.styles.icon;
		let styleNegative = this.styles.icon;

		if (rating === true)
			stylePositive = [ stylePositive, this.styles.selected ];
		else if (rating === false)
			styleNegative = [ styleNegative, this.styles.selected ];

		return (
			<View style={this.styles.container}>
				<View style={this.styles.spacer} />{/* spacer */}

				<Text style={this.styles.description}>{i18n.t('recipe.rate.description')}</Text>

				<View style={this.styles.ratingContainer}>
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'thumbs-up'}
						size={50}
						style={stylePositive}
						onPress={this._onPositive} />

					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'thumbs-down'}
						size={50}
						style={styleNegative}
						onPress={this._onNegative} />
				</View>

				<View style={this.styles.spacer} />{/* spacer */}

				<Button
					title={i18n.t('recipe.rate.submit').toUpperCase()}
					onPress={this._onSubmit}
					style={this.styles.buttonNext} />
			</View>
		)
	}
}


export default class RecipeStepsScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			backgroundColor: this.colors.light,
			flex: 1,
		},
		icon: {
			padding: 15,
			color: this.colors.dark,
			width: 100, // larger box to make it easier to press
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
			isLast: total < 1, // only one step
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
			isLast:      newCurrent === total,
		});
	}

	_nextStep() {
		console.log('Next step');

		let { isLast, total, currentStep } = this.state;

		if (isLast) {
			this.props.navigation.goBack()
			return;
		}

		let newCurrent = currentStep + 1;

		this.setState({
			currentStep: newCurrent,
			isFirst:     false,
			isLast:      newCurrent === total,
		})
	}

	render() {
		let { isFirst, isLast } = this.state;

		let current = this.state.currentStep;
		let steps   = this.state.steps;

		if (!steps) {
			console.log('Steps not loaded');
			return <View />;
		}

		console.log('STATE', JSON.stringify({  isFirst, isLast, current, total: this.state.total, steps: this.state.steps[current] }, null, 2))

		let step = isLast ? null : this.state.steps[current];

		return (
			<ErrorBoundary style={{ flex: 1 }}>
				<SafeAreaView style={this.styles.container}>
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + (isFirst ? 'close' : 'arrow-back')}
						size={34}
						style={this.styles.icon}
						onPress={this._prevStep} />

					{isLast ? <Rating onSubmit={this._nextStep} /> : <Step index={current + 1} step={step} onSubmit={this._nextStep} />}

				</SafeAreaView>
			</ErrorBoundary>
		);
	}
}
