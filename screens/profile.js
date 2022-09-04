import React, { useEffect, useState} from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button } from 'react-native';
import { _getUser } from '../storage_async/async_function';


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
        <View>
            <Text>
                PROFILE NAME {user.firstname}
                PROFILE AGE {user.age}
            </Text>
        </View>
    )
}


export default Profile;