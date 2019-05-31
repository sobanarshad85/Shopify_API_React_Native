//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, ColorPropType, TouchableOpacity } from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/AntDesign'
import color from '../../resources/colors';
import axios from 'axios'
import Button from '../../components/Button'
import CartItem from './cartSingleItem'
import Modal from '../../components/Modal'

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
    openModal: boolean;
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
            openModal: false
        };
    }

    async componentDidMount() {
        // this.makeRemoteRequest();

const url='https://76d7bec1f9e27a5381d8b08e20a50d0a:d00ed612010adda003a365e62e8b87c6@testkwanso.myshopify.com/admin/api/2019-04/products.json'
        const data = await axios({
            method: 'get',
            url,
            auth: {
                username: '76d7bec1f9e27a5381d8b08e20a50d0a',
                password: 'd00ed612010adda003a365e62e8b87c6'
            }
        })

        this.setState({
            data: data.data,
            loading: false,
            firstLoad: false,
        }, () => console.log(this.state.data)
        )

    }

    outOfCart = (id: number) => {
        const newData = this.state.data.products.filter((product: any) => product.id !== id)
        const stateData = this.state.data
        stateData.products = newData
        this.setState({
            data: stateData
        })

    }

    totalPrice = () => {
        const array = this.state.data.products.map((pro:any) => {
            return (
                parseInt(pro.variants[0].price)
            )
        })
        const totalAmount = array.reduce((acc:number, currentValue:number = 0) => acc + currentValue)

        return `Total Price: ${totalAmount}`
    }

    hideModal = () => {
        this.setState({
            openModal: false,
        })
    }

    render() {
        const { products } = this.state.data
        return (


            this.state.firstLoad ? <ActivityIndicator size="large" color={color.background} /> :
                <ScrollView style={{ backgroundColor: color.foreground, }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <Text style={{ backgroundColor: color.background, borderRadius: 5, color: color.foreground, fontSize: 15, paddingHorizontal: 10, paddingVertical: 13, fontWeight:'bold'}}>{this.totalPrice()}</Text>
                        </View> */}
                        <View style={{ flex: 1, marginRight: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Button style={{ backgroundColor: color.background }}
                                textStyle={{ color: color.foreground }}
                                onPress={() => this.setState({ openModal: true })}
                                iconDetails={{ color: color.foreground, name: 'shoppingcart' }}>
                                Checkout
                                </Button>
                        </View>
                        <Modal
                            visible={this.state.openModal}
                            dismiss={() => this.hideModal()}
                            animationType='fade-in'
                        >
                            <View style={{ justifyContent: 'flex-start', backgroundColor: 'white', width: '80%', borderRadius: 20 }}>

                                <View style={{ backgroundColor: color.foreground }}>
                                    <View style={{ backgroundColor: color.background, }}>
                                        <Text style={{ color: color.foreground, fontSize: 18, fontWeight: 'bold', alignSelf: 'center', paddingVertical: 5 }}>Checkout Cart</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ color: color.gray, fontSize: 16 }}>Total Price: 5698</Text>
                                    </View>
                                    <View style={{ marginVertical: 5 }}>
                                        <Button style={{ backgroundColor: color.background }}
                                            onPress={this.hideModal}
                                            textStyle={{ color: color.foreground, paddingVertical: 6, paddingHorizontal: 20 }}>Done</Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{ marginVertical: 5, }}>
                        {
                            products.map((item: any, index: number) => {
                                return (
                                    <CartItem item={item} outOfCart={this.outOfCart} key={index} />
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
