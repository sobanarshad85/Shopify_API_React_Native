//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, ColorPropType, TouchableOpacity } from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/AntDesign'
import color from '../../resources/colors';
import axios from 'axios'
import Button from '../../components/Button'
import ProductDetailScreen from '../ProductDetailScreen/view';


export interface Props {
    navigation: any
}

export interface State {
    firstLoad: boolean;
    loading: boolean;
    data: any;
    page: number;
    seed: number;
    error: any;
    refreshing: boolean;

}
// create a component
class CartScreen extends React.Component<Props, State>  {

    constructor(props: any) {
        super(props);

        this.state = {
            firstLoad: true,
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    async componentDidMount() {
        // this.makeRemoteRequest();

        const url = 'https://244c0529492d9a4f0608ee6819bea9cf:cddc810af568275df91c62bde72ccdce@kwanso-soban.myshopify.com/admin/api/2019-04/products.json'

        const data = await axios({
            method: 'get',
            url,
            auth: {
                username: '244c0529492d9a4f0608ee6819bea9cf',
                password: 'cddc810af568275df91c62bde72ccdce'
            }
        })

        this.setState({
            data: data.data,
            loading: false,
            firstLoad: false,
        }, () => console.log(this.state.data)
        )

    }

    outOfCart = (id) => {
        const newData = this.state.data.products.filter(product => product.id !== id)
        const stateData = this.state.data
        stateData.products = newData
        this.setState({
            data: stateData
        })

    }

    totalPrice = () => {
        const array = this.state.data.products.map((pro) => {
            return (
                parseInt(pro.variants[0].price)
            )
        })
        const totalAmount = array.reduce((acc, currentValue = 0) => acc + currentValue)

        return `Total Price: ${totalAmount}`
    }


    render() {
        const { products } = this.state.data
        return (


            this.state.firstLoad ? <ActivityIndicator size="large" color={color.background} /> :
                <ScrollView style={{ backgroundColor: color.foreground, }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <Text style={{ backgroundColor: color.background, borderRadius: 5, color: color.foreground, fontSize: 15, paddingHorizontal: 10, paddingVertical: 13, }}>{this.totalPrice()}</Text>
                        </View>
                        <View style={{ flex: 1, marginRight: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Button style={{ backgroundColor: color.background }}
                                textStyle={{ color: color.foreground }}
                                onPress={()=>console.warn('Cart Checkout')}
                                iconDetails={{ color: color.foreground,name:'shoppingcart' }}>
                                Checkout
                                </Button>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5, }}>
                        {
                            products.map((item, index) => {
                                return (
                                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.white, marginHorizontal: 10, marginVertical: 5 }} key={index}>
                                        <View>
                                            <View>
                                                <Image
                                                    style={{ width: 120, height: 120 }}
                                                    source={{ uri: item.image.src }}
                                                    resizeMethod='auto'
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: '100%', width: 1, backgroundColor: color.foreground, opacity: 0.8 }}></View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ backgroundColor: color.background, width: '100%', flexDirection: 'row' }}>
                                                <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                                                    <Text style={{ padding: 5, color: color.foreground, fontSize: 18 }}>{item.title}</Text>
                                                </View>
                                                <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    <TouchableOpacity onPress={() => this.outOfCart(item.id)} >
                                                        <Icon
                                                            name="close"
                                                            color={color.foreground}
                                                            size={25}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ padding: 5, color: color.background, fontSize: 18 }}>Price:</Text>
                                                <Text style={{ padding: 5, color: color.background, fontSize: 18 }}>{item.variants[0].price}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                                                <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon
                                                        size={25}
                                                        color={color.foreground}
                                                        name="minus"
                                                    />
                                                </View>
                                                <Text style={{ marginHorizontal: 5, color: color.gray, fontSize: 20 }}>15</Text>
                                                <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Icon
                                                        size={25}
                                                        color={color.foreground}
                                                        name="plus"
                                                    />
                                                </View>
                                            </View>

                                            {/* <View>
                                            <View style={{backgroundColor:color.background,width:'100%',flex:1}}>
                                           
                                            </View>
                                            
                                        </View>
                                        <View>
                                            
                                        </View> */}
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>


                </ScrollView>

        );
    }
}

//make this component available to the app
export default CartScreen;
