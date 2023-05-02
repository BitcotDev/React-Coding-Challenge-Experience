import React from "react";
import logo from "./assets/images/thumbnails/Logo.svg";
import "./assets/css/main.css";
import { useNavigate } from "react-router-dom/dist";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom/dist";
import { collective } from "./App";
const Signup = () => {
   
   
   const Auth = useContext(collective);
   const navigate = useNavigate();
   const [inputValue,setInputValue] = useState({
      email:"",
      password:"",
      confirmPassword:""
   });

   const [formError,setFormError] = useState({
      emailError:"",
      passwordError:"",
      confirmPasswordError:""
   })
   
   
   
   
   
   
   
   function handleChange(event){
      let fieldname=event.target.name;
      let fieldvalue=event.target.value;
      
      switch(fieldname){
         case 'email' : setInputValue(inputValue=>({...inputValue,email:fieldvalue}));
                        break;
         case 'password' : setInputValue(inputValue=>({...inputValue,password:fieldvalue}));validate(event);
                        break;
         case 'confirmPassword' : setInputValue(inputValue=>({...inputValue,confirmPassword:fieldvalue}));
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
         case 'confirmPassword' : let dum = inputValue.password;
         if(fieldvalue!==dum){
            setFormError({...formError,confirmPasswordError:"Password mismatch"})
         }
         else{
            setFormError({...formError,confirmPasswordError:""})
         }
         break;
      }

   }
   function handleClick(event){
      event.preventDefault();
      if(formError.emailError=="" && formError.passwordError=="" && formError.confirmPasswordError==""&&inputValue.email.length>0
      && inputValue.password.length>0 && inputValue.confirmPassword.length>0)
      {      
         
         Auth.cdispatch({type:'email',value:inputValue.email});
         Auth.cdispatch({type:'password',value:inputValue.password});
         Auth.cdispatch({type:'confirmpassword',value:inputValue.confirmPassword});
         Auth.cdispatch({type:'signup'})         
         setInputValue({...inputValue,email:"",password:"",confirmPassword:""});
      }
      else{
         alert("All fields are required")
      }
   }
    return(
        <>
        <div className="App">
        <div id="wrapper">
           <div className="page-wrapper auth_wrapper">
              <div className="content-area-wrapper">
                 <div className="content-wrapper">
                    <div className="container">
                       <div className="card products_blc">
                          <div className="card-body">
                             <div className="card_content_wrap text-center"></div>
                             <div className="card_content_wrap text-center">
                                <div className="logo_wrap">
                                   <img src={logo} alt="logo" />
                                   <h6>Create an account</h6>
                                </div>
                                <form>
                                   <div className="form_wrapper">
                                      <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"><span className="mendatary">*</span> Email</label>
                                      <input type="email"  name="email" required placeholder="demo@gmail.com" className="form-control input_modify" id="exampleFormControlInput1" value={inputValue.email} onChange={(event)=>handleChange(event)}/>
                                      </div>
                                      {formError.emailError?<div style={{color:"red"}}>{formError.emailError}</div>:""}
                                      <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"> <span className="mendatary">*</span> Password</label>
                                      <input type="password" placeholder="*****" required name="password" className="form-control input_modify" id="exampleFormControlInput2" value={inputValue.password}  onChange={(event)=>handleChange(event)}/>
                                      </div>
                                      {formError.passwordError?<div style={{color:"red"}}>{formError.passwordError}</div>:""}
                                      <div className="mb-4"><label for="exampleFormControlInput1" className="form-label label_modify"> <span className="mendatary">*</span>Confirm Password</label>
                                      <input type="password" name="confirmPassword" required className="form-control input_modify" id="exampleFormControlInput3" placeholder="*****" value={inputValue.confirmPassword} onChange={(event)=>handleChange(event)}/>
                                      </div>
                                      {formError.confirmPasswordError?<div style={{color:"red"}}>{formError.confirmPasswordError}</div>:""}
                                      <div className="mb-0 auth_btn">
                                       <button type="button" className="theme-btn-primary theme-btn" onClick={(event)=>handleClick(event)}>Sign Up</button>
                                       </div>
                                      
                                      <div className="already"> <NavLink to="/login">Already have Account</NavLink></div>
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
        
        </>
    );
}
export default Signup;

