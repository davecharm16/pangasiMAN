import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button, TextInput, RefreshControl, TouchableOpacity, ScrollView, FlatList, ToastAndroid } from 'react-native';
import JobCard from '../components/jobs_card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyle';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';
import moment from 'moment';
import { api, host, directory } from '../api_link';
import { _getUser } from '../storage_async/async_function';
import CustomButton from '../styles/customButton';



const readAppliedURL = host+directory+api.readAppliedURL;
const deleteAppliedURL = host+directory+api.deleteAppliedURL;


const AppliedJobs = ({navigation})=>{

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        // console.log(search);
        getAppliedJobs();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const timePosted=(time)=>{
        return moment(time).fromNow();
    }

    const showToast = (message) => {
        ToastAndroid.show(message + ", The Job is Discarded", ToastAndroid.SHORT);
    };

    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({});

    const getAppliedJobs = async () => {
        let userData = await _getUser();
        setUser(userData);
        let body = {
            "action" : "get_applied",
            "userID": userData.userID
        }
        axios.post(readAppliedURL, body)
        .then((response) => {
            setJobs(response.data.data);
        })
        .catch((error) => {
            console.log("ERROR GETTING APPLIED" + error)
        })
    }

    const deleteApplied = async (id) =>{
        let body = {
            "action" : "delete_applied",
            "id": id
        }
        
        await axios.post(deleteAppliedURL, body)
        .then((response) =>{
            if(response.data.message == "success"){
                showToast(response.data.message);
                getAppliedJobs();
            }
            else{
                ToastAndroid.show("Error Discarding Job Post!, Try again Later", ToastAndroid.SHORT);
            }
        })
        .catch((e)=>{
            Alert.alert('Network Error', "Check Your Internet Connection, Try again Later!");
        })
    }

    useEffect(() => {
        getAppliedJobs();
        const unsubscribe = navigation.addListener('focus', () => {
            getAppliedJobs();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])

    return (
        <View style = {{flex:1, padding: 10,backgroundColor :'#fff'}}>
            <ScrollView
                nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    jobs.map((item, index) => {
                        return(
                        <View key={index}>
                            <View style={{height:10}}></View>
                            <View style={[globalStyles.card, globalStyles.card_default]}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        navigation.navigate('ViewJob', {
                                            data : item
                                        });
                                    }}
                                >
                                    <View style={globalStyles.row}>
                                        <Octicons name="briefcase" size={24} color="black" />
                                        <View style = {{width:10}}></View>
                                        <Text style={styles.textName}>
                                            {item.jobTitle}
                                        </Text>
                                    </View>
                                    <View style={globalStyles.row}>
                                        <MaterialIcons name="attach-money" size={24} color="#5B5B5B" />
                                        <Text style={[styles.cardText, styles.grayText]}>
                                            {item.jobPay} Php / Day
                                        </Text>
                                    </View>
                                    <View style={globalStyles.row}>
                                        <MaterialIcons name="location-pin" size={24} color="#5B5B5B" />
                                        <Text style= {[styles.cardText, styles.grayText]}>
                                            {item.jobLocation}
                                        </Text>
                                    </View>
                                    <Text style={styles.textName}>
                                        Description
                                    </Text>
                                    <Text style = {[styles.cardTextRegular, styles.description]} >
                                        {item.jobDescription}
                                    </Text>
                                    <View style = {globalStyles.row}>
                                    <TouchableOpacity onPress={
                                            ()=>{
                                                navigation.navigate('PublicProfile', {
                                                    userID : item.jobUserID,
                                                    appUserID : user.userID,
                                                });
                                            }
                                        }>
                                        <View style = {globalStyles.row}>
                                            <FontAwesome name="user-circle" size={24} color="black" />
                                            <Text style={[styles.cardTextRegular]}> {item.firstname} {item.lastname}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                    <View style = {globalStyles.row}>
                                        <FontAwesome5 name="business-time" size={24} color="black" />
                                        <Text style={[styles.cardTextRegular, {fontSize:14}]}>  Posted {timePosted(item.created_at)}</Text>
                                    </View>
                                    <View style={styles.edit}>
                                    <CustomButton onPress={()=>{
                                        deleteApplied(item.appliedID);
                                    }} 
                                         title={'Discard'} styleButton={styles.styleBtn} styleText={styles.btnText}
                                    />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    })
                }
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Inter-Regular',
        marginBottom: 20,
        color: '#05445E',
        textTransform: 'uppercase',
    },
    edit: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    textName: {
        fontFamily: 'Mont-Bold',
        fontSize: 14,
        marginVertical: 5,
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
    description:{
        marginLeft: 5,
        lineHeight: 25,
    },
    styleBtn :{
        backgroundColor : '#ed5e68',
        borderRadius: 10,
        paddingHorizontal:20,
    },
    btnText : {
        color : '#fff',
    },
});

export default AppliedJobs;

