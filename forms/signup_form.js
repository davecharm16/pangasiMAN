import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';
import * as yup from 'yup';



const SignUpForm =()=>{
    return (
        <View>
            <View style = {styles.header}>
                {/* HEADER */}
                <Text style = {styles.h_text}>SIGN UP</Text>
                {/* Change to Logo */}
                <Text style = {styles.h_text}> PangasiMAN</Text>
            </View>
            <View style = {styles.form}>
                {/* Main Form */}
                <Formik
                    initialValues={{
                        first_name : '', last_name : '', birthday : '',
                        sex : '', house_no : '', street : '', barangay: '',
                        municipality : '', province :'', zipcode :'',
                        email:'', contact_no : '', password: '', confirm_password: '',
                        security_ans: ''
                    }}

                    // HANDLES THE SUBMIT BUTTON ON LOGIN
                    onSubmit = { (values,actions) => {
                        console.log(values)
                        actions.resetForm()
                    }}
                >

                    {
                        (props) => (
                            <View>
                                <Text> Personal Information </Text>
                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                    placeholder='First Name' placeholderTextColor={'#189AB4'} 
                                    style = {[styles.formInput, globalStyles.dropShadow]}
                                    onChangeText= {props.handleChange('first_name')}
                                    value = {props.values.first_name}
                                    onBlur = {props.handleBlur('first_name')}
                                    />
                                    <TextInput 
                                    placeholder='Last Name' placeholderTextColor={'#189AB4'} 
                                    style = {[styles.formInput, globalStyles.dropShadow]}
                                    onChangeText= {props.handleChange('last_name')}
                                    value = {props.values.last_name}
                                    onBlur = {props.handleBlur('last_name')}
                                    />
                                </View>
                            </View>
                        )
                    }

                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    h_text : {
        color : '#F1f1f1',
        fontFamily : 'Inter-Bold',
        fontSize : 20,
    },
    form : {
        backgroundColor : '#f1f1f1',
        padding : 10,
    },
    inputContainer : {
        flexDirection : 'row', 
        justifyContent : 'space-between',
    },
    formInput :{
        flex : 1,
        margin: 10,
        backgroundColor :'#F1F1F1',
        paddingVertical: 5,
        paddingHorizontal : 10,
        fontFamily : 'Inter-Bold',
        borderRadius: 10,
        marginVertical: 10,
    }
})

export default SignUpForm;