import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class SignUpScreen extends React.Component {
	state = { user: null, accessToken: null };

	componentDidMount() {
	}

	render() {
		return (
			<SafeAreaView>
				<Text onPress={this.onPress}>{this.state.user ? 'Sign out' : 'Sign in'}</Text>
			</SafeAreaView>
		);
	}
}