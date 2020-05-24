import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import { getTheme } from '../../theme';

import StyledInput from './StyledInput';

export default class ProfileInput extends React.Component {

    render() {
        return (
            <View>
                <Text style={style.title}> {this.props.title} </Text>
                <StyledInput style={style.input} multiline={false} maxLength={25} editable={!this.props.isReadonly}>{this.props.value}</StyledInput>
            </View>
        )
    }
}

const { colors } = getTheme();
const style = StyleSheet.create({
    title: {
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 0,
        color: colors.dark,
    },
    input: {
        width: '70%',
        alignSelf: 'stretch',
        fontSize: 18,
        marginLeft: 5,
        marginBottom: 10,
    }
});