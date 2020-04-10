import React from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from 'react-native';

export default class Card extends React.Component {
	render() {
		return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
				<View style={styles.container}>
					{this.props.children}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 15,
		backgroundColor: 'white',

		marginTop: 5,
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,

		// https://ethercreative.github.io/react-native-shadow-generator
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});