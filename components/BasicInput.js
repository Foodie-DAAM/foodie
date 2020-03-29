import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";


export default class BasicInput extends React.Component {

	render() {
		return (
			<View style={styles.container}
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
					{...this.props}
					ref={(input) => this.props.inputRef && this.props.inputRef(input)}
					style={styles.input} />
				<Text>
					{this.props.error}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 10,
		margin: 0, // 5

		borderBottomWidth: 2,
		borderBottomColor: '#000',

		flexDirection: 'row'
	},
	input: {
	},
	icon: {
		textAlign: 'center',
		width: 26,
		color: '#000',
		marginRight: 10,
	}
});