/**
 * Signin Firebase
 */

 import axios from 'axios';
 import React, { Component, useState } from 'react';
 import { Helmet } from "react-helmet";
 import { Link,Redirect ,useHistory } from 'react-router-dom';
 import { baseUrl } from '../Entryfile/BaseUrl.js';
 import {Applogo} from '../Entryfile/imagepath.jsx'
 import Cookies from 'js-cookie'

 const Loginpage = () => {
  const history = useHistory();
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [haserror,setHasError] = useState("");
  const [message,setMessage] = useState("");
  const [input,setInput]=useState({})
  const [errors,setErrors]=useState({})

  const handleEmail=(e) =>{
    // let input = input;
    // input["email"] = e.target.value;
   setEmail(e.target.value)
   //setInput(input)
   

  }

  const handlePassword=(e) =>{
    // let input = input;
    // input[e.target.name] = e.target.value;
    setPassword(e.target.value)
    //setInput(input)
   }

   

   const handleLogin = (e) =>{
     e.preventDefault();
    
     
     const data={email:email,password:password}
     setLoading(true)
   axios.post(baseUrl+"login",data)
   .then(res => {
     if(res.data.hasError){
      setHasError(true)
      setMessage(res.data.msg)
      setLoading(false)
      setPassword("")
     }else{
      Cookies.set("token",res.data.token)
      Cookies.set("profileImage",res.data.user["image"])
      setLoading(false)
      history.push("/app/main/dashboard")
      window.location.reload()
     }
     

  }).catch(e=> {
    setLoading(false)
    setEmail("")
    setPassword("")
  })
}
   

   
   const validate = () =>{
     console.log("ghhdgd")
    let input = input;
    let validationerrors = {};
    let isValid = true;    

     
     if (!input["email"]) {
      isValid = false;
      validationerrors["email"] = "Please enter your email Address.";
     }


      if (!input["password"]) {
        isValid = false;
        validationerrors["password"] = "Please enter your password .";
      }





    if (typeof input["email"] !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        validationerrors["email"] = "Please enter valid email address.";
      }
    }



    // this.setState({
    //     validationerrors: validationerrors
    // });

    return isValid;
}
   
      

       return (       
          
          <>
        
         <div className="account-content">
           
           <div className="container">
             {/* Account Logo */}
             <div className="account-logo">
               <Link to="/app/main/dashboard"><img src={Applogo} alt="Multiflags" /></Link>
             </div>
             {/* /Account Logo */}
             <div className="account-box">
               <div className="account-wrapper">
                 <h3 className="account-title">Login</h3>
                 <p className="account-subtitle">Access to our dashboard</p>
                 {/* Account Form */}
                 <div>
                 {haserror?
                   <div className='alert alert-danger'><h5>{message}</h5></div>:
                   null
                  }
                   <div className="form-group">
                     <label>Email Address</label>
                     <input className="form-control" onChange={handleEmail} type="email" name="email" value={email} />
                   </div>
                   <div className="form-group">
                     <div className="row">
                       <div className="col">
                         <label>Password</label>
                       </div>
                   
                     </div>
                     <input className="form-control" onChange={handlePassword} type="password" name="password" value={password} />
                   </div>
                   <div className="form-group text-center">
                     <button disabled={loading?true:false} onClick={handleLogin} className="btn btn-primary account-btn" >
                       {loading?
                       <div className="spinner-border text-light" role="status">
                       <span className="sr-only">Loading...</span>
                       </div>:
                       "Login"}
                     
                     </button>
                   </div>
                   <div className="account-footer">
                     <p><Link to="/forgotpassword">Forgot Password ?</Link></p>
                   </div>
                 </div>
                 {/* /Account Form */}
               </div>
             </div>
           </div>
         </div>
       </>
       );
    }
 
 
 export default Loginpage;
 