import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import Logo from '../assets/hamburger.svg';
import { getTheme } from "../theme";

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

const { colors } = getTheme();
const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		marginTop: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 40,
		color: colors.dark,
		fontWeight: 'bold',
		marginTop: 5,
	},
});