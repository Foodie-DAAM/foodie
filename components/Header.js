import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import Logo from '../assets/hamburger.svg';

export default class Header extends React.Component {
	render() {
		return (
			<View style={styles.header}>
				<Logo width={130} height={130} />

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
		marginTop: 25,
	},
	title: {
		textAlign: 'center',
		fontSize: 40,
		color: 'black',
		fontWeight: 'bold',
		marginTop: 5,
	},
});