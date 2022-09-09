import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';



const JobCard = ({item, navigation}) => {
    return (
        <TouchableOpacity>
            <View style={[styles.cardContainer, globalStyles.card]}>
                <View style = {styles.itemContainer}>
                    <Text style={[styles.cardText]}>{item.jobName}</Text>
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
                            navigation.navigate('PublicProfile');
                        }
                    }>
                        <View style = {styles.itemContainer}>
                            <FontAwesome name="user-circle" size={24} color="black" />
                            <Text style={[styles.cardTextRegular]}> {item.jobEmp}</Text>
                        </View>
                    </TouchableOpacity>
                    <CustomButton onPress={()=>{}} 
                        title={'Apply'} styleButton={styles.styleBtn} styleText={styles.btnText}
                    />
                </View>
            </View>
        </TouchableOpacity>
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