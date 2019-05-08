//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import Carousel from 'react-native-looped-carousel';
import Button from '../../components/Button'

const { width, height } = Dimensions.get('window');

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

    constructor() {
        super();
        this.state = {
            isCarted: false,
            size: {
                width, height: 400,
            },
        }
    }

    componentWillMount() {
        this.setState({
            isCarted: this.props.navigation.state.params.isCarted
        })
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        const { item, addToCart } = this.props.navigation.state.params
        return (
            <ScrollView style={{ backgroundColor: color.foreground }}>
                <View style={{ flex: 1, margin: 10, backgroundColor: color.white }} onLayout={this._onLayoutDidChange} >
                    <Carousel
                        delay={1500}
                        style={this.state.size}
                        autoplay
                        pageInfo
                        onAnimateNextPage={(p) => console.log(p)}
                    >

                        {
                            item.images.map((img, key) => {
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
                {/* <View style={{ height: 10, width: '100%', backgroundColor: color.background }}></View> */}
                <View style={{ backgroundColor: color.white, marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.background, }}>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: color.foreground, fontSize: 20 }}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ color: color.background, fontSize: 18, flex:1}}>Price: </Text>
                            <Text style={{ color: color.background, fontSize: 20, flex:1 }}>{item.variants[0].price}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ color: color.background, fontSize: 16, flex:1 }}>Weight: </Text>
                            <Text style={{ color: color.background, fontSize: 18, flex:1 }}>{`${item.variants[0].weight} ${item.variants[0].weight_unit}`}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ color: color.background, fontSize: 16, flex:1 }}>In Stock: </Text>
                            <Text style={{ color: color.background, fontSize: 18, flex:1 }}>{`${item.variants[0].inventory_quantity}`}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Button
                            onPress={() => {
                                addToCart()
                                this.setState({ isCarted: !this.state.isCarted })
                            }
                            }
                            iconDetails={{ name: !this.state.isCarted? 'shoppingcart': 'check', color: color.foreground, size: 24 }}
                            style={{ backgroundColor: color.background }}
                            textStyle={{ color: color.foreground, paddingVertical: 10, paddingHorizontal: 16 }}
                        >
                            {!this.state.isCarted ?
                                'Add To Cart'
                                : 'Added'}

                        </Button>
                    </View>
                </View>
                {/* <View style={{ height: 10, width: '100%', backgroundColor: color.background }}></View> */}

                <View style={{ backgroundColor: color.white, marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: color.background, }}>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: color.foreground, fontSize: 20 }}>Description</Text>
                        </View>

                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: color.gray }}>This is Beauty Product {'\n'}
                            Ladies and Gents both can have this {'\n'}
                            Extensively tested by our Makers{'\n'}
                            Company made product and verified {'\n'}
                        </Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

//make this component available to the app
export default ProductDetailScreen;
