
import React, { useState,useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_09, Avatar_02,Avatar_03, Avatar_05, Avatar_08, Avatar_10,Avatar_15,Avatar_20, Avatar_24,Avatar_25  } from "../../../Entryfile/imagepath"

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import axios from 'axios';
import Swal from 'sweetalert2'
import { baseUrl, baseUrlImage } from '../../../Entryfile/BaseUrl';
import { Grid } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Attendance = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [attends, setAttends] = useState([]);
  const [searchedName,setSearchedName] = useState("");
  const [start_date,setStart_date] =useState(null)
  const [end_date,setEnd_date] =useState(null)

  // search
  const [selected_leave_type, setSelected_leave_type] = useState(0);
  const [selected_leave_status, setSelected_leave_status] = useState(0);

  // top statistics
  const [pending, setPending] = useState(0);
  const [today, setToday] = useState(0);
  const [all, setAll] = useState(0);
  const [planed, setPlaned] = useState(0);
  const [unplaned, setUnplaned] = useState(0);
    // useEffect( ()=>{
    //   if($('.select').length > 0) {
    //     $('.select').select2({
    //       minimumResultsForSearch: -1,
    //       width: '100%'
    //     });
    //   }
    // });  

    useEffect(() => {
      setIsLoading(true)
      setTimeout(() => {
        axios.get(baseUrl+"attendmanagements")
        .then(res => {
            setAttends(res.data.attends)
           setIsLoading(false)
        })
      }, 2000);

    }, [])

    const searchByName = (e)=>{
      e.preventDefault();
      setSearchedName(e.target.value)
  
    }

    const handleStartDate =(e) => {
      
     setStart_date(e.target.value)

    }
    const handleEndDate =(e) => {
     setEnd_date(e.target.value)
   
    }

    const handleNew =(record) => {

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
     const data={id:record,status:1}
      axios.post(baseUrl+"leaves", data)
      .then(res => {
        swalWithBootstrapButtons.fire(
          'Updated!',
          'Your file has been Updated.',
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
   
    }

    const handlePending =(record) => {
      const data={id:record,status:2}
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
      axios.post(baseUrl+"leaves", data)
      .then(res => {
        swalWithBootstrapButtons.fire(
          'Updated!',
          'Your file has been Updated.',
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
   
  

    }
    const handleApproved =(record) => {
      const data={id:record,status:3}
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
      axios.post(baseUrl+"leaves", data)
      .then(res => {
        swalWithBootstrapButtons.fire(
          'Updated!',
          'Your file has been Updated.',
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
   
  

    }
    const handleDeclined =(record) => {
      const data={id:record,status:4}
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
      axios.post(baseUrl+"leaves", data)
      .then(res => {
        swalWithBootstrapButtons.fire(
          'Updated!',
          'Your file has been Updated.',
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
   
    }




    const handleSearch = ()=>{
      const data ={searchedName:searchedName,selected_leave_type,selected_leave_status,start_date:start_date,end_date:end_date}
      setIsLoading(true)
      axios.post(baseUrl+"attendsearch", data)
      .then(res => {
         setAttends(res.data.attends)
         setIsLoading(false)
      })
    }

      const columns = [
        {
          title: 'Employee',
          dataIndex: 'fullname',
          render: (text, record) => (            
              <h2 className="table-avatar">
                <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={baseUrlImage+"uploads/profiles/"+record.image} style={{height:'37px'}} /></Link>
                <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
              </h2>
            ), 
            sorter: (a, b) => a.fullname.length - b.fullname.length,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          sorter: (a, b) => a.date.length - b.date.length,
        },

        {
          title: 'Check In',
          dataIndex: 'check_in',
          sorter: (a, b) => a.check_in.length - b.check_in.length,
        },
        {
          title: 'Go Break',
          dataIndex: 'goBreak',
          sorter: (a, b) => a.goBreak.length - b.goBreak.length,
        },

        {
          title: 'Back from Break',
          dataIndex: 'resume', 
          sorter: (a, b) => a.resume.length - b.resume.length,
        },
        {
          title: 'Back from Break',
          dataIndex: 'taken_time_in_min', 
          sorter: (a, b) => a.taken_time_in_min.length - b.taken_time_in_min.length,
        },
      
        {
            title: 'Check Out',
            dataIndex: 'check_out', 
            sorter: (a, b) => a.check_out.length - b.check_out.length,
          },
          // {
          //   title: 'Regular Hours',
          //   dataIndex: 'regular_hours', 
          //   sorter: (a, b) => a.regular_hours.length - b.regular_hours.length,
          // },
          // {
          //   title: 'Worked Hours',
          //   dataIndex: 'total_worked_hours', 
          //   sorter: (a, b) => a.total_worked_hours.length - b.total_worked_hours.length,
          // },
      

          // {
          //   title: 'Total Deduct',
          //   dataIndex: 'total_deduct', 
          //   sorter: (a, b) => a.total_deduct.length - b.total_deduct.length,
          // },
       
        // {
        //   title: 'Action',
        //   render: (text, record) => (
        //     <a className="btn btn-warning" href="#" ><i className="fa fa-eye m-r-5" /> Details</a>

        //       // <div className="dropdown dropdown-action text-end">
        //       //   <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
        //       //           <div className="dropdown-menu dropdown-menu-right">
        //       //             <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_leave"><i className="fa fa-pencil m-r-5" /> Edit</a>
        //       //             <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_approve"><i className="fa fa-trash-o m-r-5" /> Delete</a>
        //       //           </div>
        //       // </div>
        //     ),
        // },
      ]

      return (         
      <div className="page-wrapper">
 
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Attendance</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Attendance</li>
              </ul>
            </div>
     
          </div>
        </div>
        {/* /Page Header */}
        {/* Leave Statistics */}

        {/* /Leave Statistics */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-12">  
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" onChange={searchByName}  />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-12">
            <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date" onChange={handleStartDate} />
                <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-12">  
            <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date" onChange={handleEndDate} />
                <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-12">  
            <a onClick={handleSearch} className="btn btn-success btn-block w-100"> Search </a>  
          </div>     
        </div>
        {/* /Search Filter */}
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
                   pagination= { {total : attends.length,
                     showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                     showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                   style = {{overflowX : 'auto'}}
                   columns={columns}                 
                   // bordered
                   dataSource={attends}
                   rowKey={record => record.id}
                 />
            }
       
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Leave Modal */}
      <div id="add_leave" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Leave</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Leave Type <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Select Leave Type</option>
                    <option>Casual Leave 12 Days</option>
                    <option>Medical Leave</option>
                    <option>Loss of Pay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>From <span className="text-danger">*</span></label>
                  <div>
                    <input className="form-control datetimepicker" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To <span className="text-danger">*</span></label>
                  <div>
                    <input className="form-control datetimepicker" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Number of days <span className="text-danger">*</span></label>
                  <input className="form-control" readOnly type="text" />
                </div>
                <div className="form-group">
                  <label>Remaining Leaves <span className="text-danger">*</span></label>
                  <input className="form-control" readOnly defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>Leave Reason <span className="text-danger">*</span></label>
                  <textarea rows={4} className="form-control" defaultValue={""} />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Leave Modal */}
      {/* Edit Leave Modal */}
      <div id="edit_leave" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Leave</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Leave Type <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Select Leave Type</option>
                    <option>Casual Leave 12 Days</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>From <span className="text-danger">*</span></label>
                  <div>
                    <input className="form-control datetimepicker" defaultValue="01-01-2019" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To <span className="text-danger">*</span></label>
                  <div>
                    <input className="form-control datetimepicker" defaultValue="01-01-2019" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Number of days <span className="text-danger">*</span></label>
                  <input className="form-control" readOnly type="text" defaultValue={2} />
                </div>
                <div className="form-group">
                  <label>Remaining Leaves <span className="text-danger">*</span></label>
                  <input className="form-control" readOnly defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>Leave Reason <span className="text-danger">*</span></label>
                  <textarea rows={4} className="form-control" defaultValue={"Going to hospital"} />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Leave Modal */}
      {/* Approve Leave Modal */}
      <div className="modal custom-modal fade" id="approve_leave" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Leave Approve</h3>
                <p>Are you sure want to approve for this leave?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Approve</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Decline</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Approve Leave Modal */}
      {/* Delete Leave Modal */}
      <div className="modal custom-modal fade" id="delete_approve" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave</h3>
                <p>Are you sure want to delete this leave?</p>
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

export default Attendance;
