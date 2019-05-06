//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export interface iconDetails {
    name?: string;
    size?: number;
    color?: string;
}

export interface Props {
    style?: any;
    textStyle?: any;
    onPress?: () => void | string;
    disabled?: boolean;
    disabledColor?: string;
    iconDetails?: iconDetails;
}

// create a component

const ButtonWithoutIcon = (props: any) => {
    const { style, textStyle, children, ...propss } = props

    return (
        <TouchableOpacity
            style={{
                // backgroundColor: '#2b78f9',
                backgroundColor: props.disabled ? 'gray' : '#4156b5',
                borderRadius: 5,

                ...style
            }}
            {...propss}
        >
            <Text style={{
                color: '#efeef8',
                paddingVertical: 13,
                paddingHorizontal: 40,
                fontSize: 15,
                justifyContent: 'center',
                alignSelf: 'center',
                ...textStyle
            }}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const ButtonWithIcon = (props: any) => {
    const { style, textStyle, children, iconDetails, ...propss } = props
    const paddingHorizontal = textStyle && textStyle.paddingHorizontal ? textStyle.paddingHorizontal : 20
    const { name, color, size } = iconDetails;
    return (
        <TouchableOpacity
            style={{
                // backgroundColor: '#2b78f9',
                backgroundColor: props.disabled ? 'gray' : '#4156b5',
                borderRadius: 5,
                ...style
            }}
            {...propss}
        >
            <View style={{ flexDirection: 'row', paddingHorizontal: paddingHorizontal }}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', paddingRight: 10, }}>
                    <Icon name={name ? name : 'home'} size={size ? size : 22} color={color ? color : '#efeef8'} />
                </View>
                <View >
                    <Text style={{
                        color: '#efeef8',
                        paddingVertical: 13,
                        fontSize: 15,
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        ...textStyle,
                        paddingHorizontal: 0
                    }}>
                        {children}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Button = (props: any) => {
    return (
        <View style={{ alignItems: 'center' }}>
            {props.iconDetails ? ButtonWithIcon(props) : ButtonWithoutIcon(props)}
        </View>
    );

}



//make this component available to the app
export default Button;