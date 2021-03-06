import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	FlatList,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import { getTheme } from '../theme';

import Button from '../components/Button';
import CardRecipe from '../components/CardRecipe';
import SearchBar from '../components/SearchBar';
import ErrorBoundary from '../components/ErrorBoundary';


const STORE_INGREDIENTS = 'ingredients';

export default class HomeScreen extends React.Component {
	static contextType = NavigationContext;

	colors = getTheme().colors;
	styles = StyleSheet.create({
		safeArea: {
			flex: 1,
		},
		container: {
			backgroundColor: this.colors.light, // TODO: move to root component
			flex: 1,
			// padding: 20,
		},
		loading: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		error: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		scroll: {
			flex: 1,
		},
		ingredientsButton: {
			marginTop: 10,
			marginLeft: 10,
			marginRight: 10,
			marginBottom: 10,
		},
	})

	state = {
		data: [],
		page: 0,
		loading: true,
		loadingMore: true,
		refreshing: false,
		error: null,
		search: null,
		ingredientCount: null,
	}

	constructor(props) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
		this._fillIngredientCount = this._fillIngredientCount.bind(this);
	}

	componentDidMount() {
		console.log('HomeScreen componentDidMount');

		this._fetchRecipes();
		this._fillIngredientCount();
	}

	onSearch(event) {
		let title = event.nativeEvent.text;
		this.setState({
			search: title,
			data: [],
			page: 0,
			loading: true,
			loadingMore: true,
		}, this._fetchRecipes);
	}

	_fetchRecipes = () => {
		const { page, search } = this.state;

		let url;
		if (search) {
			console.log('Searching for:', search);
			url = `https://foodie.sandrohc.net/recipes/search?title=${search}&page=${page}&size=10`;
		} else {
			console.log('Fetching recipes');
			url = `https://foodie.sandrohc.net/recipes/?page=${page}&size=10`;
		}

		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({
					data: page === 0
						? Array.from(data.content)
						: [...this.state.data, ...data.content],
					loading: false,
					loadingMore: false,
					refreshing: false,
				})
			})
			.catch(error => {
				console.error('Error while searching recipes for: ' + url, error);
				this.setState({
					error,
					loading: false,
				})
			});
	}

	_handleLoadMore = () => {
		this.setState(
			(prevState, nextProps) => ({
				page: prevState.page + 1,
				loadingMore: false,
			}),
			() => {
				this._fetchRecipes();
			}
		);
	}

	_handleRefresh = () => {
		this.setState(
			{
				data: [],
				page: 0,
				refreshing: true,
			},
			() => {
				this._fetchRecipes();
			}
		);
	}

	_renderFooter = () => {
		if (!this.state.loadingMore) return null;

		return (
			<View style={{
					paddingVertical: 20,
					marginTop: 10,
					marginBottom: 10,
				}}>
				<ActivityIndicator animating size="large" color={this.colors.primary} />
			</View>
		);
	}

	_fillIngredientCount() {
		this.setState({ ingredientCount: null });

		AsyncStorage.getItem(STORE_INGREDIENTS)
			.then(data => {
				data = JSON.parse(data) || [];
				this.setState({ ingredientCount: data.length });
			})
	}

	render() {
		let ingredientTitle = i18n.t('ingredient.title').toUpperCase();
		if (this.state.ingredientCount) {
			ingredientTitle += ' (' + this.state.ingredientCount + ')';
		}

		let content;
		if (this.state.loading) {
			content = (
				<View style={this.styles.loading}>
					<ActivityIndicator animating size={Platform.OS === 'android' ? 60 : 'large'} color={this.colors.primary} />
					<Text style={{ alignSelf: 'center', color: this.colors.dark }}>{i18n.t('recipe.loading', { count: 2 })}</Text>
				</View>
			)
		} else if (this.state.error) {
			content = (
				<View style={this.styles.error}>
					<Text style={{ color: this.colors.dark }}>
						{i18n.t('recipe.error')}
					</Text>
				</View>
			)
		} else {
			content = (
				<FlatList
					data={this.state.data}
					renderItem={({ item }) => <CardRecipe recipe={item} />}
					keyExtractor={item => item.id.toString()}
					// ListHeaderComponent={this._renderHeader}
					ListFooterComponent={this._renderFooter}
					onRefresh={this._handleRefresh}
					refreshing={this.state.refreshing}
					onEndReached={this._handleLoadMore}
					onEndReachedThreshold={0.5}
					initialNumToRender={10} />
			)
		}

		return (
			<SafeAreaConsumer>
				{insets => (
					<View style={[this.styles.safeArea, { left: insets.left, right: insets.right }]}>

						<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

						<View style={this.styles.container}>
							<SearchBar style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20, }} onSubmit={this.onSearch} />

							<ErrorBoundary>
								{content}
							</ErrorBoundary>

							<Button title={ingredientTitle} style={this.styles.ingredientsButton} onPress={() => this.props.navigation.navigate('Ingredients')} />
						</View>
					</View>
				)}
			</SafeAreaConsumer>
		);
	}
}
