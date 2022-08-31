import React, { useEffect, useState} from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import JobCard from '../components/jobs_card';


const JobFeed = ({navigation}) =>{
    //BackPress Remove for Logging Out
    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    
    useEffect(
        () => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }
        //add another here later
    ,[]);

    const [jobs, setJobs] = useState(
    [
      {
        jobID : 1, 
        jobName : 'Home Cleaning Service',
        jobPay : '500',
        jobLocation : 'Dagupan City Pangasinan',
        jobDescription : 'Needs urgent home cleaning because a visitor will arrive tomorrow. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        jobEmp : 'Dave Charm',
      },
    ]
    );
    
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Jobs near you</Text>

          <FlatList
            data={jobs}
            renderItem = {({item})=>{
              return(
                <JobCard item = {item}/>
              )
            }}
          />
          {/* log out button */}
          {/* <Button title='Test Logout' onPress={()=>{
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
            }
          }/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily : 'Roboto-Regular',
      marginBottom : 20,
    }
});

export default JobFeed;