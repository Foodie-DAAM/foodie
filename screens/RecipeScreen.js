import React from 'react';
import {
	Text,
	View,
	Image,
	ActivityIndicator,
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

	state = {
		liked: false,
		loading: false,
	};

	render() {
		const recipe = this.props.route.params.recipe;

		let content;
		if (this.state.loading) {
			content = (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={Platform.OS === 'android' ? 60 : 'large'} color={colors.primary} />
				</View>
			)
		} else {
			content = (
				<View style={{ flex: 1 }}>
					<RecipeTabView recipe={recipe} />
					<Button title="START COOKING" onPress={() => alert('not implemented')} style={styles.startCookingButton} />
				</View>
			)
		}

		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<Image source={require('../assets/recipe.webp')} style={styles.image} />

				<SafeAreaConsumer>
					{insets => (
						<View style={[styles.icons, { left: insets.left, top: insets.top, right: insets.right }]}>
							<Ionicons
								name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'arrow-back'}
								size={34}
								style={styles.icon}
								onPress={() => this.props.navigation.goBack()} />

							<View style={{ flex: 1 }} />{/*spacer*/}

							<Ionicons
								name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'bug'}
								size={34}
								style={styles.icon}
								onPress={() => this.setState({ loading: !this.state.loading })} />

							<Ionicons
								name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'heart' + (this.state.liked ? '' : '-empty')}
								size={34}
								style={styles.icon}
								onPress={() => this.setState({ liked: !this.state.liked })} />
						</View>
					)}
				</SafeAreaConsumer>

				<Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>

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

const { colors } = getTheme();
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
});