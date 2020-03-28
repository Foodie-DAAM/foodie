import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends React.Component {
	render() {
		return (
			<View style={styles.header}>
				<Ionicons
					name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'bulb'}
					style={styles.icon} />
				<Text style={styles.title}>
					{this.props.title || 'Foodie'}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		marginTop: 30,
	},
	icon: {
		color: 'rgba(230, 115, 50, 1)',
		fontSize: 130,
	},
	title: {
		textAlign: 'center',
		fontSize: 40,
		color: 'black',
		fontWeight: 'bold',
		marginTop: 10,
	},
});