import React, { useEffect, useState} from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import JobCard from '../components/jobs_card';


const JobFeed = ({navigation}) =>{
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
                <JobCard item = {item} navigation = {navigation}/>
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
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor : '#ffffff'
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily : 'Roboto-Regular',
      marginBottom : 20,
    }
});

export default JobFeed;