import AsyncStorage from '@react-native-async-storage/async-storage';



const _getSignedIn = async ()=> {
    try {
        const jsonValue = await AsyncStorage.getItem('loggedIn')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log("ERROR GETTING THE DATA LOGGED IN")
    }
}

const _setLogOut = async ()=>{
    try {
        await AsyncStorage.setItem(
          'loggedIn',
          'false'
        );
    } 
    catch (error) {
        // Error saving data
        console.log("Error saving data login : "+error);
    }
}

const _setUser = async (data)=>{
    try {
        await AsyncStorage.setItem(
            'user',
            data
        );
    } 
    catch (error) {
        // Error saving data
        console.log("Error saving data login : "+error);
    }
}

const _getUser = async ()=> {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log("ERROR GETTING THE DATA LOGGED IN")
    }
}

export { _getSignedIn, _setLogOut, _setUser, _getUser }