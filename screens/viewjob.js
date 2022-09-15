import React , {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import { globalStyles } from '../styles/globalStyle';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from "formik";
import * as yup from 'yup';
import { _getUser } from "../storage_async/async_function";
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { api, host, directory } from '../api_link';



// const readCommentsURL = 'http://192.168.100.54/pangasimanAPI/rest/api/readapi.php';
const readCommentsURL = host+directory+api.readCommentsURL;
// const createCommentURL = 'http://192.168.100.54/pangasimanAPI/rest/api/createapi.php';
const createCommentURL = host+directory+api.createCommentURL;
// const deleteCommentURL = 'http://192.168.100.54/pangasimanAPI/rest/api/deleteapi.php';
const deleteCommentURL = host+directory+api.deleteCommentURL;

const readApplicantsURL = host+directory+api.readApplicantsURL;



const ViewJob = ({navigation, route}) =>{

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        // console.log(search);
        getUser();
        getComments();
        getApplicants();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const deleteAlert = (id) =>
    Alert.alert(
    "Warning!",
    "Do you want to delete this Comment?",
    [
      {
        text: "Yes",
        onPress: () => deleteComment(id),
        style: "cancel",
      },
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
    );

    const timePosted=(time)=>{
        return moment(time).fromNow();
    }

    const [data, setData] = useState(route.params.data);
    // const {data} = route.params;
    const {userID} = route.params;
    console.log(data);
    const[user, setUser] = useState(null);
    const [foundComment, setFoundComment] = useState(false);
    const[comment, setComment] = useState([]);
    const[commentText, setCommentText] = useState('');
    const [applicants, setApplicants] = useState([]);
    //getting the user to attach the userID to the creation of JOB
    const getUser = async ()=>{
        const userData = await _getUser();
        if( userData !== null){
            setUser(userData);
        }
        else{
            console.log('no user')
            setUser(null);
        }
    }

    const callBackData = (data)=>{
        setData(data);
    }

    //Submit the data through axios
    const getComments = async () => {
        console.log(data.jobID);
        let body = {
            "action" : "get_comments",
            "jobID" : data.jobID
        }

        await axios.post(readCommentsURL, body)
        .then((response) => {
            if(response.data.message=="success"){
                setComment(response.data.data);
                console.log(response.data.data);
                setFoundComment(true);
            }
            else{
                setFoundComment(false);
            }
        })
        .catch((error) => {
            console.log("Error in Comments " + error);
        })
    }

    const submitComment = async (comment) =>{
        if(comment.length > 0){
            const userData = await _getUser();
            let body = {
                "action" : "create_comment",
                "commentsUserID": userData.userID,
                "commentsJobID": data.jobID,
                "comment": comment
            }

            await axios.post(createCommentURL, body)
            .then((response) => {
                if(response.data.message == "Success"){
                    let res_description = response.data.description;
                    Alert.alert(res_description);
                    setCommentText('');
                    getComments();
                }
                else{
                    Alert.alert("Error in Submitting Your Comment, Try Again Later");
                }
            })
            .catch((error) => {
                console.log("Create Comment Error : " + error);
            })
        }
        else{
            Alert.alert("Comments can't be empty");
        }
    }

    const deleteComment = async(id)=>{
        let body = {
            "action" : "delete_comment",
            "id": id
        }

        await axios.post(deleteCommentURL, body)
        .then((response) => {
            Alert.alert(response.data);
            getComments();
        })
        .catch((error) => {
            Alert.alert("Error", "Network Error, Try Again Later");
        })
    }

    const getApplicants = async() =>{
        let body = {
            "action" : "get_applicants",
            "jobID": data.jobID
        }

        await axios.post(readApplicantsURL, body)
        .then((response) => {
            if(response.data.message=="success"){
                setApplicants(response.data.data);
            }
        })
        .catch((error) => {
            Alert.alert("Error in getting Applicants " + error);
        })
    }


    useEffect(() => {
        getUser();
        getComments();
        getApplicants();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor : '#fff'}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
            >
                <View style = {styles.cardContainer}>
                    <Text style = {styles.text}>Job Offer</Text>
                    <View style ={[globalStyles.card, styles.card]}>
                        <TouchableOpacity>
                            <View style = {styles.row}>
                                <FontAwesome name="user-circle" size={24} color="black" />
                                <View style={{width: 10}}></View>
                                <Text style = {styles.cardText}>
                                {data.firstname} {data.lastname}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.row}>
                            <FontAwesome5 name="business-time" size={24} color="black" />
                            <Text style={[styles.cardTextRegular, {fontSize:14}]}>  Posted {timePosted(data.created_at)}</Text>
                        </View>
                        <View style = {styles.row}>
                            <Text style = {{
                            fontFamily : 'Mont-Bold',
                            fontSize : 14,
                             }}>Status</Text>
                            <Text style={[styles.cardText, {fontSize:14, color:'#189AB4'}]}> {(data.status == "0" )? " Open" : " Done"}</Text>
                        </View>
                    </View>
                    <View style ={[globalStyles.card, styles.card]} >
                        <View style={styles.row}>
                            <Octicons name="briefcase" size={24} color="black" />
                            <Text style = {[styles.cardText]}> {data.jobTitle} </Text>
                        </View>
                        
                        <View style={styles.row}>
                            <MaterialIcons name="attach-money" size={24} color="#5B5B5B" />
                            <Text style={[styles.cardText,styles.grayText]}> {data.jobPay} Php</Text>
                        </View>
                        
                        <View style={styles.row}>
                            <MaterialIcons name="location-pin" size={24} color="#5B5B5B" />
                            <Text style={[styles.cardText,styles.grayText]}> {data.jobLocation} </Text>
                        </View>
                    </View>


                    <View style ={[globalStyles.card, styles.card]} >
                        <Text style = {{
                            fontFamily : 'Mont-Bold',
                            fontSize : 14,
                        }}>
                            Description
                        </Text>
                        <View style={styles.row}>
                            <Text style = {[styles.description, {fontFamily:'Inter-Regular', color:'#189AB4'}]}> {data.jobDescription}</Text>
                        </View>
                    </View>

                    {
                        //Only Show  to the Creator
                        (data.jobUserID == userID) &&
                        <View style ={[globalStyles.card, styles.card, {height: 120}]} >
                            <View style={styles.row}>
                                <MaterialCommunityIcons name="briefcase-eye" size={24} color="black" />
                                <Text style = {[styles.cardText]}> Applicants {(applicants.length != 0) ? ": " + applicants.length : "" }</Text>
                            </View>
                            <View style={{flex:1}}>
                                <ScrollView
                                    nestedScrollEnabled = {true}
                                >
                            {
                                (applicants.length == 0) &&
                                <Text>None at the moment</Text>
                            }
                            {
                                applicants.map((item, index)=>{
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    navigation.navigate('PublicProfile', {
                                                        userID : item.userID,
                                                        appUserID : userID,
                                                    });
                                                }}
                                            >
                                                <View style = {styles.row}>
                                                    <FontAwesome name="user-circle" size={24} color="black" />
                                                    <View style={{width: 10}}></View>
                                                    <Text style = {styles.cardText}>
                                                    {item.firstname} {item.lastname}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                                </ScrollView>
                            </View>
                        </View>
                    }
                    {
                    (data.jobUserID == userID) &&
                    <View style ={[globalStyles.card, styles.card]} >
                        <View style={[globalStyles.row, {justifyContent: 'space-between'}]}>
                            <Button title="Edit" color={''}
                                    onPress = {()=>{
                                        navigation.navigate('EditJob',
                                            {
                                                jobData : data,
                                                userID : userID,
                                                callBack : callBackData
                                            }
                                        )
                                    }}
                            />
                            <Button title="Mark Done" color={"#189AB4"}/>
                            {/* <Button title="Delete" color={'#ed5e68'}/> */}
                        </View>
                    </View>
                    }
                    <Text style = {[styles.text, {textTransform : 'none'}]}>Post an Inquiry</Text>
                    <View style ={[globalStyles.card, styles.card]} >
                        <TextInput placeholder="Comment" multiline={true}
                            value = {commentText}
                            onChangeText = {(text) => {setCommentText(text)}}
                        />
                        <View style = {{ marginTop: 10}}>
                            <Button title="Post" color= '#189AB4' onPress={
                                ()=>{
                                    submitComment(commentText);
                                }
                            }/>
                        </View>
                    </View>
                    <Text style = {[styles.text, {textTransform : 'none'}]}>Inquiries</Text>
                    <View style = {{height: 20}}></View>
                    {!foundComment &&
                        <Text style = {styles.cardText}>No Inquiries Yet</Text>
                    }
                    { foundComment && comment.map((item, index) => {
                            return (
                                <View style ={[globalStyles.card,styles.card, {backgroundColor:'#fff', borderRadius: 4}]} key= {index} >
                                    <View style = {[styles.row,{justifyContent:"space-between"}]}>
                                        <TouchableOpacity>
                                            <View style={{flexDirection: 'row'}}>
                                                <FontAwesome name="user-circle" size={24} color="black" />
                                                <View style={{width: 10}}></View>
                                                <Text style = {styles.cardText}>
                                                {item.firstname} {item.lastname}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {(item.commentsUserID == user.userID) &&
                                        <View>
                                            <TouchableOpacity onPress={()=>{deleteAlert(item.commentsID)}}>
                                                <MaterialIcons name="delete" size={24} color="#ed5e68" />
                                            </TouchableOpacity>
                                        </View>
                                        }
                                    </View>
                                <View style = {styles.row}>
                                    <Ionicons name="time-outline" size={24} color="black" />
                                    <Text style={[styles.cardTextRegular, {fontSize:14}]}> {timePosted(item.created_at)}</Text>
                                </View>
                                <Text style={{fontFamily:'Inter-Regular', color: '#189AB4'}}>{item.comment}</Text>
                            </View>
                        )
                    })}

                </View>
            </ScrollView>
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
        paddingVertical : 15,
        marginTop : 10,
        marginBottom: 20,
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
        // marginBottom : 10,
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
export default ViewJob;