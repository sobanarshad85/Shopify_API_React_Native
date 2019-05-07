//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import color from '../../resources/colors'
import Button from '../../components/Button'
import styles from './style'
import { ListItem, Card } from "react-native-elements";
import Search from 'react-native-search-box';
import axios from 'axios'
import ProductForFlatListSubScreen from './ProductForFlatListSubScreen'
export interface Props {

}

export interface State {
    loading: boolean;
    data: any;
    page: number;
    seed: number;
    error: any;
    refreshing: boolean;
}

// create a component
export default class ProductListingScreen extends React.Component<Props, State>  {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    async componentDidMount() {
        // this.makeRemoteRequest();

        let url = 'https://244c0529492d9a4f0608ee6819bea9cf:cddc810af568275df91c62bde72ccdce@kwanso-soban.myshopify.com/admin/api/2019-04/products.json'

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
        // return  <Search
        // ref="search_box"
        /**
        * There many props that can customizable
        * Please scroll down to Props section
        */
        //   />
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
            <View style={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: color.foreground }}>
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
                <FlatList
                    data={this.state.data.products}
                    renderItem={({ item }) => (



                        
                            <ProductForFlatListSubScreen item={item} navigate={this.props.navigation.navigate} />
                        



                    )}
                    keyExtractor={item => item.id}
                    // ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    // onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                    numColumns={2}
                />
            </View>
        );
    }
}

//make this component available to the app
// export default ProductListingScreen;
