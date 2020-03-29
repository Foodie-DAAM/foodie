import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';

import * as firebase from 'firebase';

import LogoFacebook from '../../assets/signin/facebook-2-opt.svg';


export default class SignInFacebook extends React.Component {

	onPress = () => {
		alert('SIGN IN - FACEBOOK')
	};

	render() {
		return (
			<TouchableOpacity style={{ margin: 10, backgroundColor: '#1877f2', borderRadius: 120 }} onPress={this.onPress}>
				<LogoFacebook width={50} height={50} fill="#fff" style={{ borderRadius: 50 }} />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
});