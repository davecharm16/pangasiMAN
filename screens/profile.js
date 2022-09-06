import React, { useEffect, useState} from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button } from 'react-native';
import { _getUser } from '../storage_async/async_function';
import { globalStyles } from '../styles/globalStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const Profile = ()=>{

    const[user, setUser] = useState('');

    const getUser = async ()=>{
        const userData = await _getUser();
        if( userData !== null){
            setUser(userData);
        }
        else{
            console.log('no user')
            setUser('');
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View style = {styles.container }>
            <ScrollView>
                <Text style = {styles.text}>Personal Information</Text>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style={styles.innerContainer}>
                        <View style = {styles.image_profile}>

                        </View>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.textName}>{user.firstname} {user.lastname}</Text>
                            <View style = {globalStyles.row}>
                                <FontAwesome5 name="user" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                    {user.age} years old, {user.sex}
                                </Text>  
                            </View>
                            <View style = {globalStyles.row}>
                                <SimpleLineIcons name="location-pin" size={18} color="#5B5B5B" />
                                <Text style = {styles.regText}>
                                    #452 Talospatang, Malasiqui, Pangasinan
                                </Text>  
                            </View>
                            <View style = {styles.edit}>
                                <TouchableOpacity>
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

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <Text style = {styles.text}>Skills</Text>
                <View style = {[globalStyles.card, globalStyles.card_default]}>
                    <View style = {styles.edit}>
                        <TouchableOpacity>
                            <FontAwesome5 name="plus" size={24} color="#189AB4" />
                        </TouchableOpacity>
                    </View>
                    <View style = {globalStyles.row}>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Cooking
                            </Text>  
                            <Feather name="x-circle" size={18} color="white" />
                        </View>
                        <View style={styles.skillContainer}>
                            <Text style = {styles.skillText}>
                                Plumbing
                            </Text>  
                            <Feather name="x-circle" size={18} color="white" />
                        </View>
                    </View>
                </View>

                {/* hack */}
                <View style = {{height : 10}}></View>
                {/* hack */}
                <Text style = {styles.text}>Service Reviews</Text>
                <View>
                    
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
        flexDirection : 'row',
        alignSelf : 'flex-end',
    }
});


export default Profile;