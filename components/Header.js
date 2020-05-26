import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import { getTheme } from '../theme';

import Logo from '../assets/hamburger.svg';

export default class Header extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		header: {
			alignItems: 'center',
			marginTop: 20,
		},
		title: {
			textAlign: 'center',
			fontSize: 40,
			color: this.colors.dark,
			fontWeight: 'bold',
			marginTop: 5,
		},
	})

	render() {
		return (
			<View style={this.styles.header}>
				<Logo width={130} height={130} />

				<Text style={this.styles.title}>
					{this.props.title || 'Foodie'}
				</Text>
			</View>
		);
	}
}
