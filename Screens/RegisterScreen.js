import * as React from 'react';
import {useState, useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';



function RegisterScreen() {

  const navigation = useNavigation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const signUp = async () => {
    //Create a firebase user
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      Alert.alert('✅ Sign-up Confirmed');
      navigation.navigate("CreateProfileScreen")
    } catch (error) {
      Alert.alert('❌ Error signing In...', error.message);
    }
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.title2}>Lets Get You Started</Text>

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputFields}>
          <TextInput value={email} onChangeText={(e) => setEmail(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your Email.." style={styles.input} />
          <TextInput secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your Password.." style={styles.input} />
    </KeyboardAvoidingView>


    <TouchableOpacity onPress={() => signUp()} style={styles.registerBtn}>
      <Text style={styles.registerBtnText}>Register</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.loginBtn}>
      <Text style={styles.login1}>Already have an account?</Text>
      <Text style={styles.login2}>Login</Text>
    </TouchableOpacity>
    

    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  title: {
    color: COLORS.white,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 30,
  },
  title2: {
    color: COLORS.primary,
    fontSize: 20,
    alignSelf: "center",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    color: COLORS.white,
    marginTop: 20,
  },
  inputFields: {
    marginHorizontal: 20,
    marginTop: "10%",
  },
  mediaBTN: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "90%",
    height: 43,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 20,
  },
  registerBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  registerBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  loginBtn: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  login1: {
    color: COLORS.grey,
    fontSize:16,
  },
  login2: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});