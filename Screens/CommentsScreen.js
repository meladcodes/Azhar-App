import React from 'react'
import { SafeAreaView, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useEffect } from 'react';
import { Comment } from '../components/Comment';
import COLORS from '../constants/COLORS';
import Header from '../components/Header';
import CreateComment from '../components/CreateComment';


const CommentsScreen = ({route}) => {

    const [comments, setComments] = useState();
    //Getting the duaIDs from the dua components in order to check if the comments belong to the dua or not.
    const {duaID, duaCompleted} = route.params;
    
    useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //check if duaId is same as the comment duaId then set
        setComments(querySnapshot.docs.filter((comment) => comment.data().duaID === duaID))
    });
    return unsubscribe;

    }, [duaID])


  return (
        <SafeAreaView style={styles.container}>
            
            <Header name="Comments"/>
            {duaCompleted == true ? null : <CreateComment duaID={duaID} duaProgress={duaProgress}/>}
            
                <FlatList 
                style={{marginHorizontal: 20}}
                data={comments}
                renderItem={({item}) => <Comment 
                    commentUser={item?.data()?.commentUser}
                    commentContent={item?.data()?.commentContent}
                    duaID={item?.data()?.duaID}
                    />
                }
                />
        </SafeAreaView>
  )
}

export default CommentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
      },
      
      
})