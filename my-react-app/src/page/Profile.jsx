import React from 'react';
import { isAuthenticated } from "../constants";
import LogIn from "../components/LogIn"
import Details from "../components/Details";

function Profile({route}) {

    return(
        isAuthenticated ? 
            <Details/>
            : 
            <LogIn route={route}/>
    );

}

export default Profile