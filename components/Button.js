import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { getTheme } from '../theme';


export default class Button extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		button: {
			alignItems: 'center',
			justifyContent: 'center',
			padding: 20,
			borderRadius: 20,
		},
		text: {
		},

		buttonPrimary: {
			backgroundColor: this.colors.primary,
		},
		buttonSecondary: {
			backgroundColor: this.colors.light,
			borderColor: this.colors.primary,
			borderWidth: 1,
		},

		textPrimary: {
			color: 'white',
		},
		textSecondary: {
			color: this.colors.primary,
		}
	});

	render() {
		let { style, title, ...props } = this.props;

		let buttonStyles = (this.props.secondary === undefined)
			? { button: this.styles.buttonPrimary,   text: this.styles.textPrimary }
			: { button: this.styles.buttonSecondary, text: this.styles.textSecondary };

		let content = (
			<View style={[buttonStyles.button, this.styles.button, style]} {...props}>
				{this.props.children ? this.props.children : <Text style={[buttonStyles.text, buttonStyles.text]}>{title}</Text>}
			</View>
		);

		if (this.props.onPress) {
			return (
				<TouchableOpacity {...this.props}>
					{content}
				</TouchableOpacity>
			)
		} else {
			return (
				<>
					{content}
				</>
			)
		}
	}
}