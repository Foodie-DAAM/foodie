import React from 'react'
import {Text, StyleSheet, TextInput, View} from 'react-native'

export default class ProfileInput extends React.Component {

    render() {
        return (
            <View>
                <Text style={style.title}> {this.props.title} </Text>
                <TextInput style={style.input} multiline={false} maxLength={25} editable={!this.props.isReadonly}>{this.props.value}</TextInput>
            </View>
        )
    }
}

const style = StyleSheet.create({
    title: {
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 0,
    },
    input: {
        width: '70%',
        alignSelf: 'stretch',
        color: "black",
        fontSize: 18,
        paddingLeft: 0,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginBottom: 10,
    }
});