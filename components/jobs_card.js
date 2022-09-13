import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ToastAndroid} from 'react-native';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import moment from 'moment';
import { _getUser } from '../storage_async/async_function';


// import { TouchableOpacity } from 'react-native-gesture-handler';



const JobCard = ({item, navigation, apply, passedID}) => {
    
    const [id, setID] = useState(passedID);

    const getUserData= async ()=>{
        return await _getUser();
    }
    const userData = getUserData();

    
    const timePosted=(time)=>{
        return moment(time).fromNow();
    }


    useEffect(() => {
        userData.then((res)=>{
            console.log(res);
            setID(res.userID);
        });
    }, [])

    return (
            <View style={[globalStyles.card, styles.cardContainer]}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ViewJob', {
                        data : item,
                        userID : id
                    });
                }}>
                {
                        (id == item.jobUserID) &&
                        // <View style = {[styles.styleBtn, {padding:5}]}>
                        //     <Text style = {styles.btnText}>YOURS</Text>
                        // </View>
                        // <CustomButton onPress={()=>{
                        //     navigation.navigate('ViewJob', {
                        //         data : item
                        //     });
                        // }} 
                        //     title={'Your Post'} styleButton={styles.styleBtn} styleText={styles.btnText}
                        // />
                        <View style = {[styles.itemContainer, {padding: 5, justifyContent:'center'}]}>
                            <Text style={[styles.cardText, {color:"#189AB4", fontSize:18}]}>Your Post</Text>
                        </View>
                    }
                <View style = {styles.itemContainer}>
                    <Octicons name="briefcase" size={24} color="black" />
                    <View style = {{width:10}}></View>
                    <Text style={[styles.cardText]}>{item.jobTitle}</Text>
                </View>
                <View style = {styles.itemContainer}>
                    <MaterialIcons name="attach-money" size={24} color="#5B5B5B" />
                    <Text style={[styles.cardText, styles.grayText]}>{item.jobPay} Php</Text>
                </View>
                <View style = {styles.itemContainer}>
                    <MaterialIcons name="location-pin" size={24} color="#5B5B5B" />
                    <Text style={[styles.cardText, styles.grayText]}>{item.jobLocation}</Text>
                </View>
                <View style = {styles.itemContainer}>
                    <Text style={[styles.cardText]}>Description</Text>
                </View>
                <View style = {styles.itemContainer}>
                    <Text style={[styles.cardTextRegular, styles.description]}>{item.jobDescription}</Text>
                </View>
                <View style = {[styles.itemContainer, styles.empData]}>
                    <TouchableOpacity onPress={
                        ()=>{
                            navigation.navigate('PublicProfile', {
                                userID : item.jobUserID,
                                appUserID : id,
                            });
                        }
                    }>
                        <View style = {styles.itemContainer}>
                            <FontAwesome name="user-circle" size={24} color="black" />
                            <Text style={[styles.cardTextRegular]}> {item.firstname} {item.lastname}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        (id != item.jobUserID) &&
                        <CustomButton onPress={()=>{
                            apply(
                                item.jobID,
                                id
                            );
                        }} 
                            title={'Apply'} styleButton={styles.styleBtn} styleText={styles.btnText}
                        />
                    }
                    {/* {
                        (id == item.jobUserID) &&
                        // <View style = {[styles.styleBtn, {padding:5}]}>
                        //     <Text style = {styles.btnText}>YOURS</Text>
                        // </View>
                        <CustomButton onPress={()=>{
                            navigation.navigate('ViewJob', {
                                data : item
                            });
                        }} 
                            title={'Your Post'} styleButton={styles.styleBtn} styleText={styles.btnText}
                        />
                    } */}
                </View>
                <View style = {styles.itemContainer}>
                    <FontAwesome5 name="business-time" size={24} color="black" />
                    <Text style={[styles.cardTextRegular, {fontSize:14}]}>  Posted {timePosted(item.created_at)}</Text>
                </View>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    cardContainer : {
        flexDirection: 'column',
        backgroundColor : '#f8f8f8',
        paddingHorizontal: 15,
        paddingVertical: 10,
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
    }
});
export default JobCard;