//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import * as controller from './controller'
import strings from '../../resources/constants'


// create a component
class AuthCheckScreen extends Component {
    static token:Boolean = false;
    componentDidMount() {
        setTimeout(() => {
            controller.authChecking(this.token, this.props.navigation)
        }, 1500)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{strings.appName}</Text>
                <Text>This is splash Screen</Text>
            </View>
        );
    }
}

//make this component available to the app
export default AuthCheckScreen;
