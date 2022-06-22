import { async } from "@firebase/util";
import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/utils.firebase";
const SignIn=()=>{

    const logGoogleUser=async()=>{
        const {user}=await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return(
        <div>
            
            <h2>I am a SignIn Page</h2>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}

export default SignIn;