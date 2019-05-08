//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import AuthCheckScreen from '../AuthCheckScreen/view'

export interface Props{
    navigation:any;
}
// create a component
class CategoriesScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>CategoriesScreen</Text>
                <Button title='Logout' onPress={() => {
                    AuthCheckScreen.token=false
                    this.props.navigation.navigate('AuthCheck')
                }} />

            </View>
        );
    }
}

//make this component available to the app
export default CategoriesScreen;
