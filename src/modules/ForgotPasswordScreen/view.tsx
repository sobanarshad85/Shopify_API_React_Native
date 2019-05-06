//import liraries
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import color from '../../resources/colors'
import styles from './style'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Button from '../../components/Button'
// create a component
class ForgotPasswordScreen extends React.Component<Props, State>  {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Forgot Password',
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
                    initialValues={{ email: '', }}
                    onSubmit={(values, actions) => {
                        this.setState({
                            email: values.email,
                        })
                        setTimeout(() => {

                        }, 1000);

                        alert(JSON.stringify(values));

                        setTimeout(() => {
                            actions.setSubmitting(false)

                        }, 1000);

                    }}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .email()
                            .required(),
                    })}

                >
                    {({ values, handleChange, errors, isSubmitting, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <Fragment>
                          
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: color.background }}>Enter Your Email</Label>
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
                                        Submit
                                </Button>
                            }
                        </Fragment>
                    )}
                </Formik>



            </View>

        </KeyboardAvoidingView>
        );
    }
}

//make this component available to the app
export default ForgotPasswordScreen;
