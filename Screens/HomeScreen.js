import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import COLORS from '../constants/COLORS';
import Dua from '../components/Dua';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase-config';



const HomeScreen = () => {
  const [duas, setDuas] = useState();

  useEffect(() => {
    const q = query(collection(db, "duas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    setDuas(querySnapshot.docs)
  });
  return unsubscribe;
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <Header name="Home"/>

      <ScrollView style={styles.duaContainer}> 
        {/* <FlatList style={styles.postsContainer} data={posts} 
        renderItem={({item}) => <Post name={item.name} 
        location={item.location} 
        profileImage={item.profileImage} 
        postImage={item.postImage}
        likes={item.likes}
        comments={item.comments}
        postText={item.postText}/>}
        /> */}
        {duas?.map((item) => {
          const { duaInput, duaUser, duaImage, duaProgress, likedBy, } = item.data();
           return (
            <Dua name={duaUser.name}
            username={duaUser.username}
            duaText={duaInput}
            key={item.id}
            duaImg={duaImage}
            profileImg={duaUser.profilePicture}
            duaUser={duaUser}
            duaProgress={duaProgress}
            likedBy={likedBy}
            duaID={item.id}
            />
          )
        })}
       </ScrollView> 

       

    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    
  },
  duaContainer: {
    paddingHorizontal: 20,
  }
})