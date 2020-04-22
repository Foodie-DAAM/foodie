import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from "../assets/maluma.jpg";
import ProfileInput from "../components/ProfileInput";

let mockProfile = {
	fullName: "Juan Luis Londoño Arias",
	nickName: "Maluma",
	birthDate: "28/01/1994",
	email: "maluma@maluma.com",
	country: "PT",
	imageUrl: 'https://us.hola.com/images/0258-0e5693de36b4-f4fd1bc7cb5c-1000/horizontal-1150/maluma-makes-drastic-hair-change.jpg'
};

export default class ProfileScreen extends React.Component {
	state = { user: null };

	componentDidMount() { //Load the profile information !?!?
		this.setState({user: null})
		console.log("ProfileScreen ComponentDidMount Ended")
	}

	render() {
		return (
			<SafeAreaView>
				<Text>Profile</Text>
				<Text>{this.state.user?.name}</Text>

				<Image source={image} style={ styles.image } />

				<Text style={styles.title}>Account Info</Text>

				<ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
					<ProfileInput title={"FullName"} isReadonly={false} value={mockProfile.fullName} />
					<ProfileInput title={"Nick Name"} isReadonly={false} value={mockProfile.nickName} />
					<ProfileInput title={"Date of Birth"} isReadonly={false} value={mockProfile.birthDate} />
					<ProfileInput title={"Email"} isReadonly={false} value={mockProfile.email} />
					<ProfileInput title={"Country"} isReadonly={false} value={mockProfile.country} />
				</ScrollView>

				<Button title={"Log Out"}></Button>

			</SafeAreaView>
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
			marginTop: 10
		},
		contentScrollView: {
			marginBottom: 15
		}
	}
)