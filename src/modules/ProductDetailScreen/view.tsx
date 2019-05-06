//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'

// create a component
class ProductDetailScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ProductDetailScreen</Text>
            </View>
        );
    }
}

//make this component available to the app
export default ProductDetailScreen;
