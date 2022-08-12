import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from 'react';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import Progress from './Progress';


const Dua = ({name, location, duaImg,  likes, comments, duaText, profileImg, duaUser, duaProgress}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.duaContainer}>

      <View style={styles.duaHeader}>
        <View style={styles.leftSide}>

            <TouchableOpacity onPress={() => navigation.navigate("OtherProfileScreen", {duaUser})} style={styles.profileContainer}>
                <Image style={styles.profileImg} source={{uri: profileImg}}/>
            </TouchableOpacity>
            <View style={styles.profileTextContainer}>
                <Text style={styles.duaName}>{name}</Text>            
                <Text style={styles.duaLocation}>{location}</Text>            
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
        <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.icons}>
            {
              liked ? <FontAwesome name="heart" color={COLORS.primary} size={24} /> : <Feather name="heart" size={24} color="black"/> 
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons}>
            <Feather name="message-circle" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons}>
            <Feather name="send" size={24} color="black"/>
          </TouchableOpacity>
        </View>

        <Progress currentProgress={duaProgress.currentProgress} totalProgress={duaProgress.totalProgress} height={20}/>

        <View style={{flexDirection: "row",marginTop: 5, marginBottom: 5,}}>
          <TouchableOpacity style={{flexDirection: "row"}}>
            <Text style={{color: "black", fontWeight: "500", marginRight: 5,}}>{likes}</Text>
            <Text style={{color: "black"}}>Likes</Text>
          </TouchableOpacity>  
            <Text style={{color: "grey"}}> • </Text>
          <TouchableOpacity style={{flexDirection: "row"}}>  
            <Text style={{color: "black", fontWeight: "500", marginRight: 5}}>{comments}</Text>
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
      duaLocation: {
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