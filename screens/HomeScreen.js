import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header'
import Button from '../components/Button'


export default class HomeScreen extends React.Component {

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<Text>
					Home
				</Text>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({

});