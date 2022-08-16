import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import Feather from "react-native-vector-icons/Feather";
import COLORS from '../constants/COLORS';
import { useState } from 'react';
import { addDoc, arrayUnion, collection, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';

const CreateComment = ({duaID, duaProgress}) => {

  const {currentDbUser} = useAuth();
  const {currDbDocument} = useAuth();

    const [commentContent, setCommentContent] = useState();
    const createComment = async () => {
    
      const docRef = await addDoc(collection(db, "comments"), {
        commentContent: commentContent,
        commentUser: currentDbUser,
        duaID: duaID,
      });

      await updateDoc(doc(db, "duas", duaID), {
        //Increase the dua progression by 3;
        duaProgress: {
          currentProgress: duaProgress.currentProgress + 3,
          totalProgress: duaProgress.totalProgress,
        },
      })
      
      //Increase the Hasanat of the current user by 3+
      await updateDoc(doc(db, "users", currDbDocument.id), {
        Hasanat: increment(3)
      })
  }

  return (
    <View style={styles.sendCommentContainer}>
        <TextInput multiline={true} value={commentContent} onChangeText={(e) => setCommentContent(e)} placeholderTextColor={COLORS.grey} placeholder="Hi {name}.." style={styles.input} />
        <View style={styles.divider}/>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5,}}>

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.mediaBTN}>
                <Feather name="camera" size={18} color={COLORS.primary}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaBTN}>
                    <Feather name="video" size={18} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={createComment} style={styles.sendBTN}>
                <Text >Send</Text>
            </TouchableOpacity>
      </View>

      </View>   
  )
}

export default CreateComment;

const styles = StyleSheet.create({
    sendCommentContainer: {
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: 15,
      },    
      input: {
        borderColor: COLORS.primary,
        padding: 15,
        color: COLORS.white,
        marginTop: 10,
      },
      mediaBTN: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: 40,
        height: 43,
        marginRight: 5,
      },
      divider: {
        width: "96%",
        height: 2,
        borderRadius: "50%",
        backgroundColor: COLORS.primary,
        alignSelf: "center",
        opacity: 0.7,
    },
    sendBTN: {
        backgroundColor: COLORS.primary,
        padding: 10,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginRight: 5,
    }
})