import React, { useEffect, useState} from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Button, TextInput, RefreshControl, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import JobCard from '../components/jobs_card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyle';
import axios from 'axios';

const getJobsURL = "http://192.168.100.54/pangasimanAPI/rest/api/readapi.php"
const JobFeed = ({navigation}) =>{
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState('');
    const [found, setFound] = useState(false);
    const onRefresh = React.useCallback(() => {
      console.log(search);
      getJobs(search);
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const getJobs = async (searchWord) =>{
      let data_actions = {
        "action" : "get_jobs",
        "search_word" : searchWord
      }

      await axios.post(getJobsURL, data_actions)
      .then((response)=>{
        console.log(response.data.data);
        if(response.data.message == "success"){
          setJobs(response.data.data);
          setFound(false);
        }
        else{
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
    }, [])


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
          <View style={globalStyles.row}>
            <TouchableOpacity onPress={()=>getJobs(search)}>
            <MaterialCommunityIcons name="briefcase-search" size={24} color="#189AB4" />
            </TouchableOpacity>
            <TextInput placeholder='Search Job' style = {styles.searchBox}
              onChangeText = {(val)=> {
                setSearch(val)
                getJobs(search);
              }}
              onBlur = {
                ()=>{getJobs(search)}
              }
              onChange={
                (val)=> {
                  setSearch(val)
                  getJobs(search);
                }
              }
            />
          </View>
          <Text style={styles.text}>Jobs near you</Text>
          {
            found && <Text>No Jobs Found</Text>
          }
          <FlatList
            data={jobs}
            maxToRenderPerBatch = {2}
            renderItem = {({item})=>{
              return(
                <JobCard item = {item} navigation = {navigation}/>
              )
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            ItemSeparatorComponent={() => <View style={{ height: 45 }} />}
            ListHeaderComponent ={ () => <View style={{ height: 25 }} /> }
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
    },
    searchBox :{
      marginHorizontal: 15,
      paddingVertical : 10,
      borderBottomWidth:1,
      borderBottomColor: '#189AB4',
      flex:1,
    }
  });

export default JobFeed;