import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/COLORS';
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase-config';
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import Header from '../components/Header';

const AskDua = ({navigation}) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [duaInput, setDuaInput] = useState();
  const {currentDbUser} = useAuth();
  const user = auth.currentUser;
  const [progressTarget, setProgressTarget] = useState();

  const storage = getStorage();

  useEffect(() => {
    const checkPermission = async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted")
    }

    checkPermission();

  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4,3],
      quality: 1,
    });

    console.log(result);

    if(!result.cancelled) {
      setImage(result.uri);
    }
  }

  if(hasGalleryPermission === false){
    return (<Text>No permission</Text>)
  }
  

  const askNewDua = async () => {
    //Create a new doc in the Duas collection with the input and user uid
    try {
      if(currentDbUser) {
        const docRef = await addDoc(collection(db, "duas"), {
          duaInput: duaInput,
          duaUser: currentDbUser,
          duaProgress: {
            currentProgress: 0,
            totalProgress: progressTarget
          },
          likedBy: arrayUnion()
        });
        //Upload the dua picture to storage
      if(image !== null) {
        const fileRef = ref(storage, `duas/${docRef?.id}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        uploadBytes(fileRef, bytes).then(async() => {
          const url = await getDownloadURL(fileRef);
          await updateDoc(doc(db, "duas", docRef.id), {
            duaImage: url,
          })
        })
      }
      navigation.navigate("HomeScreen");
      setDuaInput(null)
      setImage(null)
      setProgressTarget(null);
      } else {
        console.warn("The DB user hasnt synced yet!")
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const selectTarget = () => {
    const target = Alert.prompt("How many duas do u want to reach? ");
    setProgressTarget(target);
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} >
      
      <Header name="Ask Dua"/>
      
      <View style={{flexDirection: "row", alignItems: "flex-start",marginHorizontal: 20,}}>
      <TouchableOpacity style={styles.profileContainer}>
        <Image style={styles.profileImg} source={{uri: user?.photoURL}}/>
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.inputContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      
          <TextInput multiline={true} value={duaInput} onChangeText={(e) => setDuaInput(e)} placeholder="Whats happening today?"  placeholderTextColor="white" style={styles.contentInput} />
      
    </KeyboardAvoidingView>
    </View>

    {image && <TouchableOpacity onPress={() => setImage(null)} style={{height: 300, width: "100%",}}><Image style={{flex: 1, borderRadius: 15, marginTop: 15, marginHorizontal: 20,}} source={{uri: image}}/></TouchableOpacity>}

    <View style={{flexDirection: "row", marginVertical: 10, marginHorizontal: 20,}}>
      <TouchableOpacity onPress={() => pickImage()} style={styles.mediaBTN}>
        <Feather name="camera" size={18} color={COLORS.primary}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickVideo()} style={styles.mediaBTN}>
        <Feather name="video" size={18} color={COLORS.primary}/>
      </TouchableOpacity>
    </View>
    
    <TextInput keyboardType='numeric' value={progressTarget} onChangeText={(e) => setProgressTarget(e)} placeholder="What is your dua target?"  placeholderTextColor="white" style={styles.targetInput} />


    <TouchableOpacity onPress={() => askNewDua()} style={styles.publishBtn}>
      <Text style={styles.publishBtnText}>Ask Dua</Text>
    </TouchableOpacity>


    </View>
    </TouchableWithoutFeedback>
  )
}

export default AskDua;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 20,
  },
  profileContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  inputContainer: {
    marginRight: 20,
    marginLeft: "3%",
    
  },
  contentInput: {
    fontSize: 18,
    marginRight: 22,
    color: COLORS.white,
    fontWeight: "300",
    minWidth: "90%",
  },
  targetInput: {
    fontSize: 18,
    marginHorizontal: 22,
    color: COLORS.white,
    marginBottom: 15,
    fontWeight: "300",
    minWidth: "90%",
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  publishBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  publishBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  mediaBTN: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 45,
    height: 43,
    borderRadius: 15,
    borderWidth: 1,
    
    borderColor: "grey",
    marginRight: 10,
  }
})