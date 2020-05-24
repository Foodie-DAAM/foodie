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

	render() {
		let { style, styleInput, ...inputProps} = this.props;

		return (
			<View style={[styles.container, style]}
				// onPress={() => this.input.clicked()}
			>
				{this.props.icon &&
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + this.props.icon}
						size={26}
						style={styles.icon}
					/>
				}

				<TextInput
					{...inputProps}
					ref={(input) => this.props.inputRef && this.props.inputRef(input)}
					style={[styles.input, styleInput]} />
				<Text>
					{this.props.error}
				</Text>
			</View>
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
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
		color: colors.primary,
	},
	input: {
		flexGrow: 1,
		padding: 10,
		color: colors.dark,
	}
});