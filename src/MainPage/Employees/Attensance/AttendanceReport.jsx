
import React, { useState,useEffect,useRef  } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import axios from 'axios';
import Swal from 'sweetalert2'
import { baseUrl, baseUrlImage } from '../../../Entryfile/BaseUrl';
import { Grid } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AttendanceReport = () => {


    const searchInput = useRef(null);

  const [textValidate, setTextValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allemployees, setAllemployees] = useState([]);
  const [attends, setAttends] = useState([]);
  const [employeeinfo, setEmployeeinfo] = useState({});
  const [regular_hours, setRegular_hours] = useState(0);
  const [worked_hours, setWorked_hours] = useState(0);
  const [totalmin, setTotalmin] = useState(0);
  const [searchedName,setSearchedName] = useState({});
  const [start_date,setStart_date] =useState(null)
  const [end_date,setEnd_date] =useState(null)

  const [search_start_date,setSearchStart_date] =useState(null)
  const [search_end_date,setSearchEnd_date] =useState(null)

  // search
  const [selected_leave_type, setSelected_leave_type] = useState(0);
  const [selected_leave_status, setSelected_leave_status] = useState(0);

  //  statistics
  const [check_in_late_number, setCheckInLateNumber] = useState(0);
  const [break_time_late_number, setBreakTimeLateNumber] = useState(0);

  const [total_late, setTotalLate] = useState(0);
  const [company_deduct_amount, setCompanyDeductAmount] = useState(0);
  const [number_of_days, setNumberOfDays] = useState({});
  const [approved_leave, setApprovedLeave] = useState(0);
  
  
  const [total_salary, setTotalSalary] = useState(0);
  const [expected_deduct, setExpectedDeduct] = useState(0);
  const [salary_after_deduct, setSalaryAfterDeduct] = useState(0);
  

    // useEffect( ()=>{
    //   if($('.select').length > 0) {
    //     $('.select').select2({
    //       minimumResultsForSearch: -1,
    //       width: '100%'
    //     });
    //   }
    // });  
        useEffect(() => {
      // setIsLoading(true)
    
        axios.get(baseUrl+"allemployee")
        .then(res => {
          console.log(res.data.allemployees)
            setAllemployees(res.data.allemployees)
          
        })
     

    }, [])

    // useEffect(() => {
    //   setIsLoading(true)
    //   setTimeout(() => {
    //     axios.get(baseUrl+"attendmanagements")
    //     .then(res => {
    //         setAttends(res.data.attends)
    //        setIsLoading(false)
    //     })
    //   }, 2000);

    // }, [])

    const searchByName = (e)=>{
      e.preventDefault();
      setSearchedName(e.target.value)
      setTextValidate(false)
  
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
        if(searchedName == null || searchedName==""){
            searchInput.current.focus();
            setTextValidate(true)
            return
        }
      const data ={searchedName:searchedName,selected_leave_type,selected_leave_status,start_date:start_date,end_date:end_date}
      setIsLoading(true)
      axios.post(baseUrl+"attend-report", data)
      .then(res => {
        console.log("console",res.data)
         setAttends(res.data.attends)
         setTotalmin(res.data.mins)
         setEmployeeinfo(res.data.employeeInfo)
         setSearchStart_date(res.data.start_date)
         setSearchEnd_date(res.data.end_date)
         setRegular_hours(res.data.regular_hours)
         setWorked_hours(res.data.worked_hours)
         setCheckInLateNumber(res.data.check_in_late_number)
         setBreakTimeLateNumber(res.data.break_time_late_number)
         setTotalLate(res.data.total_late)
         setCompanyDeductAmount(res.data.company_deduct_amount)
         setTotalSalary(res.data.total_salary)
         setExpectedDeduct(res.data.expected_deduct)
         setSalaryAfterDeduct(res.data.salary_after_deduct)
        setNumberOfDays(res.data.monthlydays)
        setApprovedLeave(res.data.approved_leave)
         setIsLoading(false)
      })
    }


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

        <div className="row filter-row">
          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-12">  
            <div className="form-group form-focus">
            <Autocomplete
     // multiple
      limitTags={2}
      id="multiple-limit-tags"
      onChange={(event, newValue) => {
        setSearchedName(newValue)
  //console.log("new value",newValue)
      }}
      options={allemployees}
      getOptionLabel={(option) => option.label}
     // defaultValue={}
      renderInput={(params) => (
        <TextField {...params}  placeholder="Employee Name" />
      )}
      sx={{ width: '500px' }}
    />

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
            <a onClick={handleSearch} className="btn btn-success btn-block w-100" > Search </a>  
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
  <div style={{backgroundColor:'white'}} className="mt-5">
    {attends.length > 1?  <div style={{textAlign:'center'}}>
    <h3 >Sozo HRM</h3>
    <h4 >Report  {search_start_date} - {search_end_date}</h4>
    <h4 >{employeeinfo.fullname}</h4>
    </div>:null}
  
  <table class="table">
    {attends.length > 0?  <thead>
    <tr>
      <th scope="col">DATE</th>
      <th scope="col">CHECK IN</th>
      <th scope="col">GO BREAK</th>
      <th scope="col">BACK FROM BREACK</th>
     
      <th scope="col">CHECK OUT</th>
      <th scope="col">REGULAR HOURS</th>
      <th scope="col">WORKED HOURS</th>
    </tr>
  </thead>:null}

  <tbody style={{backgroundColor:'white'}}>
      {attends.map(attend =>(
            <tr key={attend.date}>
            <td>{attend.date}</td>
            <td>
              {
                attend.check_in_late ==1? <span className='text-danger'>{attend.check_in}</span>:attend.check_in
              
              }
              </td>
            <td>
             {
                attend.goBreak
              
              }
              </td>
            <td>
              {
                attend.resume_late ==1? <span className='text-danger'>{attend.resume}</span>:attend.resume
              
              }
              
              
              </td>
   
            <td>{attend.check_out}</td>
            <td>{attend.regular_hours}</td>
            <td>{attend.total_worked_hours}</td>
            </tr>
      ))}
 

  </tbody>
  {attends.length > 1?
<tfoot style={{backgroundColor:'white'}}>
  <tr>
    <td>Total</td>
    <td colSpan={4}></td>
    <td>{regular_hours}</td>
    <td>{worked_hours}</td>
  </tr>
</tfoot>:null}
</table>
</div>
            }
       
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            {attends.length > 0 ? <table className='table table-bordered'>
               <tbody style={{backgroundColor:'white'}}>
               <tr>
                       <td >Number Of Days </td>
                       <td >{number_of_days.expected_worked_days}</td>
                     </tr>
                     <tr>
                       <td >Worked Days </td>
                       <td >
                         {attends.length < number_of_days.expected_worked_days?<span className='text-danger'>{attends.length}</span>:attends.length}
                       
                         </td>
                     </tr>
                     <tr>
                       <td >Approved Leave  Days </td>
                       <td >{approved_leave}</td>
                     </tr>

                     <tr>
                       <td >Absent  Days </td>
                       <td >({number_of_days.expected_worked_days}) - ({attends.length} + {approved_leave}) = {number_of_days.expected_worked_days - (attends.length + approved_leave) > 0?<span className='text-danger'>{number_of_days.expected_worked_days - (attends.length + approved_leave)}</span>:number_of_days.expected_worked_days - (attends.length + approved_leave)}
                       </td>
                     </tr>

                   <tr>
                       <td >Number of Check In Late</td>
                       <td >{check_in_late_number}</td>
                     </tr>
                     <tr>
                       <td >Number of Break Time Late</td>
                       <td >{break_time_late_number}</td>
                     </tr>
                     <tr>
                       <td >Total Late </td>
                       <td >{total_late}</td>
                     </tr>
                  
                     
                     <tr>
                       <td >Total Salary</td>
                       <td >{total_salary}</td>
                     </tr>
                     <tr>
                       <td >Expected Deduct</td>
                       <td >{expected_deduct.toFixed(2)}</td>
                     </tr>
                     <tr>
                       <td >Salary After Deduct</td>
                       <td >{salary_after_deduct.toFixed(2)}</td>
                     </tr>
               </tbody>
            </table>:null }
         
          </div>
        </div>
      </div>




   
    </div>
        );
  }

export default AttendanceReport;
