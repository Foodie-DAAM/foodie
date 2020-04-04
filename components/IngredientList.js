import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

import { removeIngredient } from '../store/ingredientsSlice';


class CellContainer extends React.Component {
	render() {
		return <View {...this.props}>{this.props.children}</View>;
	}
}

class IngredientListBase extends React.Component {

	constructor(props) {
		super(props);
		this._rowRenderer = this._rowRenderer.bind(this);

		let { width } = Dimensions.get("window");

		this._layoutProvider = new LayoutProvider(
			index => 0,
			(type, dim) => {
				dim.width = width;
				dim.height = 100;
			}
		);

		this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1 !== r2;
			}).cloneWithRows(this.props.data)
		};
	}

	// componentDidUpdate(prevProps) {
	// 	console.log("componentDidUpdate");
	// 	if (this.props.data.length !== prevProps.data.length) {
	// 		console.log("new length: " + this.props.data.length);
	// 		this.setState({
	// 			dataProvider: this.state.dataProvider.cloneWithRows(this.props.data)
	// 		});
	// 	}
	// }

	_rowRenderer(type, data) {
		return (
			<CellContainer style={styles.container}>
				<TouchableOpacity onPress={() => this.props.removeIngredient(data)}>
					<Text>{data.name}</Text>
				</TouchableOpacity>
			</CellContainer>
		);
	}

	render() {
		return (
			<RecyclerListView
				layoutProvider={this._layoutProvider}
				dataProvider={this.state.dataProvider}
				rowRenderer={this._rowRenderer} />
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
		justifyContent: "space-around",
		alignItems: "center",
		flex: 1,
		backgroundColor: "#00a1f1"
	},
});