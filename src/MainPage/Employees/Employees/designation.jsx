
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import { baseUrl } from '../../../Entryfile/BaseUrl';
import { Grid } from  'react-loader-spinner'


const Designations = () => {
  const token = Cookies.get("token")
  const [hasError, setHasError] =  useState(false);
  const [errorMessage, setErrorMessage] =  useState("");

  const [nameHasError, setNameHasError] =  useState(true);
  const [nameErrorMessage, setNameErrorMessage] =  useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [designation, setDesignation] = useState([{}]);
  const [designationid, setDesignationid] =  useState(0);
  const [designationname, setDesignationname] =  useState("");


  const [departmentname, setDepartmentName] =  useState(null);

  const [departmentDelete, setDepartmentDelete] =  useState(0)
  const [departmentId, setDepartmentId] =  useState(0)

  
  const [department, setDepartment] = useState([{}]);
  const [showadd, setShowadd] = useState(false);
  const handleCloseadd = () => setShowadd(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      axios.get(baseUrl+"designations",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
      .then(res => {
        setDesignation(res.data.designations)
        setIsLoading(false)
      }) 
    }, 1000);

  }, [])

  useEffect(() => {
    axios.get(baseUrl+"departments",{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }})
    .then(res => {
      setDepartment(res.data.departments)
    })
  }, [])

  function handleChange(e){
 
    // e.preventDefault();
    if(e.target.value == null || e.target.value=="" || !e.target.value){
      setNameHasError(true)
      setNameErrorMessage("Designition is required")
    }else{
      setNameHasError(false)
      setNameErrorMessage("")
    setDesignationname(e.target.value)
    }
  }

  function handleChangeDep(e) {
    // e.preventDefault();

    if(e.target.value > 0){
      setHasError(false)
      setErrorMessage("")
    }else{
      setHasError(true)
      setErrorMessage("Department is required")
    }
    setDepartmentId(e.target.value)
  }

  function handleSubmit (event) {
    event.preventDefault();

  
    if(departmentId > 0 && designationname != null && designationname !="" && designationname){
      const data = {department_id: departmentId, designationName: designationname}
      axios.post(baseUrl+"designations", data)
        .then(res => {
          setShowadd(false)
          setDesignation(res.data.designations)
          setDepartmentId(0)
          setDesignationname("")
          Swal.fire({
              icon: 'success',
              title: 'Successfully created!',
              timer: 1500
            }
          )
        })
    }
    else{

      if(designationname == null || designationname =="" || !designationname){
        setNameHasError(true)
        setNameErrorMessage("Designition is required")
        return
      }

      if(departmentId < 1){
        setHasError(true)
        setErrorMessage("Department is required")
        return
      }

   

    }
  }

  function handleUpdate (event) {
    event.preventDefault();
    
    if(departmentId > 0 && designationname != null && designationname !="" && designationname){
    const data = {department_id: departmentId, designationName: designationname}
    // // console.log("data sent",data);

    axios.put(baseUrl+"designations/"+designationid, data)
      .then(res => {
         setShow(false)
         setDesignation(res.data.designations)
         Swal.fire({
            icon: 'success',
            title: 'Successfully updated!',
            timer: 1500
          }
        )
      })
    }
    else{
      if(designationname == null || designationname =="" || !designationname){
        setNameHasError(true)
        setNameErrorMessage("Designition is required")
        return
      }

      if(departmentId < 1){
        setHasError(true)
        setErrorMessage("Department is required")
        return
      }

    }
  }

    useEffect( ()=>{
      if($('.select').length > 0) {
        $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
        });
      }
    }); 


    const onDeleteDesignation =(record) => {
     
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
          axios.delete(baseUrl+"designations/"+ record)
          .then(res => {
            swalWithBootstrapButtons.fire({
              icon: 'success',
              title: 'Successfully Deleted!',
              showConfirmButton: true,
              timer: 1500
          })
          setDesignation(res.data.designations)
          })
   
        } else if (
          /* Read more about handling dismissals below */
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


    
    const onEditDesignation = (record)=>{
      axios.get(baseUrl+"designations/"+ record)
      .then(res=>{
        setDesignationid(res.data.id)
        setDesignationname(res.data.designationName)
        setDepartmentId(res.data.department_id)
        setDepartmentName(res.data.department)
        setShow(true)
      }
    
        )

     // setShow(true);
     }

      const columns = [        
       
        {
          title: 'Designation',
          dataIndex: 'designationName',
          sorter: (a, b) => a.designationName.length - b.designationName.length,
        },
        {
          title: 'Department',
          dataIndex: 'department',
          sorter: (a, b) => a.department.length - b.department.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                   <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" onClick={()=>{onEditDesignation(record.id)}}><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modall"  onClick={()=>{onDeleteDesignation(record.id)}} ><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
        {/* <Helmet>
            <title>Designations - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet> */}
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Designations</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Designations</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" onClick={()=>setShowadd(true)}><i className="fa fa-plus" /> Add Designation</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive" >

            {isLoading? <div style={{justifyContent:'center',display:'flex',alignItems:'center',height:'500px',verticalAlign:'middle'}}><Grid
            //  height="100"
              width="100"
              color='#00c5fb'
              ariaLabel='loading'
            /></div>:
            <Table className="table-striped"
                  pagination= { {total : designation.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={designation}
                  rowKey={record => record.id}
                  // onChange={console.log("change")}
                />
                      }
              
    
              {/* <table className="table table-striped custom-table mb-0 datatable">
                <thead>
                  <tr>
                    <th style={{width: '30px'}}>#</th>
                    <th>Designation </th>
                    <th>Department </th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Web Designer</td>
                    <td>Web Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Web Developer</td>
                    <td>Web Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Android Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>IOS Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>UI Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>UX Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>IT Technician</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Product Manager</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>SEO Analyst</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Front End Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Front End Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>Systems Engineer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>Systems Administrator</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>Technical Lead</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td>Quality Assurance</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Designation Modal */}


      <Modal show={showadd}
        onHide={handleCloseadd}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="form-group">
                  <label>Designation Name <span className="text-danger">*</span></label>
                  <input className="form-control" onChange={handleChange} type="text" />
                  {nameHasError?<span className='text-danger'>{nameErrorMessage}</span>:null}
                </div>
                <div className="form-group">
                  <label>Department <span className="text-danger">*</span></label>
                  <select onChange={handleChangeDep} className="form-control" >
                    <option>Select Department</option>
                    {department.map((dep, i) => (
                        <option value={dep.id} >{dep.department}</option> 
                    ))}

                  </select>
                  {hasError?<span className='text-danger'>{errorMessage}</span>:null}
                </div>
        
        </Modal.Body>
        <Modal.Footer>
          
        <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Submit</button>
        
        </Modal.Footer>
      </Modal>

      
      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="form-group">
                  <label>Designation Name <span className="text-danger">*</span></label>
                  <input className="form-control" value={designationname} onChange={handleChange} type="text" />
                </div>
                <div className="form-group">
                  <label>Department <span className="text-danger">*</span></label>
                  <select onChange={handleChangeDep} className="form-control" >
                    <option value={departmentId}>{departmentname}</option>
                    {department.map((dep, i) => (
                        <option value={dep.id} >{dep.department}</option> 
                    ))}

                  </select>
                </div>
        
        </Modal.Body>
        <Modal.Footer>
          
        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>Update</button>
        
        </Modal.Footer>
      </Modal>
      {/* /Add Designation Modal */}
      {/* Edit Designation Modal */}
      <div id="edit_designation" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Designation</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Designation Name <span className="text-danger">*</span></label>
                  <input className="form-control" defaultValue="Web Developer" type="text" />
                </div>
                <div className="form-group">
                  <label>Department <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Select Department</option>
                    <option>Web Development</option>
                    <option>IT Management</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Designation Modal */}
      {/* Delete Designation Modal */}
      <div className="modal custom-modal fade" id="delete_designation" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Designation</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Delete</a>
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
      {/* /Delete Designation Modal */}
    </div>
        );
}

export default Designations;
