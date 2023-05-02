import React, { useEffect } from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { collective } from "./App";
import { useContext } from "react";
export const Protected = ({ children}) => {
    const Auth=useContext(collective);
    
    if(Auth.cstate.isLoggedIn==false){    
        return <Navigate to='/login' />
    }
    
    return children
}

export default Protected;