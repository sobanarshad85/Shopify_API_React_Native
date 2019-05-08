//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import color from '../../resources/colors'
import Button from '../../components/Button'
import styles from './style'
import { ListItem, Card } from "react-native-elements";
import Search from 'react-native-search-box';
import axios from 'axios'
import ProductForFlatListSubScreen from './ProductForFlatListSubScreen'
import Carousel from 'react-native-looped-carousel';
import { any } from 'prop-types';
const { width, height } = Dimensions.get('window');


export interface Props {
navigation:any
}

interface Size {
    width: number;
    height: number;
}

export interface State {
    loading: boolean;
    data: any;
    page: number;
    seed: number;
    error: any;
    refreshing: boolean;
    firstLoad: boolean;
    size: Size
}

// create a component
export default class ProductListingScreen extends React.Component<Props, State>  {
    static navigationOptions = {
        header: null
    }
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
            size: {
                width, height: 200,
            },
        };
    }

    _onLayoutDidChange = (e:any) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
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

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });


    };

    // handleRefresh = () => {
    //     this.setState(
    //         {
    //             page: 1,
    //             seed: this.state.seed + 1,
    //             refreshing: true
    //         },
    //         () => {
    //             this.makeRemoteRequest();
    //         }
    //     );
    // };

    // handleLoadMore = () => {
    //     this.setState(
    //         {
    //             page: this.state.page + 1
    //         },
    //         () => {
    //             this.makeRemoteRequest();
    //         }
    //     );
    // };

    renderSeparator = () => {
        if (this.state.loading) return null


        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {


        return <View style={{ backgroundColor: color.white, flex: 1 }} onLayout={this._onLayoutDidChange} >
            <Carousel
                delay={1500}
                style={this.state.size}
                autoplay
                pageInfo
                onAnimateNextPage={(p:any) => console.log(p)}
            >

                <Image
                    style={this.state.size}
                    source={{ uri: 'http://nutra-herbs.com/wp-content/uploads/2017/06/products.jpg' }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />
                <Image
                    style={this.state.size}
                    source={{ uri: 'https://www.minutemaid.com/content/dam/minutemaidus/home/minute_maid_homepage_products_mobile.jpg' }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />

                <Image
                    style={this.state.size}
                    source={{ uri: 'http://www.talentahead.com/img/Focus/CONSUMER-PRODUCTS.jpg' }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />
                <Image
                    style={this.state.size}
                    source={{ uri: 'https://www.cadbury.co.za/sites/default/files/product-type-images/2017-12/image-2017-12-11-08-56-24-545.png' }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />
                <Image
                    style={this.state.size}
                    source={{ uri: 'http://www.bluemaize.net/im/baby/baby-products-3.jpg' }}
                    resizeMethod='auto'
                    resizeMode='contain'
                />


            </Carousel>
        </View>
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: !this.state.firstLoad ? color.foreground : null }}>
                <Search
                    // onChangeText={this.searchProduct}
                    // onSearch={this.searchProduct}
                    backgroundColor='white'
                    cancelButtonTextStyle={{ color: color.background }}
                    tintColorDelete={color.background}
                    tintColorSearch={color.background}
                    placeholderTextColor={color.background}
                    // onChangeText={this.searchProduct}
                    blurOnSubmit={true}
                // onCancel={this.clearSearch}
                // onDelete={this.clearSearch}
                />

                {this.state.firstLoad ? <ActivityIndicator size="large" color={color.background} /> : <FlatList
                    data={this.state.data.products}
                    renderItem={({ item }) => (




                        <ProductForFlatListSubScreen item={item} navigate={this.props.navigation.navigate} />




                    )}
                    keyExtractor={item => item.id}
                    // ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                    numColumns={2}
                />
                }

            </View>
        );
    }
}

//make this component available to the app
// export default ProductListingScreen;
