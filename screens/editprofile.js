import React, { useEffect, useState} from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, Alert,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import fireBaseConfig from '../fireBaseConfig';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { api, host, directory } from '../api_link';
import {Formik} from 'formik';
import { TextInput} from 'react-native-paper';
import * as yup from 'yup';




initializeApp(fireBaseConfig);

const personalInformationSchema = yup.object().shape({
    firstname : yup 
    .string()
    .required('First Name is Required')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .min(2, ({ min }) => `at least ${min} characters`),
    lastname : yup 
    .string()
    .required('Last Name is Required')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .min(2, ({ min }) => `at least ${min} characters`),
    contact_no: yup
    .string()
    .required('Contact Code is Required')
    .matches(/^0(9)\d{9}$/,'Please use a valid number'),
})

const addressSchema = yup.object().shape({
    baranggay: yup
    .string()
    .required('Baranggay is Required'),
    municipality: yup
    .string()
    .required('Municipality is Required'),
    province: yup
    .string()
    .required('Province is Required'),
    zipcode: yup
    .string()
    .required('Zip Code is Required'),
})

const passwordSchema = yup.object().shape({
    old_password: yup
    .string()
    .required('Old Password is required'),
    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('New Password is required'),
    confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})


const EditProfile = ({route, navigation}) => {
    // const updateURL = "http://192.168.100.54/pangasimanAPI/rest/api/updateapi.php";
    console.log(host+directory+api.updateURL);
    const updateURL = host+directory+api.updateURL;
    const {data} = route.params;
    const [image, setImage] = useState('');

    console.log(data);

    //color
    const sec_color = '#189AB4';


    const setProfilePic = async()=>{
        let body = {
            "action" : "update_profile_pic",
            "userID" : data.userID
        }

        axios.post(updateURL, body)
        .then((response)=>{
            console.log(response.data.message);
        })
        .catch((e)=>{
            console.log("ERROR UPDATING PROF. PIC" + e);
        })
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            // uploadImage(result.uri);
            // setImage(result.uri);
            uploadImage(result.uri)
            .then(()=>{
                setProfilePic();
                Alert.alert('Image is uploaded');
            })
        }
    };

    const uploadImage = async (uri) => {
        console.log('image is uploaded');
        const imageName = data.firstname+data.userID + 'images.jpg';
        const storage = getStorage();
        // Create a child reference
        const imagesRef = ref(storage, imageName);
        // imagesRef now points to 'images'
        const img = await fetch(uri);
        const bytes = await img.blob();

        await uploadBytes(imagesRef, bytes);
    }
  

    return (

        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
            >
                {/* <Text> Test Upload Image</Text> */}
                <View style={styles.profile_photo}>
                    <Image/>
                </View>
                <View style={{ marginVertical: 10, alignSelf: 'center'}}>
                    <Button title="Change Profile Photo" onPress={pickImage} color ='#189AB4'/>
                </View>
                <View style = {styles.form}>
                    <Text style= {styles.form_head}> Personal Information </Text>
                    <Formik
                        validationSchema={personalInformationSchema}
                        initialValues={
                            {
                                firstname:data.firstname, lastname:data.lastname, contact_no : data.contact_no,
                            }
                        }
                        onSubmit = { (values,actions) => {
                            // console.log(values)
                            console.log(values);
                        }}
                    >
                        {
                            (props)=>(
                                <View>
                                    <TextInput mode='outlined' 
                                        theme={
                                            { 
                                            colors: { 
                                                text: "#189AB4", 
                                                background: '#fff',
                                                primary : '#189AB4',
                                                placeholder : '#189AB4',
                                                } 
                                            }
                                        } 
                                        label = "First Name"
                                        outlineColor={sec_color} activeOutlineColor = {sec_color}
                                        selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                        style = {styles.txtInp}
                                        value = {props.values.firstname}
                                        onChangeText= {props.handleChange('firstname')}
                                        onBlur = {props.handleBlur('firstname')}
                                    />
                                    {
                                        props.errors.firstname && props.touched.firstname &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.firstname}
                                        </Text>
                                    }
                                    <TextInput mode='outlined' 
                                        theme={
                                            { 
                                            colors: { 
                                                text: "#189AB4", 
                                                background: '#fff',
                                                primary : '#189AB4',
                                                placeholder : '#189AB4',
                                                } 
                                            }
                                        } 
                                        label = "Last Name"
                                        outlineColor={sec_color} activeOutlineColor = {sec_color}
                                        selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                        style = {styles.txtInp}
                                        value = {props.values.lastname}
                                        onChangeText= {props.handleChange('lastname')}
                                        onBlur = {props.handleBlur('lastname')}
                                    />
                                    {
                                        props.errors.lastname && props.touched.lastname &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.lastname}
                                        </Text>
                                    }
                                    <TextInput mode='outlined' 
                                        theme={
                                            { 
                                            colors: { 
                                                text: "#189AB4", 
                                                background: '#fff',
                                                primary : '#189AB4',
                                                placeholder : '#189AB4',
                                                } 
                                            }
                                        } 
                                        label = "Contact No"
                                        outlineColor={sec_color} activeOutlineColor = {sec_color}
                                        selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                        style = {styles.txtInp}
                                        value = {props.values.contact_no}
                                        onChangeText= {props.handleChange('contact_no')}
                                        onBlur = {props.handleBlur('contact_no')}
                                        keyboardType = 'phone-pad'
                                    />
                                    {
                                        props.errors.contact_no && props.touched.contact_no &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.contact_no}
                                        </Text>
                                    }
                                    <View style = {{alignSelf:'center', marginVertical : 5}}>
                                        <Button color={'#189AB4'} title='Update Information' onPress={props.handleSubmit}/>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>
                <View style = {styles.form}>
                    <Text style= {styles.form_head}> Address</Text>
                    <Formik
                        validationSchema={addressSchema}
                        initialValues={
                            {
                                houseNo:data.houseNo, street:data.street, baranggay : data.baranggay,
                                municipality : data.municipality, province : data.province, zipcode : data.zipcode
                            }
                        
                        }
                        onSubmit = {
                            (values, action) =>{
                                console.log(values)
                            }
                        }
                    >
                        {
                            (props)=>(
                                <View>
                                    <View style = {styles.rowInput}>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "House No."
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.houseNo}
                                                onChangeText= {props.handleChange('houseNo')}
                                                onBlur = {props.handleBlur('houseNo')}
                                            />
                                        </View>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "Street"
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.street}
                                                onChangeText= {props.handleChange('street')}
                                                onBlur = {props.handleBlur('street')}
                                            />
                                        </View>
                                    </View>
                                    <View style = {styles.rowInput}>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "Baranggay"
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.baranggay}
                                                onChangeText= {props.handleChange('baranggay')}
                                                onBlur = {props.handleBlur('baranggay')}
                                            />
                                            {
                                                props.errors.baranggay && props.touched.baranggay &&
                                                <Text style={{ fontSize: 10, color: 'red'}}>
                                                    { props.errors.baranggay}
                                                </Text>
                                            }
                                        </View>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "Municipality"
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.municipality}
                                                onChangeText= {props.handleChange('municipality')}
                                                onBlur = {props.handleBlur('municipality')}
                                            />
                                            {
                                                props.errors.municipality && props.touched.municipality &&
                                                <Text style={{ fontSize: 10, color: 'red'}}>
                                                    { props.errors.municipality}
                                                </Text>
                                            }
                                        </View>
                                    </View>
                                    <View style = {styles.rowInput}>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "Province"
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.province}
                                                onChangeText= {props.handleChange('province')}
                                                onBlur = {props.handleBlur('province')}
                                            />
                                            {
                                                props.errors.province && props.touched.province &&
                                                <Text style={{ fontSize: 10, color: 'red'}}>
                                                    { props.errors.province}
                                                </Text>
                                            }
                                        </View>
                                        <View style = {styles.inputContainer}>
                                            <TextInput mode='outlined' 
                                                theme={
                                                    { 
                                                    colors: { 
                                                        text: "#189AB4", 
                                                        background: '#fff',
                                                        primary : '#189AB4',
                                                        placeholder : '#189AB4',
                                                        } 
                                                    }
                                                } 
                                                label = "Zipcode"
                                                outlineColor={sec_color} activeOutlineColor = {sec_color}
                                                selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                                style = {styles.txtInp}
                                                value = {props.values.zipcode}
                                                onChangeText= {props.handleChange('zipcode')}
                                                onBlur = {props.handleBlur('zipcode')}
                                            />
                                            {
                                                props.errors.zipcode && props.touched.zipcode &&
                                                <Text style={{ fontSize: 10, color: 'red'}}>
                                                    { props.errors.zipcode}
                                                </Text>
                                            }
                                        </View>
                                    </View>
                                                
                                    <View style = {{alignSelf:'center', marginVertical : 5}}>
                                        <Button color={'#189AB4'} title='Update Address' onPress={props.handleSubmit}/>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>

                <View style = {styles.form}>
                    <Text style= {styles.form_head}> Change Password </Text>
                    <Formik
                        validationSchema={passwordSchema}
                        initialValues={
                            {
                                old_password:'', password:'', confirm_password : '',
                            }
                        }
                        onSubmit = {
                            (values, action) =>{
                                console.log(values);
                            }
                        }
                    >
                        {
                            (props)=>(
                                <View>
                                    <TextInput mode='outlined'
                                    secureTextEntry = {true}
                                    theme={
                                        { 
                                        colors: { 
                                            text: "#189AB4", 
                                            background: '#fff',
                                            primary : '#189AB4',
                                            placeholder : '#189AB4',
                                            } 
                                        }
                                    } 
                                    label = "Old Password"
                                    outlineColor={sec_color} activeOutlineColor = {sec_color}
                                    selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                    style = {styles.txtInp}
                                    value = {props.values.old_password}
                                    onChangeText= {props.handleChange('old_password')}
                                    onBlur = {props.handleBlur('old_password')}
                                    />
                                    {
                                        props.errors.old_password && props.touched.old_password &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.old_password}
                                        </Text>
                                    }
                                    <TextInput mode='outlined' 
                                    theme={
                                        { 
                                        colors: { 
                                            text: "#189AB4", 
                                            background: '#fff',
                                            primary : '#189AB4',
                                            placeholder : '#189AB4',
                                            } 
                                        }
                                    } 
                                    label = "New Password"
                                    outlineColor={sec_color} activeOutlineColor = {sec_color}
                                    selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                    style = {styles.txtInp}
                                    value = {props.values.password}
                                    onChangeText= {props.handleChange('password')}
                                    onBlur = {props.handleBlur('password')}
                                    secureTextEntry = {true}
                                    />
                                    {
                                        props.errors.password && props.touched.password &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.password}
                                        </Text>
                                    }
                                    <TextInput mode='outlined' 
                                    theme={
                                        { 
                                        colors: { 
                                            text: "#189AB4", 
                                            background: '#fff',
                                            primary : '#189AB4',
                                            placeholder : '#189AB4',
                                            } 
                                        }
                                    } 
                                    label = "Confirm Password"
                                    outlineColor={sec_color} activeOutlineColor = {sec_color}
                                    selectionColor = {sec_color} placeholderTextColor = {sec_color} 
                                    style = {styles.txtInp}
                                    value = {props.values.confirm_password}
                                    onChangeText= {props.handleChange('confirm_password')}
                                    onBlur = {props.handleBlur('confirm_password')}
                                    secureTextEntry = {true}
                                    />
                                    {
                                        props.errors.confirm_password && props.touched.confirm_password &&
                                        <Text style={{ fontSize: 10, color: 'red'}}>
                                            { props.errors.confirm_password}
                                        </Text>
                                    }
                                    <View style = {{alignSelf:'center', marginVertical : 5}}>
                                        <Button color={'#189AB4'} title='Change Password' onPress={props.handleSubmit}/>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : '#fff',
        // alignItems: 'center',
        padding: 10,
        borderWidth:1,
        borderColor: "#000",
    },
    rowInput: {
        flexDirection : 'row',
    },
    inputContainer : {
        flexDirection : 'column',
        flex : 1,
        marginHorizontal: 2,
    },
    form : {
        flexDirection : 'column',
        paddingHorizontal : 20,
        // borderWidth: 1,
    },
    profile_photo : {
        alignSelf: 'center',
        height: 120,
        width: 120,
        borderRadius: 120,
        borderWidth: 7,
        borderColor: '#189AB4',
    },
    txtInp : {
        color : '#189AB4',
        fontFamily : 'Inter-Bold',
        fontWeight : 'bold',
        textTransform : 'capitalize',
        marginVertical : 5,
    },
    form_head : {
        fontFamily : 'Inter-Bold',
        fontSize : 18,
        marginTop: 10,
        textTransform: 'uppercase',
        color : '#05445E',
        alignSelf : 'center'
    }
});


export default EditProfile;