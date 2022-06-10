import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Select, Modal,DatePicker } from "antd";
import moment from 'moment';
// import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
// import "../../antdstyle.css"
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, baseUrlImage } from "../../../Entryfile/BaseUrl";
import { Grid } from "react-loader-spinner";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

const LeaveAdmin = () => {
  const token = Cookies.get("token")
  const [isLoading, setIsLoading] = useState(false);
  const [leaveTypes, setLeaveType] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selected_employee_id, setSelected_employee_id] = useState(0);
  const [selected_employee_name, setSelected_employee_name] = useState(0);
  const [selected_leave_type_id, setSelected_leave_type_id] = useState(0);
  const [selected_leave_type_name, setSelected_leave_type_name] = useState("");
  const [reason, setReason] = useState();
  const [leave_id, setLeaveid] =  useState(0)
  const [leaves, setLeaves] = useState([]);
  const [leavestatus, setLeaveStatus] = useState([]);

  const [searchedName, setSearchedName] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);

  // search
  const [selected_leave_type, setSelected_leave_type] = useState(0);
  const [selected_leave_status, setSelected_leave_status] = useState(0);
  const [selected_leave_status_name, setSelected_leave_status_name] = useState("");

  // top statistics
  const [pending, setPending] = useState(0);
  const [today, setToday] = useState(0);
  const [all, setAll] = useState(0);
  const [planed, setPlaned] = useState(0);
  const [unplaned, setUnplaned] = useState(0);
  const [showadd, setShowadd] = useState(false);

  const handleCloseadd = () => {
    setSelected_employee_id(0)
    setSelected_leave_type_id(0)
    setStart_date(null)
    setEnd_date(null)
    setReason("")
    setShowadd(false)
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelected_employee_id(0)
    setSelected_leave_type_id(0)
    setStart_date(null)
    setEnd_date(null)
    setReason("")
    setSelected_leave_type_name("")
    setSelected_employee_name("")
    setShow(false);
  }
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  useEffect(() => {
    getData();
    // setTimeout(() => {

    //  }, 2000);
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await axios.get(baseUrl + "leaves").then((res) => {
      if (res.data) {
      
        setEmployees(res.data.employees);
        setLeaves(res.data.leaves);
        setLeaveStatus(res.data.leavestatus);
        setLeaveType(res.data.leavetypes);
        setPending(res.data.pending[0]["status_count"]);
        setToday(res.data.today[0]["status_count"]);
        setAll(res.data.all[0]["status_count"]);
        setPlaned(res.data.planed[0]["leave_count"]);
        setUnplaned(res.data.unplaned[0]["leave_count"]);
      }
      setIsLoading(false);
    });
  };

  const searchByName = (e) => {
    e.preventDefault();
    setSearchedName(e.target.value);
  };

  const handleEmployee = (e,employee_id) =>{
  
    setSelected_employee_id(e)
  }
  const handleStartDate = (date, dateString) => {
    setStart_date(dateString);
  };
  const handleEndDate = (date, dateString) => {
    setEnd_date(dateString);
  };
  const handleReason = (e) => {
    setReason(e.target.value);
  };
  const handleLeavetype = (e) => {
    setSelected_leave_type_id(e.target.value);
  };

  const addLeave = (e) => {
    e.preventDefault();
    
  
    const data = {
      leave_type: selected_leave_type_id,
      employee_id: selected_employee_id,
      start_date: start_date,
      end_date: end_date,
      reason: reason,
    };
    //setShowadd(false)



    axios.post(baseUrl + "employeeleave", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSelected_employee_id(0)
        setSelected_leave_type_id(0)
        setStart_date(null)
        setEnd_date(null)
        setReason("")
        setShowadd(false)
        setLeaves(res.data.leaves);
        setPending(res.data.pending[0]["status_count"]);
        setToday(res.data.today[0]["status_count"]);
        setAll(res.data.all[0]["status_count"]);
        setPlaned(res.data.planed[0]["leave_count"]);
        setUnplaned(res.data.unplaned[0]["leave_count"]);
        Swal.fire({            
          icon: 'success',
          title: 'Successfully updated!',          
          timer: 1500
        }
      )

     
    
      });
  };

  const onEditLeave =(record)=>{
    axios.get(baseUrl+"employeeleave/"+ record,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }})
      .then(res=>{

        setSelected_leave_type_id(res.data.leave_type)
        setSelected_leave_type_name(res.data.leavetype)
        setSelected_employee_id(res.data.employee_id)
        setSelected_employee_name(res.data.fullname)
        setSelected_leave_status(res.data.status_id)
        setSelected_leave_status_name(res.data.status)
        setStart_date(res.data.start_date)
        setEnd_date(res.data.end_date)
        setReason(res.data.reason)
        setLeaveid(res.data.id)
        setShow(true)
      }
    
        )

  }

  const updateLeave = (e) => {
    const data = {
      leave_type: selected_leave_type_id,
      employee_id: selected_employee_id,
      start_date: start_date,
      end_date: end_date,
      reason: reason,
    };
  

    axios.put(baseUrl + "employeeleave/" + leave_id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setShow(false);
        //window.location.reload;
      });
  };

  
  const handlePending = (record) => {
    const data = { id: record, status: 1 };
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(baseUrl + "leaves", data).then((res) => {
            setLeaves(res.data.leaves);
            setPending(res.data.pending[0]["status_count"]);
            setToday(res.data.today[0]["status_count"]);
            setAll(res.data.all[0]["status_count"]);
            setPlaned(res.data.planed[0]["leave_count"]);
            setUnplaned(res.data.unplaned[0]["leave_count"]);
            swalWithBootstrapButtons.fire(
              
              {            
                icon: 'success',
                title: 'Successfully updated!',          
                timer: 1500
              }
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            {            
              icon: 'error',
              title: 'Your imaginary file is safe :)',          
              timer: 1500
            }
           
          );
        }
      });
  };
  const handleApproved = (record) => {
    const data = { id: record, status: 2 };
    

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(baseUrl + "leaves", data).then((res) => {
            setLeaves(res.data.leaves);
            setPending(res.data.pending[0]["status_count"]);
            setToday(res.data.today[0]["status_count"]);
            setAll(res.data.all[0]["status_count"]);
            setPlaned(res.data.planed[0]["leave_count"]);
            setUnplaned(res.data.unplaned[0]["leave_count"]);
            swalWithBootstrapButtons.fire(
              {            
                icon: 'success',
                title: 'Successfully updated!',          
                timer: 1500
              }
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            {            
              icon: 'error',
              title: 'Your imaginary file is safe :)',          
              timer: 1500
            }
           
          );
        }
      });
  };
  const handleDeclined = (record) => {
    const data = { id: record, status: 3 };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(baseUrl + "leaves", data).then((res) => {
            setLeaves(res.data.leaves);
            setPending(res.data.pending[0]["status_count"]);
            setToday(res.data.today[0]["status_count"]);
            setAll(res.data.all[0]["status_count"]);
            setPlaned(res.data.planed[0]["leave_count"]);
            setUnplaned(res.data.unplaned[0]["leave_count"]);
            swalWithBootstrapButtons.fire(
              {            
                icon: 'success',
                title: 'Successfully updated!',          
                timer: 1500
              }
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            {            
              icon: 'error',
              title: 'Your imaginary file is safe :)',          
              timer: 1500
            }
          );
        }
      });
  };

  const handleLeavestatus = (e) => {
    e.preventDefault();
    setSelected_leave_status(e.target.value);
  };

  const handleSearch = () => {
    const data = {
      searchedName: searchedName,
      selected_leave_type,
      selected_leave_status,
      start_date: start_date,
      end_date: end_date,
    };
    setIsLoading(true);
    axios.post(baseUrl + "leavesearch", data).then((res) => {
      setLeaves(res.data.leaves);
      setIsLoading(false);
    });
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "fullname",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar">
            <img
              alt=""
              src={baseUrlImage + "uploads/profiles/" + record.image}
              style={{ height: "37px" }}
            />
          </Link>
          <Link to="/app/profile/employee-profile">
            {text} <span>{record.role}</span>
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.fullname.length - b.fullname.length,
    },
    {
      title: "Leave Type",
      dataIndex: "leavetype",
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
      title: "From",
      dataIndex: "start_date",
      sorter: (a, b) => a.start_date.length - b.start_date.length,
    },
    {
      title: "To",
      dataIndex: "start_date",
      sorter: (a, b) => a.start_date.length - b.start_date.length,
    },

    {
      title: "No Of Days",
      dataIndex: "number_of_date",
      sorter: (a, b) => a.number_of_date.length - b.number_of_date.length,
    },

    {
      title: "Reason",
      dataIndex: "reason",
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="dropdown action-label text-center">
          <a
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === "New"
                  ? "fa fa-dot-circle-o text-purple"
                  : text === "Pending"
                  ? "fa fa-dot-circle-o text-info"
                  : text === "Approved"
                  ? "fa fa-dot-circle-o text-success"
                  : "fa fa-dot-circle-o text-danger"
              }
            />{" "}
            {text}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
     
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                handlePending(record.id);
              }}
            >
              <i className="fa fa-dot-circle-o text-info" /> Pending
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                handleApproved(record.id);
              }}
            >
              <i className="fa fa-dot-circle-o text-success" /> Approved
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                handleDeclined(record.id);
              }}
            >
              <i className="fa fa-dot-circle-o text-danger" /> Declined
            </a>
          </div>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              onClick={() => {
                onEditLeave(record.id);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_approve"
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
 
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
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Leaves</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a
                href="#"
                className="btn add-btn"
                onClick={() => setShowadd(true)}
              >
                <i className="fa fa-plus" /> Add Leave
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Leave Statistics */}
        <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Today Presents</h6>
              <h4>
                {today} / {all}
              </h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Planned Leaves</h6>
              <h4>
                {planed} <span>Today</span>
              </h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Unplanned Leaves</h6>
              <h4>
                {unplaned}
                <span>Today</span>
              </h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Pending Requests</h6>
              <h4>{pending}</h4>
            </div>
          </div>
        </div>
        {/* /Leave Statistics */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={searchByName}
              />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="form-control" onChange={handleLeavetype}>
                <option value="0"> -- Select -- </option>
                {leaveTypes.map((leavetype) => (
                  <option value={leavetype.id}> {leavetype.name} </option>
                ))}
              </select>
              <label className="focus-label">Leave Type</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className=" form-control" onChange={handleLeavestatus}>
                <option value="0"> -- Select -- </option>
                {leavestatus.map((leavetatus) => (
                  <option value={leavetatus.id}> {leavetatus.status} </option>
                ))}
              </select>
              <label className="focus-label">Leave Status</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <input
                 style={{
                  width: '100%',
                }}
                className="form-control floating"
                type="date"
                onChange={handleStartDate}
              />
              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <input
                 style={{
                  width: '100%',
                }}
                className="form-control floating"
                type="date"
                onChange={handleEndDate}
              />
              <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <a
              onClick={handleSearch}
              className="btn btn-success btn-block w-100"
            >
              {" "}
              Search{" "}
            </a>
          </div>
        </div>
        {/* /Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive" style={{ alignItems: "center" }}>
              {isLoading ? (
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "500px",
                    verticalAlign: "middle",
                  }}
                >
                  <Grid
                    //  height="100"
                    width="100"
                    color="#00c5fb"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                <Table
                  className="table-striped"
                  pagination={{
                    total: leaves.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={leaves}
                  rowKey={(record) => record.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Leave Modal */}
      {showadd && (
        <Modal title="Add Leave" visible={showadd} onOk={addLeave}  onCancel={handleCloseadd}>
          <div>
            <div className="form-group">
              <label>
                Leave Type <span className="text-danger">*</span>
              </label>
              <select
                name="leave_type"
                onClick={handleLeavetype}
                className="form-control"
              >
                <option>Select Leave Type</option>
                {leaveTypes.map((leave) => (
                  <option value={leave.id}>{leave.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <Select onChange={(e)=>handleEmployee(e)}
              style={{ width: '100%'}}  placeholder="Select Employee"  size='large' className='select-container' showSearch  optionFilterProp='children' filterOption={(input, option) => option?.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           
       
              
            >
              {employees?.length &&
                employees.map((employee) => (
                  <Option key={employee.id} value={employee.id} >{employee.fullname}</Option>
                ))}
            </Select>
          </div>
          <div className="form-group">
            <label>
              From <span className="text-danger">*</span>
            </label>
            <div>
            <DatePicker onChange={handleStartDate}    style={{
        width: '100%',
      }} />
            </div>
          </div>

          <div className="form-group">
            <label>
              To <span className="text-danger">*</span>
            </label>
            <div>
            <DatePicker onChange={handleEndDate}    style={{
        width: '100%',
      }} />
            </div>
          </div>

          <div className="form-group">
            <label>
              Leave Reason <span className="text-danger">*</span>
            </label>
            <textarea
              name="reason"
              onChange={handleReason}
              rows={9}
              className="form-control"
              defaultValue={""}
            />
          </div>

        </Modal>
      )}

{show && (
        <Modal title="Edit Leave" visible={show} onOk={updateLeave}  onCancel={handleClose}>
          <div>
            <div className="form-group">
              <label>
                Leave Type <span className="text-danger">*</span>
              </label>
              <select
                name="leave_type"
                onClick={handleLeavetype}
                className="form-control"
              >
                <option value={selected_leave_status}>{selected_leave_status_name}</option>
                {leaveTypes.map((leave) => (
                  <option value={leave.id}>{leave.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <Select onChange={(e)=>handleEmployee(e)}
              style={{ width: '100%'}}  placeholder="Select Employee"  size='large' className='select-container' showSearch  optionFilterProp='children' filterOption={(input, option) => option?.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           
       
              
            >
                 <Option  defaultValue={selected_employee_id} >{selected_employee_name}</Option>
              {employees?.length &&
                employees.map((employee) => (
                  <Option key={employee.id} value={employee.id} >{employee.fullname}</Option>
                ))}
            </Select>
          </div>
          <div className="form-group">
            <label>
              From <span className="text-danger">*</span>
            </label>
            <div>
            <DatePicker onChange={handleStartDate} defaultValue={moment(start_date, dateFormat) }    style={{
        width: '100%',
      }} />
            </div>
          </div>

          <div className="form-group">
            <label>
              To <span className="text-danger">*</span>
            </label>
            <div>
            <DatePicker onChange={handleEndDate} defaultValue={moment(end_date, dateFormat) }    style={{
        width: '100%',
      }} />
            </div>
          </div>

          <div className="form-group">
            <label>
              Leave Reason <span className="text-danger">*</span>
            </label>
            <textarea
              name="reason"
              onChange={handleReason}
              rows={9}
              className="form-control"
              defaultValue={""}
            />
          </div>

        </Modal>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>
              Leave Type <span className="text-danger">*</span>
            </label>
            <select
              name="leave_type"
              onClick={handleLeavetype}
              className="form-control"
            >
              <option value={selected_leave_type_id}>
                {selected_leave_type_name}
              </option>
              {leaveTypes.map((leave) => (
                <option value={leave.id}>{leave.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              From <span className="text-danger">*</span>
            </label>
            <div>
              <input
                name="start_date"
                value={start_date}
                onChange={handleStartDate}
                className="form-control"
                type="date"
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              To <span className="text-danger">*</span>
            </label>
            <div>
              <input
                name="end_date"
                value={end_date}
                onChange={handleEndDate}
                className="form-control"
                type="date"
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              Number of days <span className="text-danger">*</span>
            </label>
            <input
              name="number_of_date"
              className="form-control"
              readOnly
              type="text"
            />
          </div>
          <div className="form-group">
            <label>
              Remaining Leaves <span className="text-danger">*</span>
            </label>
            <input
              name="remaining"
              className="form-control"
              readOnly
              defaultValue={12}
              type="text"
            />
          </div>
          <div className="form-group">
            <label>
              Leave Reason <span className="text-danger">*</span>
            </label>
            <textarea
              name="reason"
              value={reason}
              onChange={handleReason}
              rows={9}
              className="form-control"
              defaultValue={""}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary submit-btn" onClick={updateLeave}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
      <div id="add_leave" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Leave</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select className="select">
                    <option>Select Leave Type</option>
                    <option>Casual Leave 12 Days</option>
                    <option>Medical Leave</option>
                    <option>Loss of Pay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    From <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    To <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" readOnly type="text" />
                </div>
                <div className="form-group">
                  <label>
                    Remaining Leaves <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    defaultValue={12}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Leave Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    defaultValue={""}
                  />
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
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select className="select">
                    <option>Select Leave Type</option>
                    <option>Casual Leave 12 Days</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    From <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      defaultValue="01-01-2019"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    To <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      defaultValue="01-01-2019"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    defaultValue={2}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Remaining Leaves <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    defaultValue={12}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Leave Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    defaultValue={"Going to hospital"}
                  />
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
                    <a href="" className="btn btn-primary continue-btn">
                      Approve
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Decline
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Approve Leave Modal */}
      {/* Delete Leave Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_approve"
        role="dialog"
      >
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
                    <a href="" className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </a>
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
};

export default LeaveAdmin;
