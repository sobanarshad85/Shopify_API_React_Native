//import liraries
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import AuthCheckScreen from '../AuthCheckScreen/view'
import * as controller from '../AuthCheckScreen/controller'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Button from '../../components/Button'

export interface Props {

}

export interface State {
    email: string;
    password: string;
}
// create a component
class LoginScreen extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login',
            headerTitleStyle: {
                fontSize: 17
            },
            headerTintColor: color.foreground,
            headerStyle: {
                backgroundColor: color.background,
            },

        }
    };

    render() {
        return (

            <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor:color.foreground,flexDirection: 'column' }}>

                <View style={{ flex: 1 }}>
                </View>

                <View style={{ flex: 1 }}>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, actions) => {
                            this.setState({
                                email: values.email,
                                password: values.password
                            })
                            setTimeout(() => {
                                AuthCheckScreen.token = true
                                controller.authChecking(AuthCheckScreen.token, this.props.navigation)
                            }, 1000);
                            // alert(JSON.stringify(values));
                            setTimeout(() => {
                                actions.setSubmitting(false)
                            }, 1000);

                        }}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .min(6)
                                .required(),
                        })}

                    >
                        {({ values, handleChange, errors, isSubmitting, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <Fragment>
                                <Item floatingLabel >
                                    <Label style={{ color: color.background }}>Email</Label>
                                    <Input
                                        style={{ color: color.background }}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        keyboardType='email-address'
                                    />
                                </Item>
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }
                                <Item floatingLabel >
                                    <Label style={{ color: color.background }}>Password</Label>
                                    <Input
                                        style={{ color: color.background }}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        //  placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        secureTextEntry={true}
                                    />
                                </Item>
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }
                                {
                                    isSubmitting ?
                                        <View style={{ marginTop: 10 }}>
                                            <ActivityIndicator color={color.background} size='large' />
                                        </View>
                                        :
                                        <Button
                                            disabled={!isValid}
                                            onPress={handleSubmit}
                                            style={{ backgroundColor: color.background, marginTop: 10, }}
                                            textStyle={{ color: color.foreground, paddingHorizontal: 27, paddingVertical: 12 }}
                                        >
                                            Login
                                        </Button>
                                }
                            </Fragment>
                        )}
                    </Formik>

                    <View style={{ marginTop: 10, alignSelf: 'center', flexDirection: 'row' }}>
                        <Text style={{ color: color.background }}>Forgot </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                            <Text style={{ fontWeight: 'bold', color: color.background,fontSize:16 }}>Password?</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* <View style={{marginVertical:20}}>
                <Button onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>Forgot Password</Button>
                </View>
                <Button onPress={() => this.props.navigation.navigate('RegisterScreen')} >Register</Button>
                 */}


                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                    <View style={{ backgroundColor: color.background, height: 1, width: '100%' }}></View>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', marginVertical: 10 }}>

                        <Text style={{ color: color.background }}>Don't have an accout? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                            <Text style={{ fontWeight: 'bold', color: color.background }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: color.background, height: 1, width: '100%', marginBottom: 10 }}></View>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

//make this component available to the app
export default LoginScreen;
