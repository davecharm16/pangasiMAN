import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
    container :{
        flex: 1,
    },

    dropShadow : {
        shadowColor : '#000',
        shadowOffset : {
            width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },

    card : {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
    }
});