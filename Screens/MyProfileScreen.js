import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS';
import { auth } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';


const MyProfileScreen = () => {

  const user = auth.currentUser;
  const {currentDbUser} = useAuth();


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.profileContainer}>
        <Image style={styles.profileImg} source={{uri: user?.photoURL}}/>
      </TouchableOpacity>

      <View style={{alignItems: "center",justifyContent: "center"}}>
        <Text style={styles.nameText}>{currentDbUser?.name}</Text>
        <Text style={styles.bioText}>{currentDbUser?.bio}</Text>
      </View>

      <View style={styles.statContainer}>
        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>LIKES</Text>  
          <Text style={styles.stateNum}>300K</Text>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>Following</Text>  
          <Text style={styles.stateNum}>1200</Text>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>Followers</Text>  
          <Text style={styles.stateNum}>1M</Text>  
        </TouchableOpacity>  
      </View> 



    </SafeAreaView>
  )
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  profileContainer: {
    height:90,
    width: 90,
    borderRadius: 50,
    borderWidth: 1,
    padding: 4,
    borderColor: COLORS.primary,
    alignSelf: "center",
    marginTop: "10%",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  nameText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
  },
  bioText: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 17,
    color: COLORS.white,
    fontWeight: "400"
  },
  statContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stateNum: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  stateName: {
    color: "grey",
    fontSize: 14,
  },
  followBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  followBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
})