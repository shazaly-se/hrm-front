
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link ,useHistory ,useParams} from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';

import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import { MultiSelect } from "react-multi-select-component";


const NewAccount = () => {
    const token = Cookies.get("token")
    const history = useHistory();
    const [accounttypes, setAccounttypes] = useState([]);
    const [type_id, setType_id] =  useState(0);
    const [code, setCode] = useState(0);
    const [name, setName] = useState("");




      useEffect(() => {
        axios.get(baseUrl+"accounttype")
        .then(res => {
            setAccounttypes(res.data.accounttypes)
        })
        .catch(e=>console.log("sommmsms"))
      }, [])

      const handleType =(event) =>{
        setType_id(event.target.value)

      }
      const handleCode=(event) =>{
          event.preventDefault();
          setCode(event.target.value)
      }
      const handleName =(event) =>{
          setName(event.target.value)
    }

    function handleSubmit (event) {
       event.preventDefault();
    //   let id = params.id
      const data = {acc_type: type_id,code:code,account_Name:name}
    
      axios.post(baseUrl+"accounts",data)
      .then(res =>{
    
        
         Swal.fire(
            'Success!',
             'Successfully added!',
            'success'
           )

           history.push("/app/employee/accounts")
      
      })


    }


      return (         
      <div className="page-wrapper">
      <div className="content container-fluid">

        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Accounts</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/accounts">All Accounts</Link></li>
                <li className="breadcrumb-item active">New Acount</li>
              </ul>
            </div>
        
          </div>
        </div>
     
    
       
       <div className='row m-3'>
           <div className='col-md-4'>
                       <label>Main acount</label>
                       <select className='form-control' onChange={handleType}>
                       <option  value="0">all</option>
                           {accounttypes.map(accounttype =>(
                                  <option key={accounttype.id} value={accounttype.id}>{accounttype.Category}</option>  
                           ))}
                    
                       </select>
           </div>
           <div className='col-md-8'>
<label>Account code</label>
<input type="text" className='form-control' onChange={handleCode} /> 
</div>

      </div>

      <div className="row m-4">
      <label >Account name</label>
      <input type="text"  className='form-control' onChange={handleName} />
       </div>
      <div className='m-3'>
      <a className="btn btn-primary m-1" onClick={handleSubmit}><i className="fa fa-save m-r-5" />Submit </a>
      </div>

      </div>


    </div>
        );
}

export default NewAccount;
