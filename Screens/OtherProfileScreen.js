import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS';
import { auth, db } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, arrayUnion, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';


const OtherProfileScreen = ({route}) => {

  const user = auth.currentUser;
  const {currentDbUser, currDbDocument} = useAuth();
  const {duaUser} = route.params;
  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.profileContainer}>
        <Image style={styles.profileImg} source={{uri: duaUser?.profilePicture}}/>
      </TouchableOpacity>

      <View style={{alignItems: "center",justifyContent: "center"}}>
        <Text style={styles.nameText}>{duaUser?.name}</Text>
        <Text style={styles.bioText}>{duaUser?.bio}</Text>
      </View>

      <View style={styles.statContainer}>
        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>Rank</Text>  
          <Text style={styles.stateNum}>150th</Text>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>Hasanat</Text>  
          <Text style={styles.stateNum}>2M</Text>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.stat}>
          <Text style={styles.stateName}>Duas</Text>  
          <Text style={styles.stateNum}>87</Text>  
        </TouchableOpacity>  
      </View> 

          

      <TouchableOpacity  style={styles.followBtn}>
        <Text style={styles.followBtnText}>Send a Well-Done</Text>
      </TouchableOpacity> 

    </SafeAreaView>
  )
}

export default OtherProfileScreen;

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
  followedBtn: {
    backgroundColor: COLORS.grey,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  followedBtnText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  followBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
})