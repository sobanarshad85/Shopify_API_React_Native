//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import * as controller from './controller'
import strings from '../../resources/constants'
// import { any } from 'prop-types';

export interface Props {
    navigation:any
    }

// create a component
class AuthCheckScreen extends React.Component<Props> {
    static token: boolean = false;
    componentDidMount() {
        setTimeout(() => {
            controller.authChecking(AuthCheckScreen.token, this.props.navigation)
        }, 1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: color.background, fontSize: 30, fontWeight: 'bold', }}>{strings.appName}</Text>
                <Text style={{ color: color.background }}>This is splash Screen</Text>
            </View>
        );
    }
}

//make this component available to the app
export default AuthCheckScreen;
