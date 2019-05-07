//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import color from '../../resources/colors'
import styles from './style'

// create a component
class ProductDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.item.title}`,
            headerTitleStyle: {
                fontSize: 17
            },
            headerTintColor: color.foreground,
            headerStyle: {
                backgroundColor: color.background,
            },

        }
    };


    render() {
        const { item } = this.props.navigation.state.params
        return (
            <ScrollView>
                <Image
                    style={{ width: '100%', height: 400 }}
                    source={{ uri: item.image.src }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />
                <View style={{height:1,width:'100%',backgroundColor:color.background}}></View>

            </ScrollView>
        );
    }
}

//make this component available to the app
export default ProductDetailScreen;
