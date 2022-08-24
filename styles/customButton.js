import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = ({ onPress, title, styleButton, styleText }) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, styleButton]}>
      <Text style={[styles.appButtonText, styleText]}>{title}</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10
    },
    appButtonText: {
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
});


export default CustomButton;