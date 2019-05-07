//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import color from '../../resources/colors'
import Button from '../../components/Button'
import styles from './style'
import { ListItem, Card } from "react-native-elements";
import Search from 'react-native-search-box';
import axios from 'axios'
// import { State } from 'react-native-gesture-handler';

type Item = {

}

export interface Props {
    item: Item
}

export interface State {

}
// create a component
class ProductFOrFlatListSubSCreen extends React.Component<Props, State>  {

    constructor() {
        super();
        this.state = {
            item: null,
            isCarted: false
        }
    }

    componentWillMount() {
        this.setState({
            item: this.props.item
        })
    }

    addToCart = (itemName) => {
        console.warn(`${itemName} is added`)

        this.setState({
            isCarted: !this.state.isCarted
        })
    }

    render() {
        const { navigate } = this.props
        const { item, isCarted } = this.state

        return (
            <View style={{
                flex: 1, backgroundColor: color.white,
                shadowColor: 'red',
                margin: 5,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <TouchableWithoutFeedback onPress={() => navigate('ProductDetailScreen',{item:item})}>
                    <View>
                        <Image
                            style={{ width: '100%', height: 200 }}
                            source={{ uri: item.image.src }}
                            resizeMethod='auto'
                            resizeMode='contain'
                        />

                        <View>
                            <Text style={{ color: color.background, alignSelf: 'center', fontWeight: 'bold' }}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                <Text style={{ color: color.background }} >Price: </Text>
                                <Text style={{ color: color.background }}>{item.variants[0].price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ marginVertical: 5 }}>
                    <Button
                        onPress={() => this.addToCart(item.title)}
                        iconDetails={{ name: 'shoppingcart', color: color.foreground, size: 24 }}
                        style={{ backgroundColor: color.background }}
                        textStyle={{ color: color.foreground, paddingVertical: 5, paddingHorizontal: 8 }}
                    >
                        {!isCarted ? 'Add To Cart' : 'Added'}

                    </Button>
                </View>

            </View>
        );
    }
}

//make this component available to the app
export default ProductFOrFlatListSubSCreen;
