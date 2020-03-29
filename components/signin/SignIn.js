import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import { getTheme } from '../../theme';

import SignInGoogle from './SignInGoogle';
import SignInFacebook from './SignInFacebook';

export default class SignIn extends React.Component {
	render() {
		return (
			<View style={{ alignItems: 'center' }}>
				<Text>or sign in with</Text>

				<View style={{ flexDirection: 'row' }}>
					<SignInGoogle />
					<SignInFacebook />
				</View>
			</View>
		)
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
});