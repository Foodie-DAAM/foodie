import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'


export default class BasicInput extends React.Component {

	render() {
		return (
			<View>
				<TextInput
					{...this.props}
					ref={(input) => this.props.inputRef && this.props.inputRef(input)} />
				<Text>
					{this.props.error}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
});