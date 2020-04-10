import React from 'react';
import {
	StyleSheet,
	View,
	Text, TouchableWithoutFeedback
} from 'react-native';
import Logo from '../assets/hamburger.svg';
import { Ionicons } from "@expo/vector-icons";

export default class SearchBar extends React.Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableWithoutFeedback onPress={() => alert('search')}>
					<View style={[styles.item, styles.button]}>
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'search'}
							size={34}
							style={styles.icon}
						/>
						<Text style={styles.text}>Search recipes...</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => alert('search settings')}>
					<View style={[styles.item, styles.settings2]}>
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'more'}
							size={34}
							style={styles.settings}
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		height: 54,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		borderRadius: 10,
	},
	button: {
		flex: 1,
		marginRight: 10,
	},
	icon: {
		width: 54,
		textAlign: 'center',
	},
	text: {
		flex: 1,
		fontSize: 20,
	},
	settings2: {
	},
	settings: {
		width: 54,
		textAlign: 'center',
	},
});