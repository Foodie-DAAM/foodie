import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';

import Card from './Card';


export default class IngredientList extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
		},
		item: {
			flexDirection: 'row',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderBottomColor: this.colors.dark,
			height: 60,
			padding: 10,
			paddingLeft: 20,
			paddingRight: 20,
		},
		itemText: {
			flex: 1,
			color: this.colors.dark,
		},
		itemIcon: {
			color: this.colors.dark,
		}
	})

	constructor(props) {
		super(props);
		this._renderRow = this._renderRow.bind(this);
	}

	_renderRow(ingredient) {
		return (
			<View style={this.styles.item}>
				<Text style={this.styles.itemText}>{ingredient}</Text>
				<Ionicons
					name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'close'}
					size={30}
					style={this.styles.itemIcon}
					onPress={() => this.props.onRemove(ingredient)} />
			</View>
		);
	}

	render() {
		return (
			<Card style={this.styles.container}>
				<FlatList
					data={this.props.data}
					renderItem={({ item }) => this._renderRow(item)}
					keyExtractor={item => item.toString()}
					// ListHeaderComponent={this._renderHeader}
					// ListFooterComponent={this._renderFooter}
				/>
			</Card>
		);
	}
}
