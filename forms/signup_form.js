import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';
import * as yup from 'yup';
// import DatePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomDatePicker from '../styles/customDatePicker';



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
                                <Text style= {styles.form_head}> Personal Information </Text>

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
                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='Sex' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('sex')}
                                        value = {props.values.sex}
                                        onBlur = {props.handleBlur('sex')}
                                    />
                                    <TextInput 
                                        placeholder='Birthday' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('birthday')}
                                        value = {props.values.birthday}
                                        onBlur = {props.handleBlur('birthday')}
                                    />
                                </View>

                                <Text style= {styles.form_head}> Address</Text>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='House No.' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('house_no')}
                                        value = {props.values.house_no}
                                        onBlur = {props.handleBlur('house_no')}
                                    />
                                    <TextInput 
                                        placeholder='Street' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('street')}
                                        value = {props.values.street}
                                        onBlur = {props.handleBlur('street')}
                                    />
                                </View>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='Barangay' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('barangay')}
                                        value = {props.values.barangay}
                                        onBlur = {props.handleBlur('barangay')}
                                    />
                                    <TextInput 
                                        placeholder='Municipality' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('municipality')}
                                        value = {props.values.municipality}
                                        onBlur = {props.handleBlur('municipality')}
                                    />
                                </View>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='Province' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('province')}
                                        value = {props.values.province}
                                        onBlur = {props.handleBlur('province')}
                                    />
                                    <TextInput 
                                        placeholder='Zip Code' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('zipcode')}
                                        value = {props.values.zipcode}
                                        onBlur = {props.handleBlur('zipcode')}
                                    />
                                </View>


                                <Text style= {styles.form_head}> Account </Text>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='Email' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('email')}
                                        value = {props.values.email}
                                        onBlur = {props.handleBlur('email')}
                                    />
                                    <TextInput 
                                        placeholder='Contact No.' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('contact_no')}
                                        value = {props.values.contact_no}
                                        onBlur = {props.handleBlur('contact_no')}
                                    />
                                </View>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='Password' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('password')}
                                        value = {props.values.password}
                                        onBlur = {props.handleBlur('password')}
                                    />
                                    <TextInput 
                                        placeholder='Confirm Password' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('zipcode')}
                                        value = {props.values.zipcode}
                                        onBlur = {props.handleBlur('zipcode')}
                                    />
                                </View>

                                <Text style= {styles.form_head}> Security </Text>
                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='What is your mothers maiden name?' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('security_ans')}
                                        value = {props.values.security_ans}
                                        onBlur = {props.handleBlur('security_ans')}
                                    />
                                    {/* TODO : Add a File Upload for VALID ID's */}
                                </View>

                                <View style = {styles.btnContainer}>
                                    <CustomButton title={'SignUp'} onPress={props.handleSubmit} styleButton={styles.signButton} styleText={styles.signText}/>
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
        fontFamily : 'Inter-Regular',
        borderRadius: 10,
        marginVertical: 10,
    },
    form_head : {
        fontFamily : 'Inter-Bold',
        fontSize : 20,
        textTransform: 'uppercase',
        color : '#05445E'

    },
    signButton : {
        backgroundColor : '#189AB4',
        paddingVertical : 10,
    },
    signText :{
        color : '#fff'
    },
    btnContainer : {
        marginVertical : 20,
        paddingHorizontal : 40
    }
})

export default SignUpForm;