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
            marginLeft: 5,
            marginBottom: 0,
            color: this.colors.dark,
        },
        input: {
            width: '70%',
            alignSelf: 'stretch',
            fontSize: 18,
            marginBottom: 10,
        }
    })

    render() {
        let { title, value, ...props } = this.props;

        return (
            <>
                <Text style={this.styles.title}>
                    {title}
                </Text>

                <StyledInput
                    style={this.styles.input}
                    multiline={false}
                    maxLength={25}
                    editable={!this.props.isReadonly}
                    {...props}
                >
                    {this.props.value}
                </StyledInput>
            </>
        )
    }
}
