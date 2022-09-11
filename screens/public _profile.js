import React, { useEffect, useState} from 'react';
import { Alert,Text, View, StyleSheet, Button, TouchableOpacity, ScrollView} from 'react-native';
import { _getUser } from '../storage_async/async_function';
import { globalStyles } from '../styles/globalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { ScrollView} from 'react-native-gesture-handler';


const PublicProfile = ()=>{

    // const[user, setUser] = useState('');

    // const getUser = async ()=>{
    //     const userData = await _getUser();
    //     if( userData !== null){
    //         setUser(userData);
    //     }
    //     else{
    //         console.log('no user')
    //         setUser('');
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // }, []);

    return (
        <View style = {styles.container }>
            <ScrollView  
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled = {true}
            >
                <Text style = {styles.text}>Personal Information</Text>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style={styles.innerContainer}>
                        <View style = {styles.image_profile}>

                        </View>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.textName}>Test Name</Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome5 name="user" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                  18 years old,  Male
                                </Text>
                            </View>
                            <View style = {globalStyles.row}>
                                <SimpleLineIcons name="location-pin" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                    #452 Talospatang, Malasiqui, Pangasinan
                                </Text>  
                            </View>
                        </View>
                    </View>
                </View>
                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style = {{flexDirection : 'row', justifyContent : 'center'}}>
                        <Text style = {styles.textName}> Contact Information</Text>
                    </View>
                    <View style = {globalStyles.row}>
                        <AntDesign name="phone" size={18} color="#5B5B5B" />
                        <Text style = {styles.regText}>
                            09151869987
                        </Text>  
                    </View>
                    <View style = {globalStyles.row}>
                        <MaterialCommunityIcons name="email-outline" size={18} color="#5B5B5B" />
                        <Text style = {styles.regText}>
                            dcbb@gmail.com
                        </Text>  
                    </View>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <Text style = {styles.text}>Skills</Text>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style = {globalStyles.row}>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Cooking
                            </Text>
                        </View>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Plumbing
                            </Text>  
                        </View>
                    </View>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <View style = {{flexDirection :'row', justifyContent: 'space-between'}}>
                        <Text style = {styles.text}>Service Reviews</Text>
                        <TouchableOpacity
                            onPress={ ()=>{
                                console.log('Give Review');
                            }}
                        >
                            <FontAwesome5 name="plus" size={24} color="#189AB4" />
                        </TouchableOpacity>
                    </View>
                <View style={styles.reviewsContainer}>
                    <ScrollView 
                    nestedScrollEnabled = {true}
                    >
                        <View style = {[globalStyles.card, globalStyles.card_default]}>
                            <Text style={styles.textName}>
                                Walter O Brien
                            </Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                            </View>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil qui nisi accusantium. Laudantium, reiciendis voluptatibus fugit explicabo est esse.
                            </Text>
                        </View>
                        <View style = {[globalStyles.card, globalStyles.card_default]}>
                            <Text style={styles.textName}>
                                Tobias Curtis
                            </Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                            </View>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil qui nisi accusantium. Laudantium, reiciendis voluptatibus fugit explicabo est esse.
                            </Text>
                        </View>
                        <View style = {[globalStyles.card, globalStyles.card_default]}>
                            <Text style={styles.textName}>
                                Tobias Curtis
                            </Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                                <FontAwesome name="star" size={14} color="#189AB4" />
                            </View>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil qui nisi accusantium. Laudantium, reiciendis voluptatibus fugit explicabo est esse.
                            </Text>
                        </View>
                    </ScrollView>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <Text style = {styles.text}>Job Offered</Text>

                <View style={styles.reviewsContainer}>
                    <ScrollView
                        nestedScrollEnabled = {true}
                    >
                        <View style = {[globalStyles.card, globalStyles.card_default]}>
                            <Text style={styles.textName}>
                                Home Cleaning Service
                            </Text>
                            <View style = {globalStyles.row}>
                                <MaterialIcons name="attach-money" size={18} color="#5B5B5B" />
                                <Text>
                                    500 Php
                                </Text>
                            </View>
                            <View style = {globalStyles.row}>
                                <MaterialIcons name="location-pin" size={18} color="#5B5B5B" />
                                <Text>
                                    Dagupan City, Pangasinan
                                </Text>
                            </View>
                            <Text style={styles.textName}>
                                Description
                            </Text>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil qui nisi accusantium. Laudantium, reiciendis voluptatibus fugit explicabo est esse.
                            </Text>
                            <View style = {styles.edit}>
                                <Button color='#189AB4' title='View'/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    skillContainer : {
        flexDirection : 'row',
        backgroundColor : '#189AB4',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius : 10,
        margin: 5,
    },
    skillText: {
        fontFamily : 'Mont-Bold',
        marginRight : 5,
        color : '#fff'
    },  
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily : 'Inter-Regular',
        marginBottom : 20,
        color : '#05445E',
        textTransform : 'uppercase',
    },
    innerContainer : {
        flexDirection : 'row',
    },
    image_profile :{
        height : 120,
        width : 120,
        borderRadius: 120,
        borderWidth: 7,
        borderColor : '#189AB4',
        marginRight : 10,
    },
    textContainer : {
        flex : 1,
        flexDirection : 'column',
    },
    textName : {
        fontFamily : 'Mont-Bold',
        fontSize : 14,
        marginVertical: 5,
    },
    regText :{
        fontFamily : 'Mont-Regular',
        fontSize : 14,
        marginLeft : 10,
        flex: 1,
    },
    edit :{
        padding: 5,
        flexDirection : 'row',
        alignSelf : 'flex-end',
    },
    reviewsContainer : {
        height : 250,
    }
});


export default PublicProfile;