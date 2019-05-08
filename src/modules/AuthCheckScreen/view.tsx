//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import * as controller from './controller'
import strings from '../../resources/constants'


// create a component
class AuthCheckScreen extends Component {
    static token: Boolean = false;
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
