//import liraries
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Button from '../../components/Button'


export interface Props {

}

export interface State {
    userName: string,
    email: string;
    password: string;
    contactNumber: number;
}

// create a component
class RegisterScreen extends React.Component<Props, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Register Your Self',
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
            <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor: color.foreground, flexDirection: 'column' }}>



                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <Formik
                        initialValues={{ userName: '', email: '', password: '', contactNumber: '' }}
                        onSubmit={(values, actions) => {
                            this.setState({
                                userName: values.userName,
                                email: values.email,
                                password: values.password,
                                contactNumber: values.contactNumber
                            })
                            setTimeout(() => {

                            }, 1000);

                            alert(JSON.stringify(values));

                            setTimeout(() => {
                                actions.setSubmitting(false)

                            }, 1000);

                        }}
                        validationSchema={yup.object().shape({
                            userName: yup
                                .string()
                                .required(),
                            email: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .min(6)
                                .required(),
                            contactNumber: yup
                                .number()
                                .required(),
                        })}

                    >
                        {({ values, handleChange, errors, isSubmitting, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <Fragment>
                                <Item floatingLabel style={{ marginTop: 5 }}>
                                    <Label style={{ color: color.background }}>User Name</Label>
                                    <Input
                                        style={{ color: color.background }}
                                        value={values.userName}
                                        onChangeText={handleChange('userName')}
                                        onBlur={() => setFieldTouched('userName')}
                                    />
                                </Item>
                                {touched.userName && errors.userName &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.userName}</Text>
                                }

                                <Item floatingLabel style={{ marginTop: 5 }}>
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


                                <Item floatingLabel style={{ marginTop: 5 }}>
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
                                <Item floatingLabel style={{ marginTop: 5 }}>
                                    <Label style={{ color: color.background }}>Contact Number</Label>
                                    <Input
                                        style={{ color: color.background }}
                                        value={values.contactNumber}
                                        onChangeText={handleChange('contactNumber')}
                                        onBlur={() => setFieldTouched('contactNumber')}
                                        keyboardType='phone-pad'
                                    />
                                </Item>
                                {touched.contactNumber && errors.contactNumber &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.contactNumber}</Text>
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
                                            Register
                                    </Button>
                                }
                            </Fragment>
                        )}
                    </Formik>



                </View>
                {/* <View style={{marginVertical:20}}>
            <Button onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>Forgot Password</Button>
            </View>
            <Button onPress={() => this.props.navigation.navigate('RegisterScreen')} >Register</Button>
             */}



            </KeyboardAvoidingView>
        );
    }
}

//make this component available to the app
export default RegisterScreen;
