import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";


const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
    const [currentDbUser, setCurrentDbUser] = useState();
    const [currDbDocument, setCurrDbDocument] = useState();
    const [currUser, setCurrUser] = useState();
    onAuthStateChanged(auth, (user) => {
        setCurrUser(user);
    })
    
    const getCurrDbUser = async () => {
        try {
            const q = query(collection(db, "users"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //Check if the auth id is the same is the user id in the db
                    if(doc.data().id == currUser?.uid){
                      setCurrentDbUser(doc.data())
                      setCurrDbDocument(doc);
                    } else {
                      return console.log("The user id dosnt match the database");
                    }
                  });
            });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCurrDbUser()
    }, [])
    
    useEffect(() => {
        getCurrDbUser()
    }, [currUser])

    
    
    return (
        <AuthContext.Provider value={{currentDbUser, currDbDocument}}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => {
    return useContext(AuthContext);
}
