/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios'
// import console = require('console');
// import console = require('console');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();

    this.state = {
      data: null,
      loading: true,
    }

  }

  async componentDidMount() {

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
    })



  }


  render() {
    const { loading } = this.state
    if (!loading)
      var { products } = this.state.data

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          {
            !loading ?
              products.map((product, index) => {
                return (
                  <View key={index} style={{ marginVertical: 20 }}>
                    <Text>{product.id}</Text>
                    <Text>{product.title}</Text>
                    <Text>{product.variants[0].price}</Text>

                  </View>
                )
              })
              :
              null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
