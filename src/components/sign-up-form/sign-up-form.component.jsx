import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from "../../utils/firebase/utils.firebase";

const defaultFormFields={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}
 export const SignUpForm=()=>{

    const[formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit=async(event)=>{
       event.preventDefault();

       if(password!==confirmPassword)
       return;

       try{
         const {user} =await createAuthUserWithEmailAndPassword(email,password);
         await createUserDocumentFromAuth(user, {displayName});
         resetFormFields();
       }
       catch(error){
        if(error.code="auth/email-already-in-use"){
            alert("Email Already in Use");
        }
        console.log(error);
       }

    }

    const handleChange=(event)=>{
        const {name,value}=event.target;

        setFormFields({...formFields,[name]:value})
    }
    return(
        <div>
       <h1>Sign Up With Email and Password</h1>
       <form onSubmit={handleSubmit}>
       <label>Display Name</label>
        <input type='text' required onChange={handleChange} name='displayName' value={displayName}/>
        <label>Email</label>
        <input type='email'required onChange={handleChange} name='email' value={email}/>
        <label>Password</label>
        <input type='password' required onChange={handleChange} name='password' value={password}/>
        <label>Confirm Password</label>
        <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
        <button type='submit'>Sign Up</button>
       </form>
       </div>
    );
}