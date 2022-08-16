import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS';

export const Comment = ({commentContent, commentUser, navigation, duaID}) => {
  return (
    <TouchableWithoutFeedback onPress={(Keyboard.dismiss)}>
    <View style={styles.commentContainer}>
        <View style={styles.leftSide}>
            <TouchableOpacity onPress={() => navigation.navigate("OtherProfileScreen")} style={styles.profileContainer}>
                <Image style={styles.profileImg} source={{uri: commentUser?.profilePicture}}/>
            </TouchableOpacity>
        </View>
        <View style={styles.rightSide}>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{commentUser?.name}</Text>
                <Text style={styles.userName}>@{commentUser?.username}</Text>
            </View>

            <Text>{commentContent}</Text>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        marginTop: 15,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        borderRadius: 5,
    },
    profileContainer: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.blue,
        marginRight: 10,
      },
      profileImg: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
      },
      userInfo: {
        flexDirection: "row",
        marginBottom: 5,
      },
      name: {
        marginRight: 5,
        fontWeight: "bold",
      },
      userName: {
        color: COLORS.primary,
      },
      rightSide: {
        paddingRight: 40,
      }
})