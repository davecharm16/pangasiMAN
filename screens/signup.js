import React from 'react';
import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import SignUpForm from '../forms/signup_form';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';

const SignUp = ({navigation}) =>{


    return (
        <TouchableWithoutFeedback 
        onPress={
            //Disable Keyboard when Click outside Form
            ()=>(Keyboard.dismiss())
        }>
            <ScrollView>
                <View style = {[globalStyles.container, styles.signupContainer]}>
                    <SignUpForm/>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    signupContainer : {
        backgroundColor : '#05445E',
    }
})

export default SignUp;