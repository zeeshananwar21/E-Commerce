import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import{getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore,doc,setDoc,getDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2BP7l-GbKnx8oVU7nCcxLVZeX8Hdk23A",
  authDomain: "clothing-db-7b505.firebaseapp.com",
  projectId: "clothing-db-7b505",
  storageBucket: "clothing-db-7b505.appspot.com",
  messagingSenderId: "913578971970",
  appId: "1:913578971970:web:3d670aed4ddcef1385aedb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})
export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider);

export const db=getFirestore();

export const createUserDocumentFromAuth= async(userAuth,additionalInformation={})=>{

const userDocRef=doc(db,'users',userAuth.uid);


const userSnapshot=await getDoc(userDocRef);

if(!userSnapshot.exists()){

  const {displayName,email}=userAuth;
  const createdAt = new Date();

try{
  await setDoc(userDocRef,{
    displayName,email,createdAt,...additionalInformation
  });
  }
  catch(error){
  console.log(error.message);
  }
}
return userDocRef;
}
export const createAuthUserWithEmailAndPassword=async(email,password)=>{
if(!email || !password) return;

return await createUserWithEmailAndPassword(auth,email,password);
}