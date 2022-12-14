import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Pressable, ScrollView, ActivityIndicator, Image, RefreshControl, Modal, Alert } from 'react-native';
import { _getUser } from '../storage_async/async_function';
import { globalStyles } from '../styles/globalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
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
import { TextInput } from 'react-native-gesture-handler';


initializeApp(fireBaseConfig);

const Profile = (props) => {

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

    // const readProfileURL = "http://192.168.100.54/pangasimanAPI/rest/api/readapi.php";
    const readProfileURL = host + directory + api.readProfileURL;
    const readSkillsURL = host + directory + api.readSkillsURL;
    const createSkillsURL = host + directory + api.createSkillsURL;
    const deleteSkillsURL = host + directory + api.deleteSkillsURL;
    const getReviewsURL = host + directory + api.getReviewsURL;
    const getJobOfferedURL = host + directory + api.getJobOfferedURL;
    const deleteJobURL = host + directory + api.deleteJobURL;



    const [user, setUser] = useState('');
    const [url, setUrl] = useState();
    const [skills, setSkills] = useState([]);
    const [skillCreate, setSkillCreate] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobOffered, setJobOffered] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
    //
    const getJobOffered = async(userID) =>{
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

    //getreviews
    const getReviews = async(userID) =>{
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

    const getProfileData = async () => {
        const userData = await _getUser();
        if (userData !== null) {
            setUser(userData);
        }
        else {
            console.log('no user')
            setUser('');
        }

        let data = {
            "action": "get_profile",
            "userID": userData.userID,
        }

        await axios.post(readProfileURL, data)
            .then((response) => {
                console.log(response.data.data[0]);
                let result = response.data.data[0];
                setProfileData(response.data.data[0]);
                funct(response.data.data[0]);
                getSkills(result.userID);
                getReviews(result.userID);
                getJobOffered(result.userID);
                setLoading(false);
            })
            .catch((e) => {
                console.log("Error on Getting Profile Data" + e);
            })
    }

    const createSkill = async () => {
        if(skillCreate.length > 0){
            let data = {
                "action" : "create_skill",
                "skillname" : skillCreate,
                "userID": profileData.userID
            }
    
            await axios.post(createSkillsURL, data)
                .then((response) => {
                    Alert.alert(response.data.description);
                    getSkills(profileData.userID);
                    setSkillCreate('');
                })
                .catch((e) => {
                    console.log("Error on Creating Skills Data" + e);
                })
        }
        else{
            Alert.alert("Skill Name can't be empty");
        }
        
    }

    const funct = async (hasProfile) => {
        if (hasProfile.hasProfile != "0") {
            const storage = getStorage();
            const imageName = '/' + hasProfile.sex + hasProfile.userID + 'images.jpg';
            console.log(imageName);
            const reference = ref(storage, imageName);
            await getDownloadURL(reference).then((x) => {
                console.log(x);
                setUrl(x);
            })
        }
        else {
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

    const deleteSkill = async(id) =>{
        let body = {
            "action" : "delete_skill",
            "id": id
        }
        await axios.post(deleteSkillsURL,body)
        .then((response) =>{
            if(response.data.message == 'success'){
                getProfileData();
            }
            else{
                Alert.alert(response.data);
            }
        })
        .catch((error) => {
            console.log("Error on Deleting Skill",error);
        })
    }

    const deleteJob =  async (id) => {
        let body = {
            "action" : "delete_job",
            "id" : id
        }
        await axios.post(deleteJobURL, body)
        .then((response)=>{
            if(response.data.message == "success"){
                Alert.alert("Success", "Job is Deleted");
                getProfileData();
            }
            else{
                Alert.alert("Network Error", "Try Deleting Again Later");
            }
        })
        .catch((e)=>{
            Alert.alert("Network Error", "Try Deleting Again Later");
        })
    }

    const deleteJobAlert = (id) =>
    Alert.alert(
    "Warning!",
    "Do you want to delete this Job?",
    [
      {
        text: "Yes",
        onPress: () => deleteJob(id),
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
        console.log(
          "This alert was dismissed by tapping outside of the alert dialog."
        )
    }
    );


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
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator size="large" color="#189AB4" ></ActivityIndicator>
                :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    stickyHeaderIndices={[1]}
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
                                    <Text style={[styles.text,styles.modalText]}>Create Skill</Text>
                                    <TextInput style={{borderBottomColor: '#189AB4' ,borderBottomWidth:1, paddingHorizontal:5, paddingVertical:2,width:200
                                    }}
                                    value = {skillCreate}
                                    onChangeText = {(val)=>{setSkillCreate(val)}}
                                    multiline = {true}
                                    placeholder='Skill Name' placeholderTextColor='#189AB4'
                                    maxLength={15}
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
                                            onPress={() => {createSkill()}}
                                        >
                                            <Text style={styles.textStyle}>Create</Text>
                                        </Pressable>
                                        
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{backgroundColor:'#fff'}}>
                        <Text style={styles.text}>Personal Information</Text>
                        <View style={[globalStyles.card, globalStyles.card_default]}>
                            <View style={styles.innerContainer}>
                                <View style={styles.image_profile}>
                                    <Image
                                        style=
                                        {{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 100,
                                        }}
                                        source={{ uri: url }}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textName}>{profileData.firstname} {profileData.lastname}</Text>
                                    <View style={globalStyles.row}>
                                        <FontAwesome5 name="user" size={18} color="#5B5B5B" />
                                        <Text style={styles.regText}>
                                            {user.age} years old, {user.sex}
                                        </Text>
                                    </View>
                                    <View style={[globalStyles.row, {
                                        paddingVertical: 2,
                                        alignItems: 'flex-start',
                                    }]}>
                                        <SimpleLineIcons name="location-pin" size={18} color="#5B5B5B" />
                                        <Text style={styles.regText}>
                                            {profileData.houseNo} {profileData.street} {profileData.baranggay}, {profileData.municipality} {profileData.province}
                                        </Text>
                                    </View>
                                    <View style={styles.edit}>
                                        <TouchableOpacity
                                            onPress={
                                                // navigation.navigate('PublicProfile')
                                                () => {
                                                    console.log('EditPressed')
                                                    props.navigation.navigate('EditProfile', {
                                                        data: profileData
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
                        <View style={{ height: 10 }}></View>
                        {/* hack */}
                        <View style={[globalStyles.card, globalStyles.card_default]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.textName}> Contact Information</Text>
                            </View>
                            <View style={globalStyles.row}>
                                <AntDesign name="phone" size={18} color="#5B5B5B" />
                                <Text style={styles.regText}>
                                    {profileData.contact_no}
                                </Text>
                            </View>
                            <View style={globalStyles.row}>
                                <MaterialCommunityIcons name="email-outline" size={18} color="#5B5B5B" />
                                <Text style={styles.regText}>
                                    {profileData.email}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* hack */}
                    <View style={{ height: 10 }}></View>
                    {/* hack */}
                
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
                        <Text style={styles.text}>Skills</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FontAwesome5 name="plus" size={24} color="#189AB4" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.card, globalStyles.card_default]}>
                        <View style={[globalStyles.row, {flexWrap:'wrap', justifyContent:'flex-start'}]}>
                            {
                                (skills.length == 0) && 
                                <Text style = {styles.textName}>Add your Skills Here</Text>
                            }
                            {
                                skills.map((item, index) => {
                                    return (
                                        <View style={styles.skillContainer} key={index}>
                                            <Text style={styles.skillText}>
                                                {item.skillname}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={()=>{deleteSkill(item.skillsID)}}
                                            >
                                                <Feather name="x-circle" size={18} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                            {/* <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Plumbing
                            </Text>  
                            <TouchableOpacity>
                                <Feather name="x-circle" size={18} color="white" />
                            </TouchableOpacity>
                        </View> */}
                        </View>
                    </View>

                    {/* hack */}
                    <View style={{ height: 10 }}></View>
                    {/* hack */}
                    <Text style={styles.text}>Service Reviews</Text>

                    <View style={styles.reviewsContainer}>
                        {/* <ScrollView
                            nestedScrollEnabled={true}
                        > */}
                        {
                            (reviews.length > 0) ? 
                            reviews.map((item, index)=>{
                                return(
                                    <View style = {[globalStyles.card, globalStyles.card_default]} key={index}>
                                        <Text style={styles.textName}>
                                            {item.firstname} {item.lastname}
                                        </Text>
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
                    <View style={{ height: 10 }}></View>
                    {/* hack */}
                    <Text style={styles.text}>Job Offered</Text>

                    <View style={styles.reviewsContainer}>
                        {/* <ScrollView
                            nestedScrollEnabled={true}
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
                                                    props.navigation.navigate('ViewJob', {
                                                        data : item,
                                                        userID : profileData.userID
                                                    });
                                                }
                                            }/>
                                            <View style={{width:10}}></View>
                                            <Button color='#ed5e68' title='Delete' onPress={()=>{
                                                // console.log(item.jobID);
                                                deleteJobAlert(item.jobID);
                                            }}/>
                                        </View>
                                    </View>
                                    )
                                }
                            )
                        }
                        {/* </ScrollView> */}
                    
                    </View>
                </ScrollView>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    skillContainer: {
        flexDirection: 'row',
        backgroundColor: '#189AB4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        margin: 5,
    },
    skillText: {
        fontFamily: 'Mont-Bold',
        textTransform:'capitalize',
        marginRight: 5,
        color: '#fff'
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Inter-Regular',
        marginBottom: 20,
        color: '#05445E',
        textTransform: 'uppercase',
    },
    innerContainer: {
        flexDirection: 'row',
    },
    image_profile: {
        height: 120,
        width: 120,
        borderRadius: 120,
        borderWidth: 7,
        borderColor: '#189AB4',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    textName: {
        fontFamily: 'Mont-Bold',
        fontSize: 14,
        marginVertical: 5,
        textTransform : 'capitalize',
    },
    regText: {
        fontFamily: 'Mont-Regular',
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    edit: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    reviewsContainer: {
        // maxHeight: 250,
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


export default Profile;