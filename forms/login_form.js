import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';
import * as yup from 'yup';

// VALIDATION SCHEMA FROM YUP
const loginValidationSchema = yup.object().shape({
    email : yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

export default function LoginForm () {


    return(
        <View>
            {/* FORMIK FORM */}
            <Formik 
                validationSchema={loginValidationSchema}
                initialValues={{email : '', password : ''}}

                // HANDLES THE SUBMIT BUTTON ON LOGIN
                onSubmit = { (values,actions) => {
                    console.log(values)
                    actions.resetForm()
                }}
            >
            {(props)=>(
                <View>
                    <TextInput 
                    placeholder='Email' placeholderTextColor={'#189AB4'} 
                    style = {[styles.formInput, globalStyles.dropShadow]}
                    onChangeText= {props.handleChange('email')}
                    value = {props.values.email}
                    onBlur = {props.handleBlur('email')}
                    keyboardType="email-address"
                    />
                    {props.errors.email && props.touched.email &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{props.errors.email}</Text>
                    }
                    <TextInput placeholder='Password' placeholderTextColor={'#189AB4'}
                    secureTextEntry={true}
                    style = {[styles.formInput, globalStyles.dropShadow]}
                    onChangeText= {props.handleChange('password')}
                    value = {props.values.password}
                    onBlur = {props.handleBlur('password')}
                    />

                    {props.errors.password && props.touched.password &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{ props.errors.password}</Text>
                    }
                    <CustomButton title={'LOGIN'} onPress={props.handleSubmit} styleButton={styles.loginButton} styleText={styles.textButton} 
                    />
                </View>
            )
            }    
            </Formik>
        </View>
    );
}


const styles = StyleSheet.create({
    formInput : {
        backgroundColor :'#F1F1F1',
        paddingVertical: 5,
        paddingHorizontal : 10,
        fontFamily : 'Inter-Bold',
        borderRadius: 10,
        marginVertical: 10,
    },
    loginButton : {
        backgroundColor : '#189AB4',
        paddingVertical: 10,
        marginVertical: 10,
    },
    textButton:{
        color : '#fff',
        fontFamily : 'Inter-Bold',
    }
})