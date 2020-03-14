import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ProfileScreen extends React.Component {
	state = { user: null };

	render() {
		return (
			<SafeAreaView>
				<Text>Profile</Text>
				<Text>{this.state.user?.name}</Text>
			</SafeAreaView>
		);
	}
}