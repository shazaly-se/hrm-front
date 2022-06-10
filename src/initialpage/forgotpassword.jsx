/**
 * Signin Firebase
 */

import React, { Component,useState } from 'react';
import { Link  } from 'react-router-dom';
import {Applogo} from '../Entryfile/imagepath.jsx'
import axios from 'axios';
import { baseUrl } from '../Entryfile/BaseUrl.js';
const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");
  const [success,setSuccess] = useState(false);
  const [haserror,setHasError] = useState(false);



  const handleEmail=(e) =>{
    setEmail(e.target.value)
 
   }

   const handleForget = (e) =>{
    e.preventDefault();
   
    const data={email:email}
     setLoading(true)
  axios.post(baseUrl+"reset-password-request",data)
  .then(res => {
    if(res.data.hasError){
      setHasError(true)
      setSuccess(false)
      setMessage(res.data.msg)
      setLoading(false)
      setEmail("");

  }else{
   setSuccess(true)
   setHasError(false)
   setMessage(res.data.msg)
   setLoading(false)
   setEmail("");

  }
    //Cookies.set("token",res.data.token)
    //history.push("/app/main/dashboard")

 }).catch(e=> {
   setLoading(false)
   setEmail("");
  })
  }

      return (
          <>
            {/* <Helmet>
                    <title>Forgot Password - HRMS Admin Template</title>
                    <meta name="description" content="Login page"/>					
            </Helmet> */}
          <div className="account-content">
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Forgot Password?</h3>
                  <p className="account-subtitle">Enter your email to get a password reset link</p>
                  {/* Account Form */}
                  {haserror?
                   <div className='alert alert-danger'><h5>{message}</h5></div>:
                   null
                  }
                  {success?
                       <div className='alert alert-success'><h5>{message}</h5></div>:
                        null
                        }
                    <div className="form-group">
                      <label>Email Address</label>
                      <input className="form-control" onChange={handleEmail} type="email" name="email" value={email} />
                    </div>
                    <div className="form-group text-center">
                    <button disabled={loading?true:false} onClick={handleForget} className="btn btn-primary account-btn" >
                       {loading?
                       <div className="spinner-border text-light" role="status">
                       <span className="sr-only">Loading...</span>
                       </div>:
                       "Reset Password"}
                       </button>
                    </div>
                    <div className="account-footer">
                      <p>Remember your password? <Link to="/login">Login</Link></p>
                    </div>
                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </>
      );
   }



export default ForgotPassword;
