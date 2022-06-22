import {signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/utils.firebase";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { useState } from "react";


const SignIn=()=>{
    
    
  
    const logGoogleUser=async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef= await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            
            <h2>I am a SignIn Page</h2>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <SignUpForm />
           
        </div>
    )
}

export default SignIn;