import React from "react";
import "./assets/css/main.css";
import logo from "./assets/images/thumbnails/Logo.svg";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collective } from "./App";
const Login = () => {
   const navigate = useNavigate();   
   const Auth = useContext(collective);   
   
   const [loginData,setLoginData] = useState({
      email:"",
      password:""
   });
   const [formError,setFormError] = useState({
      emailError:"",
      passwordError:"",
      incorrectUserError:""
   })
   function handleChange(event){
      let fieldname=event.target.name;
      let fieldvalue=event.target.value;
      
      switch(fieldname){
         case 'email' : setLoginData(loginData=>({...loginData,email:fieldvalue}));
                        break;
         case 'password' : setLoginData(loginData=>({...loginData,password:fieldvalue}));
                        break;        
      }
      validate(event);         
   }
   function validate(event){
      let fieldname=event.target.name;
      let fieldvalue=event.target.value;
      
      switch(fieldname){
         case 'email' : if(fieldvalue.length<8 || !fieldvalue.endsWith(".com")){
            setFormError({...formError,emailError:"Please enter valid Email"})
         }
         else{
            setFormError({...formError,emailError:""})
         }
            break;
         case 'password' : if(fieldvalue.length<6){
            
            setFormError({...formError,passwordError:"Password must be atleast 6 characters"})
         }
         else{
            
            setFormError({...formError,passwordError:""})
         }
         
         break;
         
      }

   }
   // function handleChange(event){
   //    let fieldName= event.target.name
   //    let fieldValue=event.target.value
   //    setLoginData((loginData)=>{return({...loginData,[fieldName]:fieldValue})})
   // }
   function handleClick(event){
      
      event.preventDefault();
      if(formError.emailError=="" && formError.passwordError=="" && loginData.email.length>0 && loginData.password.length>0)
      {  
         
         const validUser = Auth.cstate.signedusers.filter(c=>{return(c.email===loginData.email && c.password === loginData.password)})
         if(validUser.length>0){
            Auth.cdispatch({type:'setToken',value:true});
            Auth.cdispatch({type:'setLogin',value:true});
            localStorage.setItem("Token_Auth",true);
            navigate('/products',{replace:true});
         }
         else{
            
            setFormError({...formError,incorrectUserError:"Email or Password is incorrect"})
         }
      }
      else{
         
         alert("All fields are required")
      }
      
   }
   
    return (
        <div>
        <div className="App">
         <div id="wrapper">
            <div className="page-wrapper auth_wrapper">
               <div className="content-area-wrapper">
                  <div className="content-wrapper">
                     <div className="container">
                        <div className="card products_blc">
                           <div className="card-body">
                              <div className="card_content_wrap text-center">
                                 <div className="card_content_wrap text-center">
                                    <div className="logo_wrap">
                                       <img src={logo} alt="logo" />
                                       <h6>Don’t have an account yet?<NavLink className="signUpSpan" to="/"> Sign Up</NavLink></h6>
                                    </div>
                                    <form>
                                       <div className="form_wrapper">
                                          <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"><span className="mendatary">*</span> Email</label>
                                          <input type="email" className="form-control input_modify" id="exampleFormControlInput1" name="email" placeholder="demo@demo.com" value={loginData.email} onChange={(event)=>handleChange(event)} />
                                          </div>
                                          {formError.emailError?<div style={{color:"red"}}>{formError.emailError}</div>:""}
                                          <div className="mb-4"><label for="exampleFormControlInput2" className="form-label label_modify"> <span className="mendatary">*</span> Password</label>
                                          <input type="password" className="form-control input_modify" name="password" id="exampleFormControlInput1" placeholder="********" value={loginData.password} onChange={(event)=>handleChange(event)} />
                                          </div>
                                          {formError.passwordError?<div style={{color:"red"}}>{formError.passwordError}</div>:""}
                                          <div className="mb-0 auth_btn"><button type="button" className="theme-btn-primary theme-btn" onClick={(event)=>{handleClick(event)}} >Sign In</button></div>
                                          {formError.incorrectUserError?<div style={{color:"red"}}>{formError.incorrectUserError}</div>:""}
                                       </div>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
        </div>
    );
}
export default Login;