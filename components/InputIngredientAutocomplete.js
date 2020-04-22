import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity, FlatList,
} from 'react-native';

import BasicInput from './BasicInput';

export default class InputIngredientAutocomplete extends React.Component {
	state = {
		query: '',
		queryResults: [],
	}

	constructor(props) {
		super(props);
		this.input = null;
		this._renderItem = this._renderItem.bind(this);
		this._fetch = this._fetch.bind(this);
		this._select = this._select.bind(this);
	}

	_renderItem({ item }) {
		return (
			<TouchableOpacity onPress={() => this._select(item)} style={styles.resultItem}>
				<Text>{item}</Text>
			</TouchableOpacity>
		)
	}

	_fetch(text) {
		console.log('Fetch:', text);

		this.setState({
			query: text,
			queryResults: [
				text + '-1',
				text + '-2',
				text + '-3',
			]
		});
	}

	_select(item) {
		console.log('Selected:', item);

		this.setState({
			query: '',
			queryResults: [],
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<BasicInput
					value={this.state.query}
					onChangeText={text => { this._fetch(text); }}

					returnKeyType={"next"}
					onSubmitEditing={() => { this._select(this.state.query) }}
					blurOnSubmit={false} />

				<FlatList
					data={this.state.queryResults}
					renderItem={this._renderItem}
					keyExtractor={item => item}
					style={styles.results}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'gray',
	},
	results: {
		marginLeft: 10,
		marginRight: 10,
	},
	resultItem: {
		padding: 10,
		borderColor: 'black',
		borderBottomWidth: 2,
	}
});