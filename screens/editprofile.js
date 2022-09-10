import React, { useEffect, useState} from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import fireBaseConfig from '../fireBaseConfig';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

initializeApp(fireBaseConfig);


const EditProfile = ({route, navigation}) => {
    const {data} = route.params;
    const [image, setImage] = useState('');



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            // uploadImage(result.uri);
            // setImage(result.uri);
            uploadImage(result.uri)
            .then(()=>{
                Alert.alert('Image is uploaded');
            })
        }
    };

    const uploadImage = async (uri) => {
        console.log('image is uploaded');
        const imageName = data.firstname+data.userID + 'images.jpg';
        const storage = getStorage();
        // Create a child reference
        const imagesRef = ref(storage, imageName);
        // imagesRef now points to 'images'
        const img = await fetch(uri);
        const bytes = await img.blob();

        await uploadBytes(imagesRef, bytes);
    }
  

    return (
        <View style={styles.container}>
            <Text> Test Upload Image</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : '#fff',
    }
});


export default EditProfile;