import React from 'react';
import { StyleSheet, Text, Touchable, TouchableWithoutFeedback, View, Keyboard} from 'react-native';
import LoginForm from '../forms/login_form';
import CustomButton from '../styles/customButton';
import { globalStyles } from '../styles/globalStyle';


const Login = ({ navigation })=>{


    function onPressSignUp() {
        navigation.navigate('Signup');
    }

    return(
        <TouchableWithoutFeedback onPress={
            //Disable Keyboard when Click outside Form
            ()=>(Keyboard.dismiss())
        }>
            <View style = {[globalStyles.container, styles.loginContainer]}>
                <View>
                    <Text style = {{fontFamily : 'Inter-Bold', fontSize : 40, color : '#fff'}}>
                        {/* TODO: to be replaced by LOGO- Change Style to Image */}
                        PangasiMAN
                    </Text>
                    <Text style = {styles.h_text}> The Man for the Job</Text>
                </View>
                <View style={styles.formContainer}>
                    {/* TODO : Forms Login  */}
                    <LoginForm navigation={navigation}/>

                    <Text style ={{alignSelf : 'center', color : '#fff', fontFamily : 'Inter-Bold', fontSize : 13,}}> or 
                    </Text>

                    <CustomButton 
                    onPress={() => {
                        onPressSignUp()
                    }} 
                    title='Sign Up' styleButton={styles.signButton} styleText={styles.signText}/>

                    <CustomButton onPress={()=>{}} title={'Forgot Password?'} styleButton={undefined} styleText={{color: '#fff',textTransform:'capitalize'}} />
                    
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    loginContainer : {
        backgroundColor : '#05445E',
        alignItems : 'center',
        justifyContent: 'space-evenly',
    },
    h_text : {
        fontFamily : 'Inter-Bold',
        color : '#fff',
        alignSelf : 'center'
    },
    formContainer :{
        paddingHorizontal: 40,
        alignSelf: 'stretch',
    },
    signButton : {
        backgroundColor : '#75E6DA',
        paddingVertical: 10,
        marginVertical: 10,
    },
    signText :{
        color : '#05445E',
        fontFamily : 'Inter-Bold',
    }
});


export default Login;

