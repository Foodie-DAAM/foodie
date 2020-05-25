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

	render() {
		let { style, styleInput, ...props} = this.props;
		let borderColor = props.editable ? colors.dark : colors.gray;

		return (
			<BasicInput style={[styles.container, { borderBottomColor: borderColor }, style]} styleInput={[styles.input, styleInput]} {...props} />
		);
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
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
});