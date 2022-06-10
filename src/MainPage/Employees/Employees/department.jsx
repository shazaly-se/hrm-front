
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../../Entryfile/BaseUrl';
import { Grid } from  'react-loader-spinner'


const Department = () => {

    const token = Cookies.get("token")
    const [isLoading, setIsLoading] = useState(false);

    const [department, setDepartment] = useState([{}]);
    const [departmentid, setDepartmentid] =  useState(0);
    const [departmentname, setDepartmentName] =  useState("");
    const [showadd, setShowadd] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseadd = () => setShowadd(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
      setIsLoading(true)
      setTimeout(() => {
        axios.get(baseUrl+"departments",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(res => {
          setDepartment(res.data.departments)
          setIsLoading(false)
        })
        .catch(e=>{
          setIsLoading(false)
          console.log("sommmsms")}) 
      }, 1000);
 
    }, [])

    function handleChange (e) {
      e.preventDefault(); 
      setDepartmentName(e.target.value) 
    }

    function handleSubmit (event) {
      event.preventDefault();
      const data = {department: departmentname}
      axios.post(baseUrl+"departments", data)
        .then(res => {
          setShowadd(false)
          setDepartment(res.data.departments)
          Swal.fire({
              icon: 'success',
              title: 'Successfully created!',
              timer: 1500
            }
          )
        
        })
    }

    function handleUpdate (event) {
      event.preventDefault();
      const data = {department: departmentname}
      axios.put(baseUrl+"departments/"+departmentid, data)
        .then(res => {
           setShow(false)
           setDepartment(res.data.departments)
           Swal.fire({            
              icon: 'success',
              title: 'Successfully updated!',          
              timer: 1500
            }
          )
       
        })
    }

     const onDeleteDepartment =(record) => {
            
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(baseUrl+"departments/"+ record)
          .then(res => {
            swalWithBootstrapButtons.fire({
            
              icon: 'success',
              title: 'Successfully Deleted!',
              showConfirmButton: true,
              timer: 1500
            }
            )
            setDepartment(res.data.departments)
          })
   
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            {
            
              icon: 'error',
              title: 'Your imaginary file is safe!',
              showConfirmButton: true,
              timer: 1500
            }
         
          )
        }
      })
          
   
     }

     const onEditDepartment = (record)=>{
      axios.get(baseUrl+"departments/"+ record)
      .then(res=>{
        setDepartmentid(res.data.id)
        setDepartmentName(res.data.department)
        setShow(true)
      }
    
        )
     }

      const columns = [        
   
        {
          title: 'Department',
          dataIndex: 'department',
          sorter: (a, b) => a.department.length - b.department.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                  <a className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item"   onClick={()=>{onEditDepartment(record.id)}}><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item"    onClick={()=>{onDeleteDepartment(record.id)}} ><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
        <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Department Name <span className="text-danger">*</span></label>
           <input className="form-control" value={departmentname} onChange={handleChange} type="text" />
           </div>
        
        </Modal.Body>
        <Modal.Footer>
          
        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>Update</button>
        
        </Modal.Footer>
      </Modal>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Department</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Department</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a  className="btn add-btn" onClick={()=>setShowadd(true)}><i className="fa fa-plus" /> Add Department</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
          <div className="table-responsive" style={{alignItems:'center'}}>
          {isLoading? <div style={{justifyContent:'center',display:'flex',alignItems:'center',height:'500px',verticalAlign:'middle'}}><Grid
  //  height="100"
    width="100"
    color='#00c5fb'
    ariaLabel='loading'
  /></div>:
  <Table className="table-striped"
  pagination= { {total : department.length,
    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
  style = {{overflowX : 'auto'}}
  columns={columns}                 
  // bordered
  dataSource={department}
  rowKey={record => record.id}
  // onChange={console.log("change")}
/>
            }

              
     
            </div>
          </div>
        </div>
      </div>

      <Modal show={showadd}
        onHide={handleCloseadd}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title><h5 className="modal-title">Add Department</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
                  <label>Department Name <span className="text-danger">*</span></label>
                  <input className="form-control" value={departmentname} onChange={handleChange} type="text" />
                </div>
        
        </Modal.Body>
        <Modal.Footer> 
        <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Save</button>
        </Modal.Footer>
      </Modal>

    </div>
        );
}

export default Department;
