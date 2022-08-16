import { Image, StyleSheet, Text, TouchableOpacity, View, Share, Alert } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from 'react';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import Progress from './Progress';
import { auth, db } from '../firebase-config';
import { useEffect } from 'react';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';


const Dua = ({duaID, name, username, duaImg, likedBy, duaText, profileImg, duaUser, duaProgress}) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState();

  //Check if a dua is liked by current user
  useEffect(() => {
    likedBy.map((liker) => {
      if(liker === user?.displayName) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    })
  }, [likedBy])
  
  

  const onLike = async () => {
    //If dua is not liked by current user
    if(liked === false) {
      //add the current users name onto the likedBy array field
      await updateDoc(doc(db, "duas", duaID), {
        likedBy: arrayUnion(user.displayName),
        //Increase the dua progression by 1;
        duaProgress: {
          currentProgress: duaProgress.currentProgress + 1,
          totalProgress: duaProgress.totalProgress,
        },
      })
      setLiked(true)
      //If dua is liked by current user
    } else {
      await updateDoc(doc(db, "duas", duaID), {
        likedBy: arrayRemove(user.displayName),
        //Increase the dua progression by 1;
        duaProgress: {
          currentProgress: duaProgress.currentProgress - 1,
          totalProgress: duaProgress.totalProgress,
        }
      })
      setLiked(false)
    }
      
  }

  //Check the amount of likes
  useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //check if duaId is same as the comment duaId then set
          setComments(querySnapshot.docs.filter((comment) => comment.data().duaID === duaID))
    });
    return unsubscribe;
    }, [duaID])

    const checkPost = () => {
      if(name === user.displayName) {
        navigation.navigate("MyProfileScreen")
      } else {
        navigation.navigate("OtherProfileScreen", {duaUser})
      }
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: duaText,
          url: duaImg,
          title: name,
          tintColor: COLORS.primary,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
            Alert.alert("Sucessfully Shared")
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

  return (
    <View style={styles.duaContainer}>

      <View style={styles.duaHeader}>
        <View style={styles.leftSide}>

            <TouchableOpacity onPress={() => checkPost()} style={styles.profileContainer}>
                <Image style={styles.profileImg} source={{uri: profileImg}}/>
            </TouchableOpacity>
            <View style={styles.profileTextContainer}>
                <Text style={styles.duaName}>{name}</Text>            
                <Text style={styles.duaUsername}>@{username}</Text>            
            </View>
        </View>

        <TouchableOpacity style={styles.iconBG}>
            <Feather name="more-horizontal" size={22} color={COLORS.black}/>
          </TouchableOpacity>
      </View>

        {
          duaText ? <Text style={styles.duaText}>{duaText}</Text> : null
        }
        {
          duaImg ? <View style={styles.duaImgContainer}>
          <Image style={styles.duaImg} source={{uri: duaImg}}/> 
         </View> : null
        }
      
      

      <View style={styles.statsContainer}>

        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => onLike()} style={styles.icons}>
            {
              liked ? <FontAwesome name="heart" color={COLORS.primary} size={24} /> : <Feather name="heart" size={24} color="black"/> 
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", {duaID, duaProgress})} style={styles.icons}>
            <Feather name="message-circle" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShare()} style={styles.icons}>
            <Feather name="send" size={24} color="black"/>
          </TouchableOpacity>
        </View>

        <Progress currentProgress={duaProgress.currentProgress} totalProgress={duaProgress.totalProgress} height={20}/>

        <View style={{flexDirection: "row",marginTop: 5, marginBottom: 5,}}>
          <TouchableOpacity style={{flexDirection: "row"}}>
            <Text style={{color: "black", fontWeight: "500", marginRight: 5,}}>{likedBy.length}</Text>
            <Text style={{color: "black"}}>Likes</Text>
          </TouchableOpacity>  
            <Text style={{color: "grey"}}> • </Text>
          <TouchableOpacity style={{flexDirection: "row"}}>  
            <Text style={{color: "black", fontWeight: "500", marginRight: 5}}>{comments?.length}</Text>
            <Text style={{color: "black"}}>Comments</Text>  
          </TouchableOpacity>

        </View>

          
        </View>  

        
    </View>
  )
}

export default Dua;

const styles = StyleSheet.create({
    duaContainer: {
        backgroundColor: COLORS.grey,
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
        
    },
    duaHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconBG: {
        padding: 8,
        borderRadius: 50,
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
      },
      leftSide: {
        flexDirection: "row",
      },
      profileContainer: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.blue,
      },
      profileImg: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        
      },
      profileTextContainer: {
        marginLeft: 10,
        justifyContent: "space-between"
      },
      duaName: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "600"
      },
      duaUsername: {
        color: COLORS.black,
        fontSize: 13,
      },
      duaImgContainer: {
        width: "100%",
        height: 200,
        marginTop: 10,
        borderRadius: 20,
      },
      duaImg: {
        width: "100%", 
        height: "100%",
        borderRadius: 20,
      },
      statsContainer: {
        
      },
      iconContainer: {
        flexDirection: "row",
        marginTop: 10,
      },
      icons: {
        marginRight: 15,
      },
      duaText: {
        color: COLORS.black,
        fontSize: 15,
        marginTop: 10,
        fontWeight: "500",
      }
})