import { StyleSheet, Text, TouchableOpacity, View, Image , StatusBar, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from "../constants/COLORS";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from '../firebase-config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';





const CreateProfileScreen = ({navigation}) => {


    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const user = auth.currentUser;

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

    const complete = async () => {
    
      //save the user to DB along with the name, email, username, sub
      try {
        updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: image,
        })
        const docRef = await addDoc(collection(db, "users"), {
            name: fullName,
            username: username,
            bio: bio,
            email: user.email,
            id: user.uid,
            photoURL: image,
            Hasanat: 0,
          });
          if(image !== null) {
            const fileRef = ref(storage, `profilePictures/${docRef?.id}`);
            const img = await fetch(image);
            const bytes = await img.blob();
            uploadBytes(fileRef, bytes).then(async() => {
              const url = await getDownloadURL(fileRef);
              await updateDoc(doc(db, "users", docRef.id), {
                profilePicture: url,
              })
            })
          }
          console.log("Document written with ID: ", docRef.id);
          navigation.navigate("LoginScreen")
      } catch (error) {
          console.log(error)
      }
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

    <View style={styles.firstBox}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImg} source={{uri: image}}/>

        <TouchableOpacity onPress={() => pickImage()} style={styles.photoIcon}>
            <Feather name='plus' size={24} color="black"/>
        </TouchableOpacity>
      </View>
      

    </View>

    <View style={styles.secondBox}>
    <Text style={styles.title}>Profile Setup</Text>


    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputFields}>
          <TextInput value={fullName} onChangeText={(e) => setFullName(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your full name" style={styles.input} />
          <TextInput value={bio} onChangeText={(e) => setBio(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your bio" style={styles.input} />
          <TextInput value={username} onChangeText={(e) => setUsername(e)} placeholderTextColor={COLORS.grey} placeholder="Enter your Username.." style={styles.input} />  
    </KeyboardAvoidingView>

    <TouchableOpacity onPress={() => complete()} style={styles.loginBtn}>
      <Text style={styles.loginBtnText}>Complete</Text>
    </TouchableOpacity>

    </View>


    </View>
    </TouchableWithoutFeedback>
  )
}

export default CreateProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
      },
      
      firstBox: {
        width: "100%",
        height: "30%",
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
      },
      profileContainer: {
        height:90,
        width: 90,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.white,
        marginTop: "10%",
        padding: 2,
      },
      profileImg: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
      },
      photoIcon: {
        backgroundColor: COLORS.white,
        borderRadius: "50%",
        position:"absolute",
        bottom: 4,
        right: 4,
      },
      title: {
        color: COLORS.black,
        fontSize: 30,
        alignSelf: "center",
        marginTop: 30,
      },
      secondBox: {
        height: "100%",
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        color: COLORS.black,
        marginTop: 20,
      },
      inputFields: {
        marginHorizontal: 20,
      },
      loginBtn: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      },
      loginBtnText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 15,
      },
})