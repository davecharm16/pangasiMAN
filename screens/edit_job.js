import React , {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert} from "react-native";
import { globalStyles } from '../styles/globalStyle';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from "formik";
import * as yup from 'yup';
import { _getUser } from "../storage_async/async_function";
import axios from 'axios';
import { api, host, directory } from '../api_link';


const createJobSchema = yup.object().shape({
    jobTitle : yup 
    .string()
    .required('Job Title is Required')
    .min(3, ({ min }) => `at least ${min} characters`),
    jobPay : yup 
    .string()
    .required('Job Pay is Required'),
    jobLocation : yup 
    .string()
    .required('Job Location is Required'),
    jobDescription : yup 
    .string()
    .required('Job Description is Required'),
})


const editJobURL = host+directory+api.editJobURL;


const EditJob = ({navigation, route}) =>{

    const {jobData} = route.params;
    const {userID} = route.params;
    const {callBack} = route.params;

    console.log('job data passed');
    console.log(jobData, userID);
    //Submit the data through axios

    const updateJob = async(values, actions) =>{
        let body = {
            "action" : "update_job",
            "jobTitle" : values.jobTitle,
            "jobPay" : values.jobPay,
            "jobLocation" : values.jobLocation,
            "jobDescription" : values.jobDescription,
            "jobID" : jobData.jobID
        }
        console.log("fuckedd up");
        console.log(body);

        await axios.post(editJobURL, body)
        .then((response) =>{
            if(response.data.message == "success"){
                Alert.alert(response.data.message);
                let res = {...jobData, jobTitle: values.jobTitle, jobPay: values.jobPay, jobLocation:values.jobLocation, jobDescription:values.jobDescription};
                callBack(res);
            }   
            else{
                actions.resetForm();
                console.log(response.data);
            }
        })
        .catch((error) => {
            Alert.alert("Network Error, Error Updating");
            actions.resetForm();
        })
    }

    useEffect(() => {
    }, []);

    return (
        <View style={{flex: 1, backgroundColor : '#fff'}}>
            <KeyboardAwareScrollView>
                <Formik
                    validationSchema={createJobSchema}
                    initialValues={
                        {
                            jobTitle : jobData.jobTitle,
                            jobPay : jobData.jobPay,
                            jobLocation : jobData.jobLocation,
                            jobDescription : jobData.jobDescription,
                        }
                    }
                    onSubmit={(values, actions)=>{
                            updateJob(values, actions);
                            // actions.resetForm();
                        }
                    }
                >
                {
                    (props) => (
                    <View style = {styles.cardContainer}>
                        <Text style = {styles.text}>Edit your Job Offer</Text>
                        <View style ={[globalStyles.card, styles.card]} >
                            <View style={styles.row}>
                                <Octicons name="briefcase" size={24} color="black" />
                                <TextInput placeholder="Job Title" style = {[globalStyles.card, styles.inputCard]}
                                    onChangeText= {props.handleChange('jobTitle')}
                                    value = {props.values.jobTitle}
                                    onBlur = {props.handleBlur('jobTitle')}
                                />
                            </View>
                            {
                                props.errors.jobTitle && props.touched.jobTitle  && 
                                <Text style= {{fontSize: 14, color :'red'}}> {props.errors.jobTitle}</Text>
                            }
                            <View style={styles.row}>
                                <MaterialIcons name="attach-money" size={24} color="#5B5B5B" />
                                <TextInput placeholder="Pay 0.00" keyboardType="numeric" style = {[globalStyles.card, styles.inputCard]}
                                    onChangeText= {props.handleChange('jobPay')}
                                    value = {props.values.jobPay}
                                    onBlur = {props.handleBlur('jobPay')}
                                />
                            </View>
                            {
                                props.errors.jobPay && props.touched.jobPay  && 
                                <Text style= {{fontSize: 14, color :'red'}}> {props.errors.jobPay}</Text>
                            }
                            <View style={styles.row}>
                                <MaterialIcons name="location-pin" size={24} color="#5B5B5B" />
                                <TextInput placeholder="Job Location" style = {[globalStyles.card, styles.inputCard]}
                                    onChangeText= {props.handleChange('jobLocation')}
                                    value = {props.values.jobLocation}
                                    onBlur = {props.handleBlur('jobLocation')}
                                />
                            </View>
                            {
                                props.errors.jobLocation && props.touched.jobLocation  && 
                                <Text style= {{fontSize: 14, color :'red'}}> {props.errors.jobLocation}</Text>
                            }
                        </View>
                        <View style ={[globalStyles.card, styles.card]} >
                            <Text style = {{
                                fontFamily : 'Mont-Bold',
                                fontSize : 14,
                            }}>
                                Description
                            </Text>
                            <View style={styles.row}>
                                <TextInput placeholder="Description" style = {[globalStyles.card, styles.inputCard]} multiline={true}
                                    onChangeText= {props.handleChange('jobDescription')}
                                    value = {props.values.jobDescription}
                                    onBlur = {props.handleBlur('jobDescription')}
                                />
                            </View>
                            {
                                props.errors.jobDescription && props.touched.jobDescription  && 
                                <Text style= {{fontSize: 14, color :'red'}}> {props.errors.jobDescription}</Text>
                            }
                        </View>
                        <View style = {styles.btnContainer}>
                            <Button title="Update" color='#189AB4' onPress={props.handleSubmit}/>
                        </View>
                    </View>
                    )
                }
                </Formik>
            </KeyboardAwareScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    cardContainer : {
        flex:1,
        flexDirection: 'column',
        backgroundColor : '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    card :{
        backgroundColor : '#f8f8f8',
        paddingHorizontal: 20,
        paddingVertical : 10,
    },
    btnContainer : {
        marginHorizontal : 10,
        flexDirection : 'row',
        alignSelf : 'flex-end',
        marginVertical : 10,
    },
    row :{
        flexDirection : 'row',
        marginVertical : 2,
        alignItems : 'center',
    },
    inputCard :{
        backgroundColor : '#fff',
        paddingVertical: 15,
        paddingHorizontal : 10,
        flex:1,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily : 'Inter-Regular',
        marginBottom : 20,
        color : '#05445E',
        textTransform : 'uppercase',
    },
    cardText :{
        fontFamily : 'Mont-Bold',
    },
    cardTextRegular :{
        fontFamily : 'Mont-Regular',
    },
    grayText : {
        color : '#5B5B5B'
    },
    itemContainer:{
        flexDirection : 'row',
        marginBottom: 5,
        alignItems:'center'
    },
    styleBtn :{
        backgroundColor : '#189AB4',
        borderRadius: 10,
        paddingHorizontal:20,
    },
    btnText : {
        color : '#fff',
    },
    empData : {
        justifyContent : 'space-between',
    },
    description:{
        marginLeft: 5,
        lineHeight: 25,
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
        fontSize:12,
    },
    formInputContainer : {
        flex :1,
        flexDirection : 'column',
    },
});
export default EditJob;