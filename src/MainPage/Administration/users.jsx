/**
 * Signin Firebase
 */

import React, { useState,useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Grid } from  'react-loader-spinner'


import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import axios from 'axios';
import { baseUrl,baseImageUrl } from '../../Entryfile/BaseUrl';
const Users = () => {

  const [users,setUsers] = useState([])
  const [roles,setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    axios.get(baseUrl+"roles").then(res=>{
        setRoles(res.data)
    })

  }, [])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      axios.get(baseUrl+"users")
      .then(res => {
        setIsLoading(false)
        setUsers(res.data.users)
      })
      .catch(e=>{setIsLoading(false)
        console.log("sommmsms")}) 
    }, 2000);
  
     }, [])

    const columns = [
      
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (            
            <h2 className="table-avatar">
              <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
              <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
            </h2>
          ), 
          sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
      },

 
    
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        sorter: (a, b) => a.created_date.length - b.created_date.length,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, record) => (
            <span className={text ==="Admin" ? "badge bg-inverse-danger" :  "badge bg-inverse-success" }
           >{text}</span>
          ),
        sorter: (a, b) => a.role.length - b.role.length,
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
              <a className="btn btn-primary m-1"  href={"/app/administrator/user/"+record.id}><i className="fa fa-pencil m-r-5" /> </a>
              <a className="btn btn-danger m-1"  ><i className="fa fa-trash m-r-5" /> </a>

              {/* <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div> */}
            </div>
          ),
      },
    ]
      return ( 
            <div className="page-wrapper">
        
              {/* Page Content */}
              <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Users</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                      </ul>
                    </div>
                    <div className="col-auto float-end ml-auto">
                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User</a>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                {/* Search Filter */}
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" />
                      <label className="focus-label">Name</label>
                    </div>
                  </div>
        
                  <div className="col-sm-6 col-md-3"> 
                    <div className="form-group form-focus select-focus">
                      <select className="form-control"> 
                        <option>Select Role</option>
                        {roles.map(role=>(
                            <option value={role.id}>{role.name} </option>
                        ))}
                   
                      </select>
                      <label className="focus-label">Role</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">  
                    <a href="#" className="btn btn-success btn-block w-100"> Search </a>  
                  </div>     
                </div>
                {/* /Search Filter */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                    {isLoading? <div style={{justifyContent:'center',display:'flex',alignItems:'center',height:'500px',verticalAlign:'middle'}}><Grid
            //  height="100"
              width="100"
              color='#00c5fb'
              ariaLabel='loading'
            /></div>:
                  <Table className="table-striped"
                  pagination= { {total : users.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={users}
                  rowKey={record => record.id}
                  // onChange={this.handleTableChange}
                />
                      }
            
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Content */}
              {/* Add User Modal */}

              {/* /Delete User Modal */}
            </div>

      );
  }

export default Users;
