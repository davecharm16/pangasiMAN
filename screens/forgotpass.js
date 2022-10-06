import React, { useEffect } from 'react';
import { StyleSheet, Text, Touchable, TouchableWithoutFeedback, View, Keyboard, Image, ScrollView, Button, ToastAndroid, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';
import axios from 'axios';
import { api, host, directory } from '../api_link';
import * as yup from 'yup';

const forgotPassSchema = yup.object().shape({
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('New Password is required'),
    email : yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
    security_question : yup
    .string()
    .required('Security Question is Required')
})


const ForgotPass = ({ navigation }) => {
    const forgotPasswordURL = host+directory+api.forgotPasswordURL;
    const sec_color = "#05445E";

    const resetPassword = async(values)=>{

        let body = {
            "action" : "forgot_password",
            "password" : values.password,
            "email" : values.email,
            "security_answer" : values.security_question
        }

        await axios.post(forgotPasswordURL, body)
        .then((response)=>{
            if(response.data.message == "success"){
                ToastAndroid.show("Password Reset Success!", ToastAndroid.LONG);
            }
            else{
                Alert.alert("Failed", "Incorrect Email or Security Answer");
            }
        })
        .catch((e)=>{
            Alert.alert("Network Error", "Try again Later, Check Your Internet Connection");
        })
    }

    return (
        <TouchableWithoutFeedback onPress={
            //Disable Keyboard when Click outside Form
            () => (Keyboard.dismiss())
        }>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.lockContainer}>
                        <MaterialCommunityIcons name="lock-question" size={100} color="#05445E" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headText}>
                            Forgot Your Password?
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.leadText}>
                            Provide the account's email and answer the necessary question below.
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <Formik
                            validationSchema={forgotPassSchema}
                            initialValues={
                                {
                                    email: '', security_question: '', password: ''
                                }
                            }
                            onSubmit={
                                (values, action) => {
                                    resetPassword(values);
                                    action.resetForm();
                                }
                            }
                        >
                            {
                                (props) => (
                                    <View>
                                        <TextInput mode='outlined'

                                            theme={
                                                {
                                                    colors: {
                                                        text: sec_color,
                                                        background: '#fff',
                                                        primary: sec_color,
                                                        placeholder: sec_color,
                                                    },
                                                    roundness: 2,
                                                }
                                            }
                                            label="Email"
                                            outlineColor={sec_color} activeOutlineColor={sec_color}
                                            selectionColor={sec_color} placeholderTextColor={sec_color}
                                            placeholder="Your Email Here"
                                            style={styles.txtInp}
                                            value={props.values.email}
                                            onChangeText={props.handleChange('email')}
                                            onBlur={props.handleBlur('email')}
                                            keyboardType='email-address'
                                        />
                                        {
                                            props.errors.email && props.touched.email &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>
                                                {props.errors.email}
                                            </Text>
                                        }
                                        <TextInput mode='outlined'

                                            theme={
                                                {
                                                    colors: {
                                                        text: sec_color,
                                                        background: '#fff',
                                                        primary: sec_color,
                                                        placeholder: sec_color,
                                                    },
                                                    roundness: 2,
                                                }
                                            }
                                            label="Security Question"
                                            outlineColor={sec_color} activeOutlineColor={sec_color}
                                            selectionColor={sec_color} placeholderTextColor={sec_color}
                                            placeholder="What is your mother's maiden name?"
                                            style={styles.txtInp}
                                            value={props.values.security_question}
                                            onChangeText={props.handleChange('security_question')}
                                            onBlur={props.handleBlur('security_question')}
                                        />
                                        {
                                            props.errors.security_question && props.touched.security_question &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>
                                                {props.errors.security_question}
                                            </Text>
                                        }
                                        <TextInput mode='outlined'
                                            theme={
                                                {
                                                    colors: {
                                                        text: sec_color,
                                                        background: '#fff',
                                                        primary: sec_color,
                                                        placeholder: sec_color,
                                                    },
                                                    roundness: 2,
                                                }
                                            }
                                            label="New Password"
                                            outlineColor={sec_color} activeOutlineColor={sec_color}
                                            selectionColor={sec_color} placeholderTextColor={sec_color}
                                            placeholder="Enter your Password Here!"
                                            style={styles.txtInp}
                                            value={props.values.password}
                                            onChangeText={props.handleChange('password')}
                                            onBlur={props.handleBlur('password')}
                                            secureTextEntry={true}
                                        />
                                        {
                                            props.errors.password && props.touched.password &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>
                                                {props.errors.password}
                                            </Text>
                                        }
                                        <CustomButton styleButton={styles.btnStyle} title='RESET YOUR PASSWORD' styleText={styles.textStyle} onPress={props.handleSubmit} />
                                    </View>
                                )
                            }
                        </Formik>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    lockContainer: {
        marginTop: 50,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    textContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    headText: {
        fontFamily: 'Inter-Bold',
        textTransform: 'uppercase',
        color: '#05445E',
        fontSize: 25,
        textAlign: 'center',
        maxWidth: 200,
    },
    leadText: {
        maxWidth: 300,
        fontFamily: 'Inter-Bold',
        color: '#05445E',
        textAlign: 'center',
        fontSize: 13,
    },
    txtInp: {
        height: 50,
        width: 300,
        fontFamily: 'Inter-Bold',
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 13,
    },
    form: {
        alignItems: 'center',
        marginTop: 20,
    },

    btnStyle: {
        backgroundColor: '#05445E',
        borderRadius: 0,
        paddingVertical: 15,
        elevation: 3,
        marginTop: 30,
    },
    textStyle: {
        color: '#fff',
        fontFamily: 'Inter-Bold',
        letterSpacing: 1,
    }

});


export default ForgotPass;

