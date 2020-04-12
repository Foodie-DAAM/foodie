import React from 'react';
import {
	Text,
	View,
	Image,
	StatusBar,
	StyleSheet
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'

import Button from '../components/Button';
import ErrorBoundary from '../components/ErrorBoundary';
import RecipeTabView from "../components/recipe/RecipeTabView";


export default class RecipeScreen extends React.Component {
	static contextType = NavigationContext;

	state = {
		liked: false
	};

	render() {
		const recipe = this.props.route.params.recipe;

		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<Image source={require('../assets/recipe.webp')} style={styles.image} />

				<SafeAreaConsumer>
					{insets => (
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'arrow-back'}
							size={34}
							style={{ position: 'absolute', left: insets.left, top: insets.top, padding: 15, color: 'white' }}
							onPress={() => this.props.navigation.goBack()}
						/>
					)}
				</SafeAreaConsumer>
				<SafeAreaConsumer>
					{insets => (
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'heart' + (this.state.liked ? '' : '-empty')}
							size={34}
							style={{ position: 'absolute', right: insets.right, top: insets.top, padding: 15, color: 'white' }}
							onPress={() => this.setState({ liked: !this.state.liked })}
						/>
					)}
				</SafeAreaConsumer>

				<Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<RecipeTabView recipe={recipe} />
								<Button title="START COOKING" onPress={() => alert('not implemented')} style={styles.startCookingButton} />
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
	startCookingButton: {
		margin: 10,
	}
});