import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, ColorPropType, TouchableOpacity } from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/AntDesign'
import color from '../../resources/colors';
import axios from 'axios'
import Button from '../../components/Button'

export interface Props {
    item: any;
    outOfCart: any;
}

export interface State {
    item: any;
    isCanceled: boolean;
}
// create a component
class CartSingleItem extends React.Component<Props, State>  {

    constructor(props: Props) {
        super(props);
        this.state = {
            item: this.props.item,
            isCanceled: false,
        }
    }

    addQuantity = () => {
        const newState = this.state.item;
        newState.variants[0].inventory_quantity = newState.variants[0].inventory_quantity + 1
        this.setState({
            item: newState
        })
    }

    minusQuantity = () => {
        const newState = this.state.item;
        newState.variants[0].inventory_quantity = newState.variants[0].inventory_quantity - 1
        this.setState({
            item: newState
        })
    }

    // componentDidMount() {
    //     this.setState({
    //         item: this.props.item
    //     })
    // }

    

    render() {

        const { item, isCanceled } = this.state
        const { outOfCart } = this.props
        return (
            !isCanceled ?
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.white, marginHorizontal: 10, marginVertical: 5 }}>
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
                                <TouchableOpacity onPress={() => {
                                    this.setState({ isCanceled: true })
                                    // outOfCart(item.id)
                                }
                                } >
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
                            <Text style={{ padding: 5, color: color.background, fontSize: 18 }}>{item.variants[0].price * item.variants[0].inventory_quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                            <TouchableOpacity onPress={this.minusQuantity}>
                                <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        size={25}
                                        color={color.foreground}
                                        name="minus"
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 5, color: color.gray, fontSize: 20 }}>{item.variants[0].inventory_quantity}</Text>
                            <TouchableOpacity onPress={this.addQuantity}>
                                <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: color.background, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        size={25}
                                        color={color.foreground}
                                        name="plus"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* <View>
                <View style={{backgroundColor:color.background,width:'100%',flex:1}}>
               
                </View>
                
            </View>
            <View>
                
            </View> */}
                    </View>
                </View>
                :
                null
        );
    }
}


//make this component available to the app
export default CartSingleItem;
