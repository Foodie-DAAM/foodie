import React from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	Image,
	StyleSheet,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { getTheme } from '../theme';

import Button from '../components/Button';
import ErrorBoundary from '../components/ErrorBoundary';
import RecipeTabView from '../components/recipe/RecipeTabView';


export default class RecipeScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: this.colors.light,
		},
		loading: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		error: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		errorText: {
			color: this.colors.dark,
		},
		scene: {
			// flex: 1,
		},
		image: {
			height: 250,
		},
		title: {
			fontSize: 20,
			position: 'absolute',
			top: 190,
			left: 0,
			padding: 15,
			color: 'white',
		},
		buttonStartCooking: {
			margin: 10,
		},

		icons: {
			position: 'absolute',
			flex: 1,
			flexDirection: 'row',
		},
		icon: {
			padding: 15,
			color: 'white',
		},
	})

	state = {
		recipe: false,
		liked: false,
		loading: true,
		error: false,
	}

	componentDidMount() {
		const recipe = this.props.route.params.recipe;
		this.state.recipe = { ...recipe }

		fetch('https://foodie.sandrohc.net/recipes/' + recipe.id)
			.then(response => response.json())
			.then(data => {
				this.setState({
					recipe: data,
					loading: false,
				})
			})
			.catch(error => {
				console.error('Error while fetching recipe with ID ' + recipe.id, error);
				this.setState({
					error: true,
				})
			});
	}

	render() {
		const navigation = this.context;

		let content;
		if (this.state.loading) {
			content = (
				<View style={this.styles.loading}>
					<ActivityIndicator size={Platform.OS === 'android' ? 60 : 'large'} color={this.colors.primary} />
				</View>
			)
		} else if (this.state.error) {
			content = (
				<View style={this.styles.error}>
					<Text style={this.styles.errorText}>
						Error loading the recipe. Try again later.
					</Text>
				</View>
			)
		} else {
			content = (
				<View style={{ flex: 1 }}>
					<RecipeTabView recipe={this.state.recipe} />
					<Button title="START COOKING" onPress={() => navigation.navigate('RecipeSteps', { recipe: this.state.recipe })} style={this.styles.buttonStartCooking} />
				</View>
			)
		}

		return (
			<View style={this.styles.container}>
				<Image source={{ uri: this.state.recipe.picture, cache: 'force-cache' }} defaultSource={require('../assets/recipe.webp')} style={this.styles.image} />

				<SafeAreaConsumer>
					{insets => (
						<View style={[this.styles.icons, { left: insets.left, top: insets.top, right: insets.right }]}>
							<Ionicons
								name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'arrow-back'}
								size={34}
								style={this.styles.icon}
								onPress={() => this.props.navigation.goBack()} />

							<View style={{ flex: 1 }} />{/*spacer*/}

							<Ionicons
								name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'heart' + (this.state.liked ? '' : '-empty')}
								size={34}
								style={this.styles.icon}
								onPress={() => this.setState({ liked: !this.state.liked })} />
						</View>
					)}
				</SafeAreaConsumer>

				<Text style={this.styles.title} numberOfLines={1}>{this.state.recipe.title}</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								{content}
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>
			</View>
		);
	}
}
