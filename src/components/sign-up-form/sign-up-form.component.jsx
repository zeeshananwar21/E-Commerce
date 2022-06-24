import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from "../../utils/firebase/utils.firebase";
import { FormInput } from "../form-input/form-input.component";
import Button from '../Button/button.component';
import './sign-up-form.styles.scss'

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
        <div className="sign-up-container">
       <h2>Don't have an account?</h2>
       <span> Sign Up With Email & Password</span>
       <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" inputOptions={{ type:'text', required:true, onChange:handleChange, name:'displayName', value:displayName}}/>
        <FormInput label="Email"inputOptions={{ type:'email',required:true, onChange:handleChange, name:'email', value:email}}/>
        <FormInput label="Password" inputOptions={{type:'password', required:true, onChange:handleChange, name:'password', value:password}}/>
        <FormInput label="Confirm Password" inputOptions={{type:'password', required:true, onChange:handleChange, name:'confirmPassword', value:confirmPassword}}/>
        <Button type='submit'>Sign Up</Button>
       </form>
       </div>
    );
}