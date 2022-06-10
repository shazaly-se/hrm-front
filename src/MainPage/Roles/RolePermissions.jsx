
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link ,useHistory ,useParams} from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
//import { MultiSelect } from "react-multi-select-component";
import Multiselect from 'multiselect-react-dropdown';


const RolePermissions = () => {
    const history = useHistory();
    const token = Cookies.get("token")
    const [roleName, setRoleName] = useState("");
    const [role, setRole] = useState({});
    const [allpermissions, setAllPermissions] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [departmentid, setDepartmentid] =  useState(0);
    const [departmentname, setDepartmentName] =  useState("");
    const [departmentDelete, setDepartmentDelete] =  useState(0)
    const [showadd, setShowadd] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseadd = () => setShowadd(false);
    const handleClose = () => setShow(false);
    const [selected, setSelected] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let params = useParams()
    useEffect(() => {
      let id = params.id
      axios.get(baseUrl+"role-permissions/"+id)
      .then(res => {
        console.log(res.data)
       setRole(res.data.role)
       setSelected(res.data.permissions)
       setAllPermissions(res.data.allpermissions)
      })
      .catch(e=>console.log("sommmsms"))
    }, [])

    function handleChange (e) {
      e.preventDefault(); 
      setDepartmentName(e.target.value) 
    }

    function handleSubmit (event) {
      event.preventDefault();
      let id = params.id
     const data = {permissions: selected}
     if(selected.length <= 0){
      setHasError(true)
      setErrorMessage("Should select min one permission")
      return
    }

      axios.put(baseUrl+"role-permissions/"+id, data)
        .then(res => {
          Swal.fire(
     
            {
              
              icon: 'success',
              title: 'Successfully Updated!',
              //showConfirmButton: false,
              timer: 1500
            }
          )
          history.push("/app/employee/roles-list")
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


    function deleteDepartmnet (e) {
      e.preventDefault();

      axios.delete(baseUrl+"departments/"+ departmentDelete)
        .then(res => {
          // window.location.reload()
           console.log("responded from server", res.data);
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
                   <a className="btn btn-success m-1"   href={"/app/role-permissions/"+record.id}><i className="fa fa-eye m-r-5" /> </a>
        
              </div>
            ),
        }, 
      ]

      const onSelect = (selectedList, selectedItem) => {
        // console.log(selectedItem)
        setSelected(selectedList)
     }
     
     const onRemove = (selectedList, removedItem)=> {
       setSelected(selectedList)
     }

      return (         
      <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Permissions</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Permissions</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row m-3'>
        {hasError?<div className='alert alert-danger'>{errorMessage}</div>:null}
        </div>
        <div className='row m-3'>
          <h4>Role  : <span className='text-danger'>{role.name}</span></h4>
        </div>
       <div className='row m-3'>
      {/* <MultiSelect
        options={allpermissions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />        */}

            <Multiselect
            options={allpermissions} // Options to display in the dropdown
            selectedValues={selected} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            />

      </div>
      <div className='m-3'>
      <a className="btn btn-primary m-1" onClick={handleSubmit}><i className="fa fa-save m-r-5" />Update Permissions </a>
      </div>
      <div className='row mt-2'>
     
      {selected.length < 1?<h5 className='text-center'>no permissions</h5>:<h4>Permissions:</h4>}
      {selected.map(permission=>(
        <div className="">
        <li class="alert alert-info" key={permission.name}>
        {permission.name}
        </li>
       </div>
         ))}
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

export default RolePermissions;
