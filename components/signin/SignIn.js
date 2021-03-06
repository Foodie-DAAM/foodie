import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import i18n from 'i18n-js';

import { getTheme } from '../../theme';

import SignInGoogle from './SignInGoogle';
import SignInFacebook from './SignInFacebook';

export default class SignIn extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		text: {
			color: this.colors.dark,
		}
	})

	render() {
		return (
			<View style={{ alignItems: 'center' }}>
				<Text style={this.styles.text}>{i18n.t('signIn.social.title')}</Text>

				<View style={{ flexDirection: 'row' }}>
					<SignInGoogle   onSuccess={this.props.onSuccess} onError={this.props.onError} onCancel={this.props.onCancel} onLoading={this.props.onLoading} />
					<SignInFacebook onSuccess={this.props.onSuccess} onError={this.props.onError} onCancel={this.props.onCancel} onLoading={this.props.onLoading} />
				</View>
			</View>
		)
	}
}
