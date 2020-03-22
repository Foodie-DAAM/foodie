import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'


export default class Button extends React.PureComponent {
	styles = (this.props.secondary === undefined)
		? { button: styles.buttonPrimary,   text: styles.textPrimary }
		: { button: styles.buttonSecondary, text: styles.textSecondary };

	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<View style={[styles.button, this.styles.button, this.props.style]}>
					<Text style={[styles.text, this.styles.text]}>
						{this.props.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

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
		backgroundColor: '#E67332',
	},
	buttonSecondary: {
		backgroundColor: 'white',
		borderColor: '#E67332',
		borderWidth: 1,
	},

	textPrimary: {
		color: 'white',
	},
	textSecondary: {
		color: '#E67332',
	}
});