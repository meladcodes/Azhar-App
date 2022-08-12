import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView,  TouchableOpacity, } from 'react-native';
import COLORS from '../constants/COLORS';
import Share from "../assets/Share.svg"


function OnBoardScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.openingText}>
      <Text style={styles.Title}>AZHAR</Text>
      <Text style={styles.Title2}>THE CROWFUNDING DUA APP</Text>
    </View>

    <View style={styles.heroContainer}>
      <Share width={300} height={350} />
    </View> 

    <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={styles.getStartedBtn}>
      <Text style={styles.getStartedBtnText}>Get Started</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.loginBtn}>
      <Text style={styles.login1}>Already have an account?</Text>
      <Text style={styles.login2}>Login</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
}

export default OnBoardScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  Title: {
    color: COLORS.primary,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 30,
  },
  Title2: {
    color: COLORS.white,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
  },
  heroContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: "center"
  },
  getStartedBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  getStartedBtnText: {
    color: COLORS.bg,
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
    color: COLORS.white,
    fontSize:16,
  },
  login2: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  }
});