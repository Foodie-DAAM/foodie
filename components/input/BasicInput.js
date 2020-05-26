import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { getTheme } from "../../theme";


export default class BasicInput extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			width: 'auto',
			height: 50,
		},
		icon: {
			flexBasis: 40,
			flexGrow: 0,
			textAlign: 'center',
			color: this.colors.primary,
		},
		input: {
			flexGrow: 1,
			padding: 10,
			color: this.colors.dark,
		},
		error: {
			color: this.colors.dark,
			textAlign: 'right',
		}
	})

	render() {
		let { style, styleInput, styleError, ...inputProps} = this.props;

		return (
			<View style={[this.styles.container, style]}>
				{this.props.icon &&
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + this.props.icon}
						size={26}
						style={this.styles.icon}
					/>
				}

				<TextInput
					{...inputProps}
					ref={(input) => this.props.inputRef && this.props.inputRef(input)}
					style={[this.styles.input, styleInput]} />

				<Text style={[this.styles.error, { flexGrow: this.props.error ? 1 : 0 }, styleError]}>{this.props.error}</Text>
			</View>
		);
	}
}
