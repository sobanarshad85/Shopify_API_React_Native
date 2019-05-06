//import liraries
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{}}>
                <View>

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
                                {/* <TextInput
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                placeholder="E-mail"
                            /> */}
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                    />
                                </Item>
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }
                                {/* <TextInput
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="Password"
                                    onBlur={() => setFieldTouched('password')}
                                    secureTextEntry={true}
                                /> */}
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input
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
                                        <ActivityIndicator />
                                        :
                                        <Button
                                            disabled={!isValid}
                                            onPress={handleSubmit}
                                        // style={{backgroundColor:'red'}}
                                        >
                                        
                                            Submit
                                        </Button>
                                }
                            </Fragment>
                        )}
                    </Formik>
                </View>
                <View style={{marginVertical:20}}>
                <Button onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>Forgot Password</Button>
                </View>
                <Button onPress={() => this.props.navigation.navigate('RegisterScreen')} >Register</Button>
                
            </View>
        );
    }
}

//make this component available to the app
export default LoginScreen;
