//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'

// create a component
class ForgotPasswordScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ForgotPasswordScreen</Text>
            </View>
        );
    }
}

//make this component available to the app
export default ForgotPasswordScreen;
