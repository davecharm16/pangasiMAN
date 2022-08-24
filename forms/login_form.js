import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';



export default function LoginForm () {

    // VALIDATION SCHEMA FROM YUP


    return(
        <View>
            {/* FORMIK FORM */}
            <Formik 
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
                    keyboardType="email-address"
                    />
                    <TextInput placeholder='Password' placeholderTextColor={'#189AB4'}
                    secureTextEntry={true}
                    style = {[styles.formInput, globalStyles.dropShadow]}
                    onChangeText= {props.handleChange('password')}
                    value = {props.values.password}
                    />
                    <CustomButton title={'LOGIN'} onPress={props.handleSubmit} styleButton={styles.loginButton} styleText={styles.textButton} />
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