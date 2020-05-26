import React from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { getTheme } from '../theme';

import BasicInput from "./input/BasicInput";

export default class SearchBar extends React.PureComponent {

	colors = getTheme().colors;
	styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'stretch',
			height: 54,
		},
		item: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: this.colors.lightish,
			borderRadius: 10,
		},
		button: {
			flex: 1,
			marginRight: 10,
		},
		icon: {
			width: 54,
			textAlign: 'center',
			color: this.colors.darkish,
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
			color: this.colors.darkish,
		},
	})

	render() {
		return (
			<View style={[this.styles.container, this.props.style]}>
				<View style={[this.styles.item, this.styles.button]}>
					<Ionicons
						name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'search'}
						size={34}
						style={this.styles.icon}
					/>
					<BasicInput
						placeholder="Search..."
						style={this.styles.text}
						onSubmitEditing={this.props.onSubmit} />
				</View>
				<TouchableWithoutFeedback onPress={() => alert('Search Settings\n[NOT IMPLEMENTED]')}>
					<View style={[this.styles.item, this.styles.settings2]}>
						<Ionicons
							name={(Platform.OS === 'android' ? 'md-' : 'ios-') + 'more'}
							size={34}
							style={this.styles.settings}
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}
