import { createStackNavigator, createAppContainer, DrawerItems, SafeAreaView, createSwitchNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import React, { Component } from 'react';
import AuthCheck from '../AuthCheckScreen/view'
import LoginScreen from '../LoginScreen/view'
import CategoriesScreen from '../CategoriesScreen/view'
import ForgotPasswordScreen from '../ForgotPasswordScreen/view'
import RegisterScreen from '../RegisterScreen/view'
import ProductListingScreen from '../ProductListingScreen/view'
import ProductDetailScreen from '../ProductDetailScreen/view';
import Entypo from 'react-native-vector-icons/Entypo';
import color from '../../resources/colors'


const ProductScreens = createStackNavigator({
    ProductListingScreen: { screen: ProductListingScreen },
    ProductDetailScreen: { screen: ProductDetailScreen }
})

const iconSize = 24;

const AppStack = createBottomTabNavigator({
    CategoriesScreen: {
        screen: CategoriesScreen,
        navigationOptions: {
            tabBarLabel: 'Categories',
            tabBarIcon: ({ tintColor }) => (
                <Entypo
                    reverse
                    name='home'
                    type='font-awesome'
                    color={tintColor}
                    size={iconSize}
                />
            )
        }
    },
    ProductScreens: {
        screen: ProductScreens,
        navigationOptions: {
            tabBarLabel: 'Products',
            tabBarIcon: ({ tintColor }) => (
                <Entypo
                    reverse
                    name='archive'
                    type='font-awesome'
                    color={tintColor}
                    size={iconSize}
                />
            )
        }
    }
}, {
        initialRouteName: 'ProductScreens',
        tabBarOptions: {
            showLabel: true,
            showIcon: true,
            style: {
                backgroundColor: color.foreground,
            },
            activeTintColor: color.background,
        }
    })

const LoginStack = createStackNavigator({
    LoginScreen: { screen: LoginScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    RegisterScreen: { screen: RegisterScreen }
}, {
        initialRouteName: 'LoginScreen'
    })

const MainNavigator = createSwitchNavigator({
    AuthCheck: { screen: AuthCheck },
    LoginStack: { screen: LoginStack },
    AppStack: { screen: AppStack },
},
    {
        initialRouteName: 'AuthCheck',
    });

const App = createAppContainer(MainNavigator);


export default App;