import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import COLORS from '../constants/COLORS';
import { getAuth, signOut } from 'firebase/auth';
import {auth} from "../firebase-config";
import { useNavigation } from '@react-navigation/native';


const Header = ({name}) => {

  const navigation = useNavigation();

  const LogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate("OnBoardScreen")
      console.log("Sign-out successful");
    }).catch((error) => {
      // An error happened. 
      console.log(error)
    });
  }


  return (
    <TouchableWithoutFeedback onPress={(Keyboard.dismiss)}>
    <View style={styles.header}>

          <Text style={styles.logo}>{name}</Text>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconBG} onPress={() => LogOut()}>
            <Feather name="bell" size={20} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBG}>
            <Feather name="message-square" size={20} color="black"/>
          </TouchableOpacity>

        </View>
 
      </View>
      </TouchableWithoutFeedback>
  )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
      },
      iconContainer: {
        flexDirection: "row",
      },
      iconBG: {
        marginLeft: 20,
        backgroundColor: COLORS.white,
        padding: 8,
        borderRadius: 50,
      },
      logo: {
        fontSize: 23,
        color: COLORS.white,
        fontWeight: "500",
      }
})