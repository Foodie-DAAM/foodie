import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import ProfileInput from '../components/ProfileInput';
import ErrorBoundary from "../components/ErrorBoundary";
import { SafeAreaConsumer } from "react-native-safe-area-context";


let mockProfile = {
	fullName: 'Juan Luis Londoño Arias',
	nickName: 'Maluma',
	birthDate: '28/01/1994',
	email: 'maluma@foodie.com',
	country: 'PT',
	imageUrl: 'https://i.sandrohc.net/maluma.jpg'
};

export default class ProfileScreen extends React.Component {
	state = { user: null };

	componentDidMount() { // TODO: Load the profile information !?!?
		this.setState({user: null})
		console.log("ProfileScreen ComponentDidMount Ended")
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Image source={{ uri: mockProfile.imageUrl, cache: 'force-cache' }} style={ styles.image } />

				<Text style={styles.title}>Account Info</Text>

				<SafeAreaConsumer>
					{insets => (
						<View style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, flex: 1 }}>
							<ErrorBoundary>
								<ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
									<ProfileInput title="Name" isReadonly={false} value={mockProfile.fullName} />
									<ProfileInput title="Nickname" isReadonly={false} value={mockProfile.nickName} />
									<ProfileInput title="Date of Birth" isReadonly={false} value={mockProfile.birthDate} />
									<ProfileInput title="Email" isReadonly={false} value={mockProfile.email} />
									<ProfileInput title="Country" isReadonly={false} value={mockProfile.country} />
								</ScrollView>

								<Button secondary title="Log Out" style={styles.logOut} />
							</ErrorBoundary>
						</View>
					)}
				</SafeAreaConsumer>


			</View>
		);
	}
}

const styles = StyleSheet.create(
	{
		image: {
			width: Dimensions.get('window').width,
			height: 250,
		},
		title: {
			fontWeight: 'bold',
			fontSize: 30,
			marginLeft: 5,
			marginTop: 10,
		},
		contentScrollView: {
			flex: 1,
			marginBottom: 15,
		},
		logOut: {
			backgroundColor: 'transparent',
			borderWidth: 0,
		}
	}
)