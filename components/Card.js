import React from 'react';
import {
	StyleSheet,
	View,
	TouchableHighlight,
} from 'react-native';
import { getTheme } from '../theme';

export default class Card extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			borderRadius: 15,
			backgroundColor: this.colors.light,

			marginTop: 5,
			marginBottom: 5,
			marginLeft: 20,
			marginRight: 20,

			// https://ethercreative.github.io/react-native-shadow-generator
			elevation: 5,
			shadowColor: this.colors.dark,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
		},
	})

	render() {
		const content = (
			<View style={this.styles.container}>
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
