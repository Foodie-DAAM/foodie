import React from 'react';
import {
	StyleSheet,
	View,
	TouchableHighlight,
} from 'react-native';
import { getTheme } from "../theme";

export default class Card extends React.Component {
	render() {
		const content = (
			<View style={styles.container}>
				{this.props.children}
			</View>
		)

		if (this.props.onPress) {
			return (
				<TouchableHighlight {...this.props}>
					{content}
				</TouchableHighlight>
			)
		} else {
			return (
				<View {...this.props}>
					{content}
				</View>
			)
		}
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 15,
		backgroundColor: colors.light,

		marginTop: 5,
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,

		// https://ethercreative.github.io/react-native-shadow-generator
		elevation: 5,
		shadowColor: colors.dark,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});