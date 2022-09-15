import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button, TextInput, RefreshControl, TouchableOpacity, ScrollView, FlatList, ToastAndroid } from 'react-native';
import JobCard from '../components/jobs_card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyle';
import axios from 'axios';
import { api, host, directory } from '../api_link';
import { _getUser } from '../storage_async/async_function';

// console.log(host+directory+api.getJobsURL);
// const getJobsURL = "http://192.168.100.54/pangasimanAPI/rest/api/readapi.php";
const getJobsURL = host + directory + api.getJobsURL;
const createAppliedURL = host + directory + api.createAppliedURL;

const JobFeed = ({ navigation }) => {
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({});
  const [found, setFound] = useState(false);
  const onRefresh = React.useCallback(() => {
    console.log(search);
    getJobs(search);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message + ", Saved to the  Applied Jobs!", ToastAndroid.SHORT);
  };

  const applyJob = async (jobID, userID)=>{
    let body = {
      "action" : "create_applied",
      "appliedJobsID": jobID,
      "applicantUserID": user.userID
    }

    await axios.post(createAppliedURL, body)
    .then((response) =>{
      if(response.data.message == "Success") {
        showToast(response.data.message);
        getJobs(search);
      }
      else{
        console.log(response.data.message);
        ToastAndroid.show("Error, Try Again Later!", ToastAndroid.SHORT);
      }
    })
    .catch((error) => {
      Alert.alert("Network Error", error);
    })
  }

  const getJobs = async (searchWord) => {
    const userData = await _getUser();
    if (userData !== null) {
      setUser(userData);
    }
    else {
      console.log('no user')
      setUser({});
    }

    let data_actions = {
      "action": "get_jobs",
      "search_word": searchWord,
      "userID": userData.userID
    }

    await axios.post(getJobsURL, data_actions)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.message == "success") {
          setJobs(response.data.data);
          setFound(false);
        }
        else {
          setJobs(response.data.data);
          setFound(true);
        }
      })
      .catch((e) => {
        console.log("Error getting Jobs : " + e);
      })
  }

  useEffect(() => {
    getJobs(search);

    const unsubscribe = navigation.addListener('focus', () => {
      getJobs(search);
    });

  // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [])


  const [jobs, setJobs] = useState(
    [
      {
        jobID: 1,
        jobName: 'Home Cleaning Service',
        jobPay: '500',
        jobLocation: 'Dagupan City Pangasinan',
        jobDescription: 'Needs urgent home cleaning because a visitor will arrive tomorrow. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        jobEmp: 'Dave Charm',
      },
    ]
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.row}>
        <TouchableOpacity onPress={() => getJobs(search)}>
          <MaterialCommunityIcons name="briefcase-search" size={30} color="#189AB4" />
        </TouchableOpacity>
        <TextInput placeholder='Search Job' style={styles.searchBox}
          onChangeText={(val) => {
            setSearch(val)
            getJobs(search);
          }}
          onBlur={
            () => { getJobs(search) }
          }
          onChange={
            (val) => {
              setSearch(val)
              getJobs(search);
            }
          }
        />
      </View>
      <Text style={styles.text}>Jobs for you</Text>
      {
        found && <Text>No Jobs Found</Text>
      }
      <View style= {{flex:1}}>
        <FlatList
          data={jobs}
          maxToRenderPerBatch={2}
          renderItem={({ item }) => {
            return (
              <JobCard item={item} navigation={navigation} apply = {applyJob} passedID = {user.userID} />
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          ListHeaderComponent={() => <View style={{ height: 10 }} />}
        />
        {/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          {
            jobs.map((item, index) => {return(
            <View key = {index}>
              <View style={{ height: 10 }} />
              <JobCard item={item} navigation={navigation} />
              <View style={{ height: 15 }} />
            </View>
            )})
          }
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
  },
  searchBox: {
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#189AB4',
    flex: 1,
  }
});

export default JobFeed;