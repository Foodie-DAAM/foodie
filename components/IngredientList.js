import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux';

import Card from './Card';

import { removeIngredient } from '../store/ingredientsSlice';


class IngredientListBase extends React.Component {

	constructor(props) {
		super(props);
		this._renderRow = this._renderRow.bind(this);
	}

	_renderRow(ingredient) {
		return (
			<View style={styles.item}>
				<Text style={styles.itemText}>{ingredient.name}</Text>
				<Ionicons
					name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'close'}
					size={30}
					style={styles.itemIcon}
					onPress={() => this.props.removeIngredient(ingredient)} />
			</View>
		);
	}

	render() {
		return (
			<Card style={styles.container}>
				<FlatList
					data={this.props.data}
					renderItem={({ item }) => this._renderRow(item)}
					keyExtractor={item => item.id.toString()}
					// ListHeaderComponent={this._renderHeader}
					// ListFooterComponent={this._renderFooter}
				/>
			</Card>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removeIngredient: ingredient => dispatch(removeIngredient(ingredient.id))
	};
};

const IngredientList = connect(null, mapDispatchToProps)(IngredientListBase);
export default IngredientList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		height: 60,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},
	itemText: {
		flex: 1,
	},
	itemIcon: {
	}
});