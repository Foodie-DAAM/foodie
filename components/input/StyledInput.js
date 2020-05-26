import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native';
import { getTheme } from '../../theme';

import BasicInput from './BasicInput';


export default class StyledInput extends React.Component {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			backgroundColor: this.colors.light,
			borderRadius: 10,
			borderBottomWidth: 2,

			flexDirection: 'row',
			alignItems: 'center',
			width: 'auto',
			height: 50,
		},
		input: {
			flexGrow: 1,
			padding: 10,
		}
	})

	render() {
		let { style, styleInput, ...props} = this.props;
		let borderColor = props.editable ? this.colors.dark : this.colors.gray;

		return (
			<BasicInput
				style={[this.styles.container, { borderBottomColor: borderColor }, style]}
				styleInput={[this.styles.input, styleInput]} {...props} />
		);
	}
}
