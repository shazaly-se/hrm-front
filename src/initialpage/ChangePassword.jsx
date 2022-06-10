/**
 * Signin Firebase
 */

 import React, { Component,useState } from 'react';
 import { Link,useParams } from 'react-router-dom';
 import {Applogo} from '../Entryfile/imagepath.jsx'
 import axios from 'axios';
 import { baseUrl } from '../Entryfile/BaseUrl.js';
 const ChangePassword = () => {
   const [password,setPassword] = useState("");
   const [repassword,setRePassword] = useState("");
   const [message,setMessage] = useState("");
   const [haserror,setHasError] = useState(false);
   const [success,setSuccess] = useState(false);


   const [loading,setLoading] = useState(false);

   const params = useParams()

 
   const handlePassword=(e) =>{
     setPassword(e.target.value)
  
    }

    const handleRePassword=(e) =>{
        setRePassword(e.target.value)
     
       }
 
    const handleUpdate = (e) =>{
     e.preventDefault();
     const data={password:password,password_confirmation:repassword,email:params.email,token:params.token}
      setLoading(true)
   axios.post(baseUrl+"change-password",data)
   .then(res => {
       if(res.data.hasError){
        setHasError(true)
        setSuccess(false)
        setMessage(res.data.msg)
        setLoading(false)
        setPassword("")
        setRePassword("")
       }else{
        setSuccess(true)
        setHasError(false)
        setMessage(res.data.msg)
        setLoading(false)
        setPassword("")
        setRePassword("")
       }
     //Cookies.set("token",res.data.token)
    // setLoading(false)
     //history.push("/app/main/dashboard")
 
  }).catch(e=> {
        setLoading(false)
        setPassword("")
        setRePassword("")
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
                   <h3 className="account-title">Rest Password</h3>
                   <p className="account-subtitle">new password</p>
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
                       <label>New Password</label>
                       <input className="form-control" onChange={handlePassword} type="password" name="password" value={password} />
                     </div>

                     <div className="form-group">
                       <label>Re-write Password</label>
                       <input className="form-control" onChange={handleRePassword} type="password" name="repassword" value={repassword} />
                     </div>
                     <div className="form-group text-center">
                     <button disabled={loading?true:false} onClick={handleUpdate} className="btn btn-primary account-btn" >
                        {loading?
                        <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>:
                        "Save"}
                        </button>
                     </div>
                     <div className="account-footer">
                     </div>
                   {/* /Account Form */}
                 </div>
               </div>
             </div>
           </div>
         </>
       );
    }
 
 
 
 export default ChangePassword;
 