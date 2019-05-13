//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import color from '../../resources/colors'
import Button from '../../components/Button'
import styles from './style'
import { ListItem, Card } from "react-native-elements";
import Search from 'react-native-search-box';
import axios from 'axios'


export interface Props {
    item: any;
    navigate: any;
}

export interface State {
    item: any;
    isCarted: boolean;
}
// create a component
class ProductFOrFlatListSubSCreen extends React.Component<Props, State>  {

    constructor(props: any) {
        super(props);
        this.state = {
            item: this.props.item,
            isCarted: false
        }
    }

    // componentWillMount() {
    //     this.setState({
    //         item: this.props.item
    //     })
    // }

    addToCart = () => {
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
                <TouchableWithoutFeedback onPress={() => navigate('ProductDetailScreen', { item: item, addToCart: this.addToCart, isCarted: this.state.isCarted })}>
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
                                <Text style={styles.textColor} >Price: </Text>
                                <Text style={styles.textColor}>{item.variants[0].price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ marginVertical: 5 }}>
                    <Button
                        onPress={() => this.addToCart()}
                        iconDetails={{ name: !this.state.isCarted ? 'shoppingcart' : 'check', color: color.foreground, size: 24 }}
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
