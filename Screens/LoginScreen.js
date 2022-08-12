import { signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import {useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, TouchableOpacity, Alert } from 'react-native';
import COLORS from "../constants/COLORS";
import { auth } from '../firebase-config';

function LoginScreen({navigation}) {

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  async function signIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate("Tabs");
      Alert.alert('✅ Sign-In Confirmed');
    } catch (error) {
      Alert.alert('❌ Error signing In...', error.message);
    }
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputFields}>
          <TextInput value={email} onChangeText={(e) => setEmail(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your Email.." style={styles.input} />
          <TextInput secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your Password.." style={styles.input} />
    </KeyboardAvoidingView>

    <TouchableOpacity onPress={() => signIn()} style={styles.loginBtn}>
      <Text style={styles.loginBtnText}>Login</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={styles.registerBtn}>
      <Text style={styles.register1}>Don't have an account?</Text>
      <Text style={styles.register2}>Register</Text>
    </TouchableOpacity>
    

    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  title: {
    color: COLORS.primary,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 30,
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
  loginBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loginBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  registerBtn: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  register1: {
    color: COLORS.grey,
    fontSize:16,
  },
  register2: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  }
});