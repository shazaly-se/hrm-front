
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';

const ListRoles = () => {

    const token = Cookies.get("token")
    const [roles, setRoles] = useState([{}]);
    const [departmentid, setDepartmentid] =  useState(0);
    const [departmentname, setDepartmentName] =  useState("");
    const [departmentDelete, setDepartmentDelete] =  useState(0)
    const [showadd, setShowadd] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseadd = () => setShowadd(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
      axios.get(baseUrl+"roles")
      .then(res => {
        //console.log(res.data)
        setRoles(res.data)
      })
      .catch(e=>console.log("sommmsms"))
    }, [])

    function handleChange (e) {
      e.preventDefault(); 
      setDepartmentName(e.target.value) 
    }

    function handleSubmit (event) {
      event.preventDefault();
      const data = {department: departmentname}
      // console.log("data sent",data);

      axios.post(baseUrl+"departments", data)
        .then(res => {
          setShowadd(false)
          // console.log(res);
          // console.log("responded from server", res.data);
        })
    }

    function handleUpdate (event) {
      event.preventDefault();
      const data = {department: departmentname}
      // console.log("data sent",data);

      axios.put(baseUrl+"departments/"+departmentid, data)
        .then(res => {
           console.log(res);
           setShow(false)
          // console.log("responded from server", res.data);
        })
    }

    // function handleSubmit() {
    //   event.preventDefault();
    //   const user = {
    //     name: this.state.name
    //   }
    //   axios.post(baseUrl+"departments", department)
    //     .then(res=>{
    //       console.log(res);
    //       console.log(res.data);
    //       window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    //     })
    // }


    function deleteDepartmnet (e) {
      e.preventDefault();
            
      // const data = {id: departmentname}
     // alert(departmentDelete);

      axios.delete(baseUrl+"departments/"+ departmentDelete)
        .then(res => {
          // window.location.reload()
           console.log("responded from server", res.data);
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
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been Deleted.',
              'success'
            )
          })
   
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
          // setDepartment(pre=>{
          // return pre.filter(department=> department.id != record.id)
          // })
          // department=>department.id !=record)
   
     }

     const onEditDepartment = (record)=>{
      axios.get(baseUrl+"departments/"+ record)
      .then(res=>{
        setDepartmentid(res.data.id)
        setDepartmentName(res.data.department)
        setShow(true)
      }
    
        )

     // setShow(true);
     }

      const columns = [        
   
        {
          title: 'Role Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="" style={{justifyContent:'space-between'}}>
                   <Link className="btn btn-primary m-1"  to={"/app/employee/role-permissions/"+record.id}><i className="fa fa-pencil m-r-5" /> </Link>
                  
          
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
        {/* <Helmet>
            <title>Department - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet> */}

    
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Roles & Permissions</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Roles</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <Link to="/app/employee/new-role" className="btn add-btn" ><i className="fa fa-plus" /> Add Role</Link>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
          <div className="table-responsive">
              
              <Table className="table-striped"
                    pagination= { {total : roles.length,
                      showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={roles}
                    rowKey={record => record.id}
                    // onChange={console.log("change")}
                  />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Department Modal */}

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


   
      <div id="edit_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Department Name <span className="text-danger">*</span></label>
                  <input className="form-control" onChange= {()=>handleChange} defaultValue="IT Management" type="text" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Department Modal */}
      {/* Delete Department Modal */}
      <div className="modal custom-modal fade" id="delete_department" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Department</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" onClick={deleteDepartmnet} className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Department Modal */}
    </div>
        );
}

export default ListRoles;
