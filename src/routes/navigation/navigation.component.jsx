import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { ReactComponent as Crown } from "../../assets/crown.svg";
import '../../routes/navigation/navigation.styles.scss';
import '../sign-in/sign-in.component';
const Navigation=()=>{

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-conatainer" to="/">
                <Crown />
                </Link>
               <div className="nav-links-container">
                   <Link className="nav-link" to="/shop">
                       Shop
                   </Link>
                   <Link className="nav-link" to="/SignIn">
                       SignIn
                   </Link>

               </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}
export default Navigation;