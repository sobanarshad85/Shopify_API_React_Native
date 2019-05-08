//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import Carousel from 'react-native-looped-carousel';
import Button from '../../components/Button'

const { width, height } = Dimensions.get('window');


export interface Props {
    navigation: any;
}

interface Size {
    width: number;
    height: number;
}

interface Size {
    width: number;
    height: number
}

export interface State {
    isCarted: boolean;
    firstLoad: boolean;
    size: Size
}


// create a component
class ProductDetailScreen extends React.Component<Props, State>  {

    static navigationOptions = ({ navigation }: any) => {
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

    constructor(props: any) {
        super(props);
        this.state = {
            isCarted: false,
            firstLoad: true,
            size: {
                width, height: 400,
            },
        }
    }

    componentDidMount() {
        this.setState({
            firstLoad: false
        })
    }

    componentWillMount() {
        this.setState({
            isCarted: this.props.navigation.state.params.isCarted
        })
    }

    _onLayoutDidChange = (e: any) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        const { item, addToCart } = this.props.navigation.state.params

        return (

            <ScrollView style={{ backgroundColor: color.foreground }}>

                {this.state.firstLoad ? <ActivityIndicator size="large" color={color.background} />

                    :
                    <View>
                        <View style={{ flex: 1, margin: 10, backgroundColor: color.white }} onLayout={this._onLayoutDidChange} >
                            <Carousel
                                delay={1500}
                                style={this.state.size}
                                autoplay
                                pageInfo
                                onAnimateNextPage={(p: any) => console.log(p)}
                            >

                                {
                                    item.images.map((img: any, key: number) => {
                                        return (
                                            <Image
                                                key={key}
                                                style={this.state.size}
                                                source={{ uri: img.src }}
                                                resizeMethod='auto'
                                                resizeMode='contain'
                                            />
                                        )
                                    })}

                            </Carousel>
                        </View>
                        {/* // <View style={{ height: 10, width: '100%', backgroundColor: color.background }}></View> */}
                        <View style={{ backgroundColor: color.white, marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.background, }}>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ color: color.foreground, fontSize: 20,padding:5 }}>{item.title}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 6 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: color.background, fontSize: 18, flex: 1 }}>Price: </Text>
                                    <Text style={{ color: color.background, fontSize: 20, flex: 1 }}>{item.variants[0].price}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: color.background, fontSize: 16, flex: 1 }}>Weight: </Text>
                                    <Text style={{ color: color.background, fontSize: 18, flex: 1 }}>{`${item.variants[0].weight} ${item.variants[0].weight_unit}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: color.background, fontSize: 16, flex: 1 }}>In Stock: </Text>
                                    <Text style={{ color: color.background, fontSize: 18, flex: 1 }}>{`${item.variants[0].inventory_quantity}`}</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 5 }}>
                                <Button
                                    onPress={() => {
                                        addToCart()
                                        this.setState({ isCarted: !this.state.isCarted })
                                    }
                                    }
                                    iconDetails={{ name: !this.state.isCarted ? 'shoppingcart' : 'check', color: color.foreground, size: 24 }}
                                    style={{ backgroundColor: color.background }}
                                    textStyle={{ color: color.foreground, paddingVertical: 10, paddingHorizontal: 16 }}
                                >
                                    {!this.state.isCarted ?
                                        'Add To Cart'
                                        : 'Added'}

                                </Button>
                            </View>
                        </View>
                        {/* // <View style={{ height: 10, width: '100%', backgroundColor: color.background }}></View> */}

                        <View style={{ backgroundColor: color.white, marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.background, }}>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ color: color.foreground, fontSize: 20,padding:5 }}>Description</Text>
                                </View>

                            </View>
                            <View style={{ padding: 6 }}>
                                <Text style={{ color: color.gray }}>This is Beauty Product {'\n'}
                                    Ladies and Gents both can have this {'\n'}
                                    Extensively tested by our Makers{'\n'}
                                    Company made product and verified {'\n'}
                                </Text>
                            </View>

                        </View>
                    </View>
                }
            </ScrollView>
        );
    }
}

//make this component available to the app
export default ProductDetailScreen;
