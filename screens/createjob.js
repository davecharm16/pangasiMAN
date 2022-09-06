import React from "react";
import { View, Text, StyleSheet, TextInput, Button} from "react-native";
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const CreateJob = () =>{
    return (
        <View style={{flex: 1, backgroundColor : '#fff'}}>
            <KeyboardAwareScrollView>
                <View style = {styles.cardContainer}>
                    <Text style = {styles.text}>Create New Job Offer</Text>
                    <View style ={[globalStyles.card, styles.card]} >
                        <View style={styles.row}>
                            <TextInput placeholder="Job Title" style = {[globalStyles.card, styles.inputCard]}/>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="attach-money" size={24} color="#5B5B5B" />
                            <TextInput placeholder="Pay 0.00" keyboardType="numeric" style = {[globalStyles.card, styles.inputCard]}/>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="location-pin" size={24} color="#5B5B5B" />
                            <TextInput placeholder="Job Location" style = {[globalStyles.card, styles.inputCard]}/>
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
                            <TextInput placeholder="Description" style = {[globalStyles.card, styles.inputCard]} multiline={true}/>
                        </View>
                    </View>
                    <View style = {styles.btnContainer}>
                        <Button title="CREATE" color='#189AB4'/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
        paddingVertical : 10,
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
        marginBottom : 20,
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
export default CreateJob;