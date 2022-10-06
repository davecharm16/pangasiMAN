import React, { useEffect, useState} from 'react';
import { Alert,Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Image, RefreshControl, Modal, Pressable, TextInput, ToastAndroid} from 'react-native';
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
import { api, host, directory } from '../api_link';
import { Rating, AirbnbRating } from 'react-native-ratings';



initializeApp(fireBaseConfig);
// import { ScrollView} from 'react-native-gesture-handler';

const readProfileURL = host+directory+api.readProfileURL;
const readSkillsURL = host + directory + api.readSkillsURL;
const getReviewsURL = host + directory + api.getReviewsURL;
const createReviewsURL = host + directory + api.createReviewsURL;
const getJobOfferedURL = host + directory + api.getJobOfferedURL;
const deleteReviewsURL = host + directory + api.deleteReviewsURL;





const PublicProfile = ({navigation, route})=>{

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        // console.log(search);
        getProfileData();
        getReviews();
        getJobOffered();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const {userID} = route.params;
    const {appUserID} = route.params;


    console.log(userID);
    console.log(appUserID);

    const [user, setUser] = useState('');
    const [url, setUrl] = useState();
    const [rate, setRate] = useState(1);
    const [review, setReview] = useState('');
    const [skills, setSkills] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [jobOffered, setJobOffered] = useState([]);




    const getProfileData = async () => {

        let data = {
            "action" : "get_profile",
            "userID" : userID
        }

        await axios.post(readProfileURL, data)
        .then((response) => {
            let result = response.data.data[0];
            setUser(response.data.data[0]);
            funct(response.data.data[0]);
            getSkills(result.userID);
        })
        .catch((e)=>{
            console.log("Error on Getting Profile Data" + e);
        })
    }

    const getSkills = async (id) => {

        let data = {
            "action": "get_skills",
            "userID": id
        }

        await axios.post(readSkillsURL, data)
        .then((response) => {
            setSkills(response.data.data);
            console.log(response.data.data);
        })
        .catch((e) => {
            console.log("Error on Getting Skills Data" + e);
        })
    }

    //get Job Offered
    const getJobOffered = async() =>{
        let body = {
            "action" : "get_job_offered",
            "userID" : userID
        }
        axios.post(getJobOfferedURL, body)
        .then((response) =>{
            if(response.data.message == "success"){
                setJobOffered(response.data.data)
            }
            else{
                setJobOffered([]);
            }
        })
        .catch((error) => {
            Alert.alert("NetWork Error: Error on Getting JobOffered");
        })
    }

    //createReview
    const createReview = async (textReview) =>{
        let body = {
            "action" : "create_review",
            "reviewUserID" : userID,
            "giverUserID" : appUserID,
            "stars" : rate,
            "review" : textReview
        }

        if(textReview.length > 0) {
            await axios.post(createReviewsURL, body)
            .then((response) => {
                if(response.data.message == "Success"){
                    ToastAndroid.show("Review Submitted", ToastAndroid.SHORT);
                    getReviews();
                    setReview('');
                }
                else{
                    ToastAndroid.show("An Error Occured", ToastAndroid.SHORT);
                }
            })
            .catch((e)=>{
                Alert.alert("Network Error", "Error on Submitting Review");
            })
        }
        else{
            ToastAndroid.show("Review Must not Be Empty", ToastAndroid.SHORT);
        }
    }

    //getreviews
    const getReviews = async() =>{
        let body = {
            "action" : "get_reviews",
            "userID" : userID
        }

        axios.post(getReviewsURL, body)
        .then((response) =>{
            if(response.data.message == "success"){
                setReviews(response.data.data)
            }
            else{
                setReviews([]);
            }
        })
        .catch((error) => {
            Alert.alert("NetWork Error: Error on Getting Reviews");
        })
    }

    const deleteReviews = async(id) =>{
        let body = {
            "action" : "delete_reviews",
            "id" : id
        }

        axios.post(deleteReviewsURL, body)
        .then((response) =>{
            if(response.data.message == "success"){
                Alert.alert("Successfully Deleted your Review")
                getReviews();
            }
            else{
                Alert.alert("An Error Ocurred to the Server Try again Later")
            }
        })
        .catch((error) => {
            Alert.alert("NetWork Error: Error on Deleting Reviews");
        })
    }


    const funct = async (hasProfile) => {
        if(hasProfile.hasProfile != "0"){
            const storage = getStorage();
            const imageName = '/'+hasProfile.sex+hasProfile.userID + 'images.jpg';
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

    useEffect(() => {
        // getUser();
        getProfileData();
        getReviews();
        getJobOffered();
    }, []);

    return (
        <View style = {styles.container }>
            <ScrollView  
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled = {true}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
                stickyHeaderIndices = {[1]}
            >
                <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={[styles.text,styles.modalText]}>Give Review</Text>
                                    <Rating
                                        startingValue={rate}
                                        minValue={1}
                                        showRating
                                        onFinishRating={(count)=>{setRate(count)}}
                                        style={{ paddingVertical: 10 }}
                                    />
                                    <TextInput style={{borderBottomColor: '#189AB4' ,borderBottomWidth:1, paddingHorizontal:5, paddingVertical:2,width:200
                                    }}
                                    onChangeText = {(val) => {setReview(val)}}
                                    value= {review}
                                    multiline = {true}
                                    placeholder='Review' placeholderTextColor='#189AB4'
                                    maxLength={30}
                                    />
                                    <View style = {globalStyles.row}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonOpen]}
                                            onPress={() => {createReview(review)}}
                                        >
                                            <Text style={styles.textStyle}>Rate</Text>
                                        </Pressable>
                                        
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                <View style={{backgroundColor:'#fff'}}>
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
                                <Text style = {styles.textName}>{user.firstname} {user.lastname}</Text>
                                <View style = {globalStyles.row}>
                                    <FontAwesome5 name="user" size={18} color="#5B5B5B" />
                                    <Text style = {styles.regText}>
                                    {user.age} years old,  {user.sex}
                                    </Text>
                                </View>
                                <View style = {globalStyles.row}>
                                    <SimpleLineIcons name="location-pin" size={18} color="#5B5B5B" />
                                    <Text style = {styles.regText}>
                                    {user.houseNo} {user.street} {user.baranggay}, {user.municipality} {user.province}
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
                                {user.contact_no}
                            </Text>  
                        </View>
                        <View style = {globalStyles.row}>
                            <MaterialCommunityIcons name="email-outline" size={18} color="#5B5B5B" />
                            <Text style = {styles.regText}>
                                {user.email}
                            </Text>  
                        </View>
                    </View>
                </View>
                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                
                {/* <View style={{flex:1, height: 450}}>
                    <ScrollView
                        nestedScrollEnabled={true}
                    > */}

                        <Text style = {styles.text}>Skills</Text>
                        <View style = {[globalStyles.card, globalStyles.card_default]}>
                            <View style = {[globalStyles.row, {flexWrap:'wrap', justifyContent:'flex-start'}]}>
                                {
                                    (skills.length == 0) && 
                                    <Text style = {styles.textName}> No Skills Displayed</Text>
                                }
                                {
                                skills.map((item, index) => {
                                            return (
                                                <View style={styles.skillContainer} key={index}>
                                                    <Text style={styles.skillText}>
                                                        {item.skillname}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    )
                                }
                            </View>
                        </View>

                        {/* hack */}
                        <View style = {{height : 10}}></View>
                        {/* hack */}
                        <View style = {{flexDirection :'row', justifyContent: 'space-between'}}>
                                <Text style = {styles.text}>Service Reviews</Text>
                                { (appUserID != userID) &&
                                <TouchableOpacity
                                    onPress={ ()=>{
                                        setModalVisible(true)
                                        console.log('Give Review');
                                    }}
                                >
                                    <FontAwesome5 name="plus" size={24} color="#189AB4" />
                                </TouchableOpacity>
                                }
                            </View>
                        <View style={styles.reviewsContainer}>
                            {/* <ScrollView 
                            nestedScrollEnabled = {true}
                            > */}
                                {
                                    (reviews.length > 0) ? 
                                    reviews.map((item, index)=>{
                                        return(
                                            <View style = {[globalStyles.card, globalStyles.card_default]} key={index}>
                                                <View style = {[globalStyles.row, {justifyContent : 'space-between'}]}>
                                                    <Text style={styles.textName}>
                                                        {item.firstname} {item.lastname}
                                                    </Text>
                                                    { (item.giverUserID == appUserID) && 
                                                        <View>
                                                            <TouchableOpacity onPress={()=>{
                                                                deleteReviews(item.reviewID);
                                                            }}>
                                                                <MaterialIcons name="delete" size={24} color="#ed5e68" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                </View>
                                                
                                                <View style = {globalStyles.row}>
                                                {[...Array(parseInt(item.stars))].map((elementInArray, ind) => {
                                                    return(<FontAwesome name="star" size={14} color="#189AB4" key={ind}/>)
                                                    }
                                                )}
                                                </View>
                                                <Text>
                                                    {item.review}
                                                </Text>
                                            </View>
                                        )
                                    })
                                    :
                                    <Text style= {styles.textName}> No Reviews Yet</Text>
                                }
                            {/* </ScrollView> */}
                        </View>

                        {/* hack */}
                        <View style = {{height : 10}}></View>
                        {/* hack */}
                        <Text style = {styles.text}>Job Offered</Text>

                        <View style={styles.reviewsContainer}>
                            {/* <ScrollView
                                nestedScrollEnabled = {true}
                            > */}
                                {
                                    (jobOffered.length == 0) && 
                                    <Text style = {styles.textName}> No Jobs Offered</Text>
                                }
                                {
                                jobOffered.map((item, index) => {
                                            return (
                                            <View style = {[globalStyles.card, globalStyles.card_default]} key={index}>
                                                <Text style={styles.textName}>
                                                    {item.jobTitle}
                                                </Text>
                                                <View style = {globalStyles.row}>
                                                    <MaterialIcons name="attach-money" size={18} color="#5B5B5B" />
                                                    <Text>
                                                        {item.jobPay} Php / Day
                                                    </Text>
                                                </View>
                                                <View style = {globalStyles.row}>
                                                    <MaterialIcons name="location-pin" size={18} color="#5B5B5B" />
                                                    <Text>
                                                        {item.jobLocation}
                                                    </Text>
                                                </View>
                                                <Text style={styles.textName}>
                                                    Description
                                                </Text>
                                                <Text>
                                                    {item.jobDescription}
                                                </Text>
                                                <View style = {styles.edit}>
                                                    <Button color='#189AB4' title='View' onPress={
                                                        ()=>{
                                                            navigation.navigate('ViewJob', {
                                                                data : item,
                                                                userID : appUserID
                                                            });
                                                        }
                                                    }/>
                                                </View>
                                            </View>
                                            )
                                        }
                                    )
                                }
                            {/* </ScrollView> */}
                        </View>
                    {/* </ScrollView>
                </View> */}
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius : 10,
        margin: 5,
    },
    skillText: {
        fontFamily : 'Mont-Bold',
        textTransform : 'capitalize',
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
        textTransform:'capitalize',
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
        // maxHeight : 250,
    },

        //Modal Style

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 10,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        paddingVertical:5,
        paddingHorizontal: 10,
        elevation: 2,
        marginVertical : 10,
        marginHorizontal : 5,
    },
    buttonOpen: {
        backgroundColor: "#189AB4",
    },
    buttonClose: {
        backgroundColor: "#ed5e68",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


export default PublicProfile;