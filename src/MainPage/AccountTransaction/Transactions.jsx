/**
 * Signin Firebase
 */

 import React, { useState,useEffect } from 'react';
 import { Helmet } from "react-helmet";
 import { Link } from 'react-router-dom';
 
 import { Table } from 'antd';
 import 'antd/dist/antd.css';
 import {itemRender,onShowSizeChange} from "../paginationfunction"
 import "../antdstyle.css"
 import axios from 'axios';
import { baseUrl } from '../../Entryfile/BaseUrl';
import Swal from 'sweetalert2'
import { Grid } from  'react-loader-spinner'

 const Transactions = () => {
 
   const [announcements,setAnnouncements] = useState([])
   const [transactions,setTransactions] = useState([])
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    setIsLoading(true)
  setTimeout(() => {
    axios.get(baseUrl+"transactions")
    .then(res => {
        setIsLoading(false)
       // console.log(res.data)
       // setAnnouncements(res.data.announcements)

      setTransactions(res.data.transactions)
    })
    .catch(e=>{   
         setIsLoading(false)
         console.log("sommmsms")})
  }, 2000);
    
     }, [])
 

//    useEffect( ()=>{
//      if($('.select').length > 0) {
//        $('.select').select2({
//          minimumResultsForSearch: -1,
//          width: '100%'
//        });
//      }
//    });  
 


      const onDeleteAnnouncement =(record) => {
            
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
            axios.delete(baseUrl+"announcements/"+ record)
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
  
 
     const columns = [
       
  
       {
         title: 'Type',
         dataIndex: 'type',
         sorter: (a, b) => a.type.length - b.type.length,
       },
       {
        title: 'Date',
        dataIndex: 'date',
        //sorter: (a, b) => a.type.length - b.type.length,
      },
       {
        title: 'Credited Account Name',
        dataIndex: 'creditedTo',
        render: (text, record) => {
          
            return <div>{record?.credit_account[0]?.account_Name? record?.credit_account[0]?.account_Name: ' '}</div>
        }
      },
      {
        title: 'Debited Account Name',
        dataIndex: 'debitedTo',
        render: (text, record) => {
          
            return <div>{record?.debit_account[0]?.account_Name? record?.debit_account[0]?.account_Name: ' '}</div>
        }
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        //sorter: (a, b) => a.type.length - b.type.length,
      },
      {
        title: 'Narration',
        dataIndex: 'narration',
        //sorter: (a, b) => a.type.length - b.type.length,
      },
 
       {
         title: 'Action',
         render: (text, record) => (
             <div className="dropdown dropdown-action text-end">
               <Link className="btn btn-primary m-1"  to={"/app/employee/transaction/"+record.id}><i className="fa fa-pencil m-r-5" /> </Link>
               <a className="btn btn-success m-1"  ><i className="fa fa-print m-r-5" /> </a>
               <a className="btn btn-danger m-1"  onClick={()=>{onDeleteAnnouncement(record.id)}} ><i className="fa fa-trash m-r-5" /> </a>
 
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
                       <h3 className="page-title">Transactions</h3>
                       <ul className="breadcrumb">
                         <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                         <li className="breadcrumb-item active">All Transactions </li>
                       </ul>
                     </div>
                     <div className="col-auto float-end ml-auto">
                       <Link to={"/app/employee/transaction/create"} className="btn add-btn" ><i className="fa fa-plus" /> New Transaction </Link>
                     </div>
                   </div>
                 </div>
                 {/* /Page Header */}
                 {/* Search Filter */}
                 <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Today Presents</h6>
              <h4>12 / 3</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Planned Leaves</h6>
              <h4>3 <span>Today</span></h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Unplanned Leaves</h6>
              <h4>5<span>Today</span></h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Pending Requests</h6>
              <h4>10</h4>
            </div>
          </div>
        </div>
        {/* /Leave Statistics */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
            <div className="form-group form-focus">
              <input type="text" className="form-control floating"   />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
            <div className="form-group form-focus select-focus">
              <select className=" form-control"> 
              <option value="0"> -- Select -- </option>
              {/* {leavetypes.map(leavetype=>(
                 <option value={leavetype.id}> {leavetype.name} </option> 
              ))} */}
              </select>
              <label className="focus-label">Leave Type</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
            <div className="form-group form-focus select-focus">
            <select className=" form-control" > 
              <option value="0"> -- Select -- </option>
              {/* {leavestatus.map(leavetatus=>(
                 <option value={leavetatus.id}> {leavetatus.status} </option> 
              ))} */}
              </select>
              <label className="focus-label">Leave Status</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date"  />
                <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
            <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date"  />
                <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
            <a  className="btn btn-success btn-block w-100"> Search </a>  
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
            pagination= { {total : transactions.length,
              showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
            style = {{overflowX : 'auto'}}
            columns={columns}                 
            // bordered
            dataSource={transactions}
            rowKey={record => record.id}
            // onChange={this.handleTableChange}
          />
                      }
              

        
                     </div>
                   </div>
                 </div>
               </div>
        
             </div>
 
       );
   }
 
 export default Transactions;
 