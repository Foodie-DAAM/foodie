import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { getTheme } from '../../theme';

import SignInGoogle from './SignInGoogle';
import SignInFacebook from './SignInFacebook';

export default class SignIn extends React.Component {
	render() {
		return (
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.text}>or sign in with</Text>

				<View style={{ flexDirection: 'row' }}>
					<SignInGoogle   onSuccess={this.props.onSuccess} onError={this.props.onError} onLoading={this.props.onLoading} />
					<SignInFacebook onSuccess={this.props.onSuccess} onError={this.props.onError} onLoading={this.props.onLoading} />
				</View>
			</View>
		)
	}
}

const { colors } = getTheme();
const styles = StyleSheet.create({
	text: {
		color: colors.dark,
	}
});