import React from 'react';
import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import SignUpForm from '../forms/signup_form';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = ({navigation}) =>{


    return (
        <KeyboardAwareScrollView>
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
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
    },
    signupContainer : {
        backgroundColor : '#05445E',
    }
})

export default SignUp;