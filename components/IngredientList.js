import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

import { removeIngredient } from '../store/ingredientsSlice';
import { Ionicons } from "@expo/vector-icons";


class IngredientListBase extends React.Component {

	constructor(props) {
		super(props);
		this._rowRenderer = this._rowRenderer.bind(this);

		let { width } = Dimensions.get("window");

		this._layoutProvider = new LayoutProvider(
			index => 0,
			(type, dim) => {
				dim.width = width;
				dim.height = 60;
			}
		);

		this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1 !== r2;
			}).cloneWithRows(this.props.data)
		};
	}

	// componentDidUpdate(prevProps) {
	// 	console.log("componentDidUpdate", this.props.data.length, prevProps.data.length);
	// 	if (this.props.data.length !== prevProps.data.length) {
	// 		this.setState({
	// 			dataProvider: this.state.dataProvider.cloneWithRows(this.props.data)
	// 		});
	// 	}
	// }

	_rowRenderer(type, data) {
		return (
			<View style={styles.container}>
				<Text style={styles.itemText}>{data.name}</Text>
				<Ionicons
					name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'close'}
					size={34}
					style={styles.itemIcon}
					onPress={() => this.props.removeIngredient(data)} />
			</View>
		);
	}

	render() {
		return (
			<RecyclerListView
				layoutProvider={this._layoutProvider}
				dataProvider={this.state.dataProvider}
				rowRenderer={this._rowRenderer}
				style={styles.container} />
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
		// backgroundColor: '#0086f1',
		// height: 60,
		// padding: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'black',
	},
	item: {
		// flex: 1,
		backgroundColor: '#00a1f1',
	},
	itemText: {
		backgroundColor: '#23f1eb',
		flex: 1,
	},
	itemIcon: {
		backgroundColor: '#48f120',
		width: 50,
		color: 'black',
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
	}
});