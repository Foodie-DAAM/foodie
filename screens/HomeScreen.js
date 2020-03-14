import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
    render() {
      return (
        <SafeAreaView style={styles.container}>
            <Text>Home</Text>
            <Button title="Login"   onPress={() => this.props.navigation.navigate('Login')} />
            <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile')} />
            <Button title="Recipe"  onPress={() => this.props.navigation.navigate('Recipe')} />
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});