//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import color from '../../resources/colors'
import styles from './style'

// create a component
class ProductListingScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>ProductListingScreen</Text>
                <Button title='Product Detail' onPress={() => this.props.navigation.navigate('ProductDetailScreen')} />
            </View>
        );
    }
}

//make this component available to the app
export default ProductListingScreen;
