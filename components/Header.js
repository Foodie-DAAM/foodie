import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import imgHeader from "../assets/header.jpg";

export default class Header extends React.Component {
	render() {
		return (
			<ImageBackground
				resizeMode={'cover'}
				source={imgHeader}
				style={styles.container}
			>
				<SafeAreaView style={styles.icons}>
					<Ionicons
						name="md-person"
						style={styles.icon}
						onPress={() => navigation.navigate('Profile')}
					/>
					<Ionicons
						name="md-settings"
						style={styles.icon}
						onPress={() => navigation.navigate('Settings')}
					/>
				</SafeAreaView>
				<Text
					style={styles.title}
					onPress={() => navigation.navigate('Home')}
				>Foodie</Text>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0, 0, 0, 0.08)',
		padding: 15
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	icon: {
		color: 'rgba(255, 255, 255, 1)',
		fontSize: 28,
		marginLeft: 20
	},
	title: {
		paddingTop: 25,
		fontSize: 28,
		color: 'rgba(255, 255, 255, 1)',
		fontWeight: '100',
		fontFamily: 'Roboto'
	},
});