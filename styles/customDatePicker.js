import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function CustomDatePicker(){
    const [date, setDate] = useState ( new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty') ;

    const onChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        setDate(currentDate);
        
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        setText(fDate);
        setShow(false);
        console.log(fDate);
    }

    const showMode = ()=>{
        setShow(true);
    }

    return (
        <View>
            <TouchableOpacity>
                <TextInput placeholder='Birthdate'/>
            </TouchableOpacity>
            <Text>{text}</Text>
            <Button title='pick date' onPress={()=> showMode()}/>

            {show && (
                    <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode= 'date'
                    is24Hour = {true}
                    display = 'default'
                    onChange={onChange}
                    />
            )}
        </View>
    )

}