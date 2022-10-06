import React from 'react';
import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image} from 'react-native';
import { globalStyles } from '../styles/globalStyle';

const DevList = [
    {
        name : 'Bulaquena, Dave Charm B.',
        role : 'Lead Developer',
        image : require('../assets/image_assets/dev_images/BULAQUENA.webp')
    },
    {
        name : 'Tibegar, Rogena Sefin',
        role : 'Co-Developer',
        image : require('../assets/image_assets/dev_images/TIBEGAR.webp')
    }
    ,
    {
        name : 'Amado, Ellen Nicole',
        role : 'UI/UX Designer',
        image : require('../assets/image_assets/dev_images/AMADO.jpg')
    }
    ,
    {
        name : 'Carlos, Gabriel',
        role : 'Researcher',
        image : require('../assets/image_assets/dev_images/CARLOS.webp')
    }
    ,
    {
        name : 'Valencia, Liezl',
        role : 'Researcher',
        image : require('../assets/image_assets/dev_images/VALENCIA.webp')
    }
];

const AboutApp = ()=>{
    return (
        <View style= {styles.container}>
            <ScrollView
                showsVerticalScrollIndicator ={false}
            >
                <Image source={require('../assets/image_assets/pangasiman logovar1.png')} style={{width: 100, height: 100, borderRadius : 100, marginVertical: 10, alignSelf: 'center'}}/>
                <Text style = {styles.headText}>PangasiMAN</Text>
                <View style = {[globalStyles.card, globalStyles.card_default, {paddingHorizontal: 30}]}>
                    <Text style ={styles.head2Text}>
                        About the App
                    </Text>
                    <Text style= {styles.textNormal}>
                    {'\t'}This project is a service booking system on a mobile platform specifically designed to connect users with local service providers such as electricians, cleaners, drivers, etc. Our project aims to connect tradespeople to those who need them. Our project also aims to assist homeowners who are looking for help with tasks that they cannot handle on their own. 
                    </Text>
                </View>
                <Text style = {styles.headText}>Developers</Text>

                {
                    DevList.map((dev, index) => {
                        return(
                            <View style={styles.DevView} key={index}>
                                <Image source={dev.image} style = {styles.imageHolder}/>
                                <Text style={[styles.devDesc]}>{dev.name}</Text>
                                <Text style={[styles.devDesc, {fontFamily:'Mont-Regular'}]}>{dev.role}</Text>
                            </View>
                        )
                    })
                }
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    'container' : {
        flex: 1,
        alignItems : 'center',
        paddingHorizontal: 10,
    },
    'headText' : {
        fontFamily : 'Inter-Bold',
        color : '#05445E',
        alignSelf: 'center',
        fontSize: 24,
        marginVertical: 10,
    },
    'head2Text' : {
        fontFamily : 'Inter-Bold',
        color : '#05445E',
        fontSize: 16,
        marginVertical: 10,
    },
    'textNormal' : {
        lineHeight: 25,
        fontSize : 14,
        textAlign : 'justify'
    },
    'DevView' : {
        marginVertical: 10,
        alignItems:'center'
    },
    'imageHolder' : {
        height : 120,
        width : 120,
        borderRadius: 120,
        borderWidth: 7,
        borderColor : '#189AB4',
        marginRight : 10,
    },
    'devDesc' : {
        color: '#05445E',
        fontFamily : 'Mont-Bold'
    }
})
export default AboutApp;