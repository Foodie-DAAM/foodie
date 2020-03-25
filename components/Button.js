import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { getTheme } from "../theme";


export default class Button extends React.PureComponent {
	styles = (this.props.secondary === undefined)
		? { button: styles.buttonPrimary,   text: styles.textPrimary }
		: { button: styles.buttonSecondary, text: styles.textSecondary };

	render() {
		return (
			<TouchableOpacity {...this.props}>
				<View style={[styles.button, this.styles.button, this.props.style]}>
					<Text style={[styles.text, this.styles.text]}>
						{this.props.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		margin: 10,
		borderRadius: 20,
	},
	text: {
	},

	buttonPrimary: {
		backgroundColor: colors.primary,
	},
	buttonSecondary: {
		backgroundColor: colors.textLight,
		borderColor: colors.primary,
		borderWidth: 1,
	},

	textPrimary: {
		color: colors.textLight,
	},
	textSecondary: {
		color: colors.primary,
	}
});