import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { Formik } from 'formik';
import CustomButton from '../styles/customButton';
import * as yup from 'yup';
import moment from 'moment';
// import DatePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomDatePicker from '../styles/customDatePicker';


const signInValidationSchema = yup.object().shape({
    first_name : yup 
    .string()
    .required('First Name is Required')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .min(2, ({ min }) => `First Name must be at least ${min} characters`),
    last_name : yup 
    .string()
    .required('Last Name is Required')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .min(2, ({ min }) => `Last Name must be at least ${min} characters`),
    sex : yup 
    .string()
    .required('Sex is required')
    .test('is-male-female', 'Type either Male or Female', (val)=>{
        return val == "Male" || val =="Female"
    }),
    birthday: yup
    .string()
    .required('Birthday is required')
    .test('is-valid-date','Use mm/dd/yy format',(val)=>{
        return moment(val, "MM/DD/YY", true).isValid()
    }),
    barangay: yup
    .string()
    .required('Barangay is Required'),
    municipality: yup
    .string()
    .required('Municipality is Required'),
    province: yup
    .string()
    .required('Province is Required'),
    zipcode: yup
    .string()
    .required('Zip Code is Required'),
    contact_no: yup
    .string()
    .required('Contact Code is Required')
    .matches(/^0(9)\d{9}$/,'Please use a valid number'),
    email : yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
    confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
    security_ans : yup
    .string()
    .required('Security Question is Required')
})


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
                    validationSchema={signInValidationSchema}
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
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='First Name' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('first_name')}
                                            value = {props.values.first_name}
                                            onBlur = {props.handleBlur('first_name')}
                                        />
                                        {
                                            props.errors.first_name && props.touched.first_name &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.first_name}</Text>
            
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Last Name' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('last_name')}
                                            value = {props.values.last_name}
                                            onBlur = {props.handleBlur('last_name')}
                                        />
                                        {
                                            props.errors.last_name && props.touched.last_name &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.last_name}</Text>
                                        }
                                    </View>
                                </View>
                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Sex(Male or Female)' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('sex')}
                                            value = {props.values.sex}
                                            onBlur = {props.handleBlur('sex')}
                                        />
                                        {
                                            props.errors.sex && props.touched.sex &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.sex}</Text>
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Birthday mm/dd/yy' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('birthday')}
                                            value = {props.values.birthday}
                                            onBlur = {props.handleBlur('birthday')}
                                        />
                                        {
                                            props.errors.birthday && props.touched.birthday &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.birthday}</Text>
                                        }
                                    </View>
                                </View>

                                <Text style= {styles.form_head}> Address</Text>

                                <View style = {styles.inputContainer}>
                                    <TextInput 
                                        placeholder='House No.' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('house_no')}
                                        keyboardType ='number-pad'
                                        value = {props.values.house_no}
                                        // onBlur = {props.handleBlur('house_no')}
                                    />
                                    <TextInput 
                                        placeholder='Street' placeholderTextColor={'#189AB4'} 
                                        style = {[styles.formInput, globalStyles.dropShadow]}
                                        onChangeText= {props.handleChange('street')}
                                        value = {props.values.street}
                                        // onBlur = {props.handleBlur('street')}
                                    />
                                </View>

                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Barangay' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('barangay')}
                                            value = {props.values.barangay}
                                            onBlur = {props.handleBlur('barangay')}
                                        />
                                        {
                                            props.errors.barangay && props.touched.barangay &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.barangay}</Text>
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Municipality' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('municipality')}
                                            value = {props.values.municipality}
                                            onBlur = {props.handleBlur('municipality')}
                                        />
                                        {
                                            props.errors.municipality && props.touched.municipality &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.municipality}</Text>
                                        }
                                    </View>
                                </View>

                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Province' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('province')}
                                            value = {props.values.province}
                                            onBlur = {props.handleBlur('province')}
                                        />
                                        {
                                            props.errors.province && props.touched.province &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.province}</Text>
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Zip Code' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            keyboardType ='number-pad'
                                            onChangeText= {props.handleChange('zipcode')}
                                            value = {props.values.zipcode}
                                            onBlur = {props.handleBlur('zipcode')}
                                        />
                                        {
                                            props.errors.zipcode && props.touched.zipcode &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.zipcode}</Text>
                                        }
                                    </View>
                                </View>


                                <Text style= {styles.form_head}> Account </Text>

                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Email' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('email')}
                                            value = {props.values.email}
                                            onBlur = {props.handleBlur('email')}
                                        />
                                        {props.errors.email && props.touched.email &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.email}</Text>
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Contact No.' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('contact_no')}
                                            value = {props.values.contact_no}
                                            onBlur = {props.handleBlur('contact_no')}
                                        />
                                        {props.errors.contact_no && props.touched.contact_no &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.contact_no}</Text>
                                        }
                                    </View>
                                </View>

                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Password' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            secureTextEntry = {true}
                                            onChangeText= {props.handleChange('password')}
                                            value = {props.values.password}
                                            onBlur = {props.handleBlur('password')
                                        }
                                        />
                                        {props.errors.password && props.touched.password &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.password}</Text>
                                        }
                                    </View>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='Confirm Password' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('confirm_password')}
                                            secureTextEntry = {true}
                                            value = {props.values.confirm_password}
                                            onBlur = {props.handleBlur('confirm_password')}
                                        />
                                        {props.errors.confirm_password && props.touched.confirm_password &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.confirm_password}</Text>
                                        }
                                    </View>
                                </View>

                                <Text style= {styles.form_head}> Security </Text>

                                <View style = {styles.inputContainer}>
                                    <View style = {styles.formInputContainer}>
                                        <TextInput 
                                            placeholder='What is your mothers maiden name?' placeholderTextColor={'#189AB4'} 
                                            style = {[styles.formInput, globalStyles.dropShadow]}
                                            onChangeText= {props.handleChange('security_ans')}
                                            value = {props.values.security_ans}
                                            onBlur = {props.handleBlur('security_ans')}
                                        />
                                        {props.errors.security_ans && props.touched.security_ans &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingHorizontal:15 }}>{ props.errors.security_ans}</Text>
                                        }
                                    </View>
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
    formInputContainer : {
        flex :1,
        flexDirection : 'column',
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
        fontSize:12,
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