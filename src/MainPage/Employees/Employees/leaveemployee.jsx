
import React, { useState,useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02,Avatar_05,Avatar_09,Avatar_10, Avatar_03,Avatar_08,Avatar_15,Avatar_20,Avatar_25,Avatar_24  } from "../../../Entryfile/imagepath"
import Cookies from 'js-cookie';
import { baseUrl } from '../../../Entryfile/BaseUrl';
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"

const LeaveEmployee = () => {
  
  // const id= props.match.params.id;

    useEffect( ()=>{
      if($('.select').length > 0) {
        $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
        });
      }
    }); 
    
    const token = Cookies.get("token")

    const [leaveList, setLeaveList] = useState([])
    const [leaveTypes, setLeaveType] = useState([])
    const [selected_leave_type_id, setSelected_leave_type_id] = useState(0);
    const [selected_leave_type_name, setSelected_leave_type_name] = useState("");
    const [start_date,setStart_date] =useState("")
    const [end_date,setEnd_date] =useState("")
    const [reason,setReason] =useState()
    const [leave_id, setLeaveid] =  useState(0)
    const [numberofdays,setNumberOfDays] = useState(0)

    const [showadd, setShowadd] = useState(false);
    const handleCloseadd = () => setShowadd(false);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
 
    
    useEffect(()=>{
      axios.get(baseUrl+"leave",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }}).then(res => {
          setLeaveList(res.data.leaves)
          setLeaveType(res.data.leavetypes)
    
      })
      // console.log("leave", leaveList)
    },[])

 


   const handleLeavetype =(e) => {
    setSelected_leave_type_id(e.target.value)
  
   }
   const handleStartDate =(e) => {
    setStart_date(e.target.value)
    const diffInMs   = new Date(end_date) - new Date(e.target.value)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    //setNumberOfDays(diffInDays)
    $("#numberofdays").val(diffInDays)
   }
   const handleEndDate =(e) => {
    setEnd_date(e.target.value)
    const diffInMs   = new Date(e.target.value) - new Date(start_date)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
   // setNumberOfDays(diffInDays)
   $("#numberofdays").val(diffInDays)
  
   }
   const handleReason =(e) => {
    setReason(e.target.value)
  

   }



   const addLeave = (e) => {
     e.preventDefault()
      const data = {leave_type:selected_leave_type_id,start_date:start_date,end_date:end_date,reason:reason}
 

  
   
     axios.post(baseUrl+"leave", data,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }}).then(res=>{
      //  console.log("leave response", res.data)
       window.location.reload();
     })
  }    
  const onDeleteLeave =(record) => {
       axios.delete(baseUrl+"leave/"+ record,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
       .then(res => {
          window.location.reload()
          console.log("deleted the departement successfully", res.data);
       })
  
  }

  const onEditLeave =(record)=>{
    axios.get(baseUrl+"leave/"+ record,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }})
      .then(res=>{
        setSelected_leave_type_id(res.data.leavetypeid)
        setSelected_leave_type_name(res.data.leavetype)
        setStart_date(res.data.start_date)
        setEnd_date(res.data.end_date)
        setReason(res.data.reason)
        setLeaveid(res.data.id)
        setShow(true)
      }
    
        )

  }
  const updateLeave = (e) => {
    const data = {leave_type:selected_leave_type_id,start_date:start_date,end_date:end_date,reason:reason}

     axios.put(baseUrl+"leave/"+leave_id, data,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }}).then(res=>{
        setShow(false)
       //window.location.reload;
     })
  }
  // $('#edit_leave').on('show.bs.modal', function(e) {
  //   var leaveId = $(e.relatedTarget).data('leave-id');
  //   $(e.currentTarget).find('button[name="leaveId"]').val(leaveId);

  //   console.log("clicked", leaveId)
  // });
    // console.log(leaveList)
      const columns = [
        {
          title: 'Leave Type',
          dataIndex: 'leavetype',
          sorter: (a, b) => a.leavetype.length - b.leavetype.length,
        },

        {
          title: 'From',
          dataIndex: 'start_date',
          sorter: (a, b) => a.start_date.length - b.start_date.length,
        },
        {
          title: 'To',
          dataIndex: 'end_date',
          sorter: (a, b) => a.end_date.length - b.end_date.length,
        },

        {
          title: 'No Of Days',
          dataIndex: 'number_of_date', 
          sorter: (a, b) => a.number_of_date.length - b.number_of_date.length,
        },
      
        {
          title: 'Reason',
          dataIndex: 'reason',
          sorter: (a, b) => a.reason.length - b.reason.length,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (text, record) => (
            <div className="action-label text-center">
              <a className="btn btn-white btn-sm btn-rounded" >
                <i className={text==="New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
              "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success" 
              :"fa fa-dot-circle-o text-danger" } /> {text}
              </a>
            </div>
            ),
        },
        {
          title: 'By',
          dataIndex: 'name',
          render: (text, record) => (            
              <h2 className="table-avatar">
                <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
                <Link to="/app/profile/employee-profile">{text} </Link>
              </h2>
            ), 
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a  className="dropdown-item" onClick={()=>{onEditLeave(record.id)}}><i className="fa fa-pencil m-r-5" /> Edit</a>
                  <a className="dropdown-item" href="#" onClick={()=>{onDeleteLeave(record.id)}}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                </div>
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
              <h3 className="page-title">Leaves</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Leaves</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a  className="btn add-btn" onClick={()=>setShowadd(true)}><i className="fa fa-plus" /> Add Leave</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Leave Statistics */}
        <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Annual Leave</h6>
              <h4>12</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Medical Leave</h6>
              <h4>3</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Other Leave</h6>
              <h4>4</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Remaining Leave</h6>
              <h4>5</h4>
            </div>
          </div>
        </div>
        {/* /Leave Statistics */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              
               <Table className="table-striped"
                  pagination= { {total : leaveList.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={leaveList}
                  rowKey={record => record.id}
                  // onChange={console.log("change")}
                />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Leave Modal */}
  

      <Modal show={showadd}
        onHide={handleCloseadd}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
                  <label>Leave Type <span className="text-danger">*</span></label>
                  <select className=" form-control" onChange={handleLeavetype}> 
              <option value="0"> -- Select -- </option>
              {leaveTypes.map(leavetype=>(
                 <option value={leavetype.id}> {leavetype.name} </option> 
              ))}
              </select>
                </div>
                <div className="form-group">
                  <label>From <span className="text-danger">*</span></label>
                  <div>
                    <input name="start_date" onChange={handleStartDate} className="form-control" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To <span className="text-danger">*</span></label>
                  <div>
                    <input name="end_date" onChange={handleEndDate} className="form-control" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Number of days <span className="text-danger">*</span></label>
                  <input name="number_of_date" id='numberofdays'   className="form-control" readOnly type="text" />
                </div>
                <div className="form-group">
                  <label>Remaining Leaves <span className="text-danger">*</span></label>
                  <input name="remaining"  className="form-control" readOnly defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>Leave Reason <span className="text-danger">*</span></label>
                  <textarea name="reason" onChange={handleReason} rows={9} className="form-control" defaultValue={""} />
                </div>
        
        </Modal.Body>
        <Modal.Footer>
          
        <button className="btn btn-primary submit-btn" onClick={addLeave}>Submit</button>
        
        </Modal.Footer>
      </Modal>


      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
                  <label>Leave Type <span className="text-danger">*</span></label>
                  <select name="leave_type" onClick={handleLeavetype} className="form-control">
                  <option value={selected_leave_type_id}>{selected_leave_type_name}</option>
                     {leaveTypes.map((leave)=>(
                       <option value={leave.id}>{leave.name}</option>
                     ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>From <span className="text-danger">*</span></label>
                  <div>
                    <input name="start_date" value={start_date} onChange={handleStartDate} className="form-control" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To <span className="text-danger">*</span></label>
                  <div>
                    <input name="end_date" value={end_date} onChange={handleEndDate} className="form-control" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Number of days <span className="text-danger">*</span></label>
                  <input name="number_of_date"  className="form-control" readOnly type="text" />
                </div>
                <div className="form-group">
                  <label>Remaining Leaves <span className="text-danger">*</span></label>
                  <input name="remaining"  className="form-control" readOnly defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>Leave Reason <span className="text-danger">*</span></label>
                  <textarea name="reason" value={reason} onChange={handleReason} rows={9} className="form-control" defaultValue={""} />
                </div>
        
        </Modal.Body>
        <Modal.Footer>
          
        <button className="btn btn-primary submit-btn" onClick={updateLeave}>Update</button>
        
        </Modal.Footer>
      </Modal>
      {/* /Add Leave Modal */}
      {/* Edit Leave Modal */}

      {/* /Edit Leave Modal */}
      {/* Delete Leave Modal */}
      <div className="modal custom-modal fade" id="delete_approve" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave</h3>
                <p>Are you sure want to Cancel this leave?</p>
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
      {/* /Delete Leave Modal */}
    </div>
        );
  }

export default LeaveEmployee;
