import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import Login from './Login';
import Products from './Products';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { useContext } from 'react';
import Footer from './Footer';
import React from 'react';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Header from './Header';
import data from './sample.json';
import Protected from './protected';
import Dummy from './dummy';


export const collective = React.createContext();

function App() {
  
  
  const initialState = {
      email:"",
      password:"",
      confirmpassword:"",
      signedusers:[],
      Token_Auth:false,
      isLoggedIn:false,
      productdata:data,
      selectedProduct:""
  };

  const reducer = (state,action) => {
    switch (action.type){
      
      case "email": return {...state,email:action.value}
      case "password": return {...state,password:action.value}
      case "confirmpassword": return {...state,confirmpassword:action.value}
      case "signup":return {...state,signedusers:[...state.signedusers,{email:state.email,password:state.password}],email:"",password:"",confirmpassword:""}
      case "deleteProduct": return {...state,productdata:action.value}
      case "editProduct":return {...state,selectedProduct:JSON.parse(action.value)}
      // case "addProduct":{return {...state,productdata:[...state.productdata,action.value.prod]}}
      case "setLogin":return {...state,isLoggedIn:action.value};
      case "setToken": return {...state,token:action.value};
      case "logout": {localStorage.removeItem('Token_Auth');return {...state,Token_Auth:false,isLoggedIn:action.value}}
      
    }
    
  }
  const [state,dispatch] = useReducer(reducer,initialState);
  
  useEffect(()=>{
    localStorage.setItem("browsersignedusers",JSON.stringify(state.signedusers))
  },[state.isLoggedIn])
  
  
  return (
    <>
    
    <collective.Provider value={{cstate:state,cdispatch:dispatch}}>
    

    
    
    
    <Routes>
      <Route exact path="/" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/products" element={<Protected><Products /></Protected>} />
      <Route path="/addproduct" element={<Protected><AddProduct /></Protected>} />
      <Route path="/editproduct" element={<Protected><EditProduct /></Protected>} /> 
     
      
    </Routes>
    
    </collective.Provider>
    
    
    
    </>
  )
}
    export default App;
