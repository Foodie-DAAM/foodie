import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import { getTheme } from '../../theme';

import StyledInput from './StyledInput';

export default class ProfileInput extends React.Component {

    colors = getTheme().colors;
    styles = StyleSheet.create({
        title: {
            width: '50%',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 0,
            marginBottom: 0,
            color: this.colors.dark,
        },
        input: {
            width: '70%',
            alignSelf: 'stretch',
            fontSize: 18,
            marginLeft: 5,
            marginBottom: 10,
        }
    })

    render() {
        return (
            <View>
                <Text style={this.styles.title}> {this.props.title} </Text>
                <StyledInput style={this.styles.input} multiline={false} maxLength={25} editable={!this.props.isReadonly}>{this.props.value}</StyledInput>
            </View>
        )
    }
}
