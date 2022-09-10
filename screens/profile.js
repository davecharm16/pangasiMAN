import React, { useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button,TouchableOpacity, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { _getUser } from '../storage_async/async_function';
import { globalStyles } from '../styles/globalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import fireBaseConfig from '../fireBaseConfig';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';


initializeApp(fireBaseConfig);

const Profile = (props)=>{

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        // console.log(search);
        getProfileData();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const readProfileURL = "http://192.168.100.54/pangasimanAPI/rest/api/readapi.php";

    const[user, setUser] = useState('');
    const [url, setUrl] = useState();
    const[profileData, setProfileData] = useState(null);
    const[loading, setLoading] = useState(true);

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

    const getProfileData = async () => {
        const userData = await _getUser();
        if( userData !== null){
            setUser(userData);
        }
        else{
            console.log('no user')
            setUser('');
        }

        let data = {
            "action" : "get_profile",
            "userID" : userData.userID,
        }

        await axios.post(readProfileURL, data)
        .then((response) => {
            console.log(response.data.data[0]);
            setProfileData(response.data.data[0]);
            funct(response.data.data[0]);
            console.log(profileData);
            setLoading(false);
        })
        .catch((e)=>{
            console.log("Error on Getting Profile Data" + e);
        })
    }

    const funct = async (hasProfile) => {
        if(hasProfile.hasProfile != "0"){
            const storage = getStorage();
            const imageName = '/'+hasProfile.firstname+hasProfile.userID + 'images.jpg';
            console.log(imageName);
            const reference = ref(storage, imageName);
            await getDownloadURL(reference).then((x) => {
                console.log(x);
                setUrl(x);
            })
        }
        else{
            const storage = getStorage();
            const imageName = '/images.jpg';
            console.log(imageName);
            const reference = ref(storage, imageName);
            await getDownloadURL(reference).then((x) => {
                console.log(x);
                setUrl(x);
            })
        }
    }
    
    useEffect(
    () => {
        
        // getUser();
        // getProfileData();
        // funct();
        const unsubscribe = props.navigation.addListener('focus', () => {
            // alert('Screen is focused');
            // The screen is focused
            // Call any action
            // funct();
            // getUser();
            getProfileData();
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }
    , [url, profileData, user]);

    return (
        <View style = {styles.container }>
            {loading ? 
            <ActivityIndicator size="large" color="#189AB4" ></ActivityIndicator> 
            : 
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled = {true}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
            >
                <Text style = {styles.text}>Personal Information</Text>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style={styles.innerContainer}>
                        <View style = {styles.image_profile}>
                            <Image 
                                style = 
                                {{
                                width: '100%',
                                height: '100%',
                                borderRadius : 100,
                                }} 
                                source = {{uri:url}}
                            />
                        </View>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.textName}>{profileData.firstname} {profileData.lastname}</Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome5 name="user" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                    {user.age} years old, {user.sex}
                                </Text>  
                            </View>
                            <View style = {[globalStyles.row, {paddingVertical : 2,
                                alignItems: 'flex-start',}]}>
                                <SimpleLineIcons name="location-pin" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                    {profileData.houseNo}{profileData.street} {profileData.baranggay}, {profileData.municipality} {profileData.province}
                                </Text>  
                            </View>
                            <View style = {styles.edit}>
                                <TouchableOpacity 
                                    onPress={
                                        // navigation.navigate('PublicProfile')
                                        ()=>{
                                            console.log('EditPressed')
                                            props.navigation.navigate('EditProfile', {
                                                data : profileData 
                                            });
                                        }
                                    }
                                >
                                    <FontAwesome5 name="edit" size={24} color="#189AB4" />
                                </TouchableOpacity>
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
                            {profileData.contact_no}
                        </Text>  
                    </View>
                    <View style = {globalStyles.row}>
                        <MaterialCommunityIcons name="email-outline" size={18} color="#5B5B5B" />
                        <Text style = {styles.regText}>
                            {profileData.email}
                        </Text>  
                    </View>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <View style = {{flexDirection :'row', justifyContent: 'space-between', paddingRight:10}}>
                    <Text style = {styles.text}>Skills</Text>
                    <TouchableOpacity>
                            <FontAwesome5 name="plus" size={24} color="#189AB4" />
                    </TouchableOpacity>
                </View>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style = {globalStyles.row}>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Cooking
                            </Text>
                            <TouchableOpacity>
                                <Feather name="x-circle" size={18} color="white" />
                            </TouchableOpacity>  
                        </View>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Plumbing
                            </Text>  
                            <TouchableOpacity>
                                <Feather name="x-circle" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <Text style = {styles.text}>Service Reviews</Text>

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
            }
            
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


export default Profile;