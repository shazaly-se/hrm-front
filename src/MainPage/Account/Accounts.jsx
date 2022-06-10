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

 const Accounts = () => {
 
   const [accounts,setAccounts] = useState([])
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    setIsLoading(true)
  setTimeout(() => {
    axios.get(baseUrl+"accounts")
    .then(res => {
        setIsLoading(false)

      setAccounts(res.data.accounts)
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
 


      const onDeleteAccount =(record) => {
            
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
            axios.delete(baseUrl+"accounts/"+ record)
            .then(res => {
                setAccounts(res.data.accounts)
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
         title: 'Main Account',
         dataIndex: 'Category',
         sorter: (a, b) => a.Category.length - b.Category.length,
       },
 
  
       {
        title: 'Code',
        dataIndex: 'code',
   
        sorter: (a, b) => a.code.length - b.code.length,
      },
   
       {
         title: 'Account Name',
         dataIndex: 'account_Name',
    
         sorter: (a, b) => a.account_Name.length - b.account_Name.length,
       },
       {
         title: 'Action',
         render: (text, record) => (
             <div className="dropdown dropdown-action text-end">
               <Link className="btn btn-primary m-1"  to={"/app/employee/account/"+record.id}><i className="fa fa-pencil m-r-5" /> </Link>
               <a className="btn btn-danger m-1"  onClick={()=>{onDeleteAccount(record.id)}} ><i className="fa fa-trash m-r-5" /> </a>
 
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
                       <h3 className="page-title">Accounts</h3>
                       <ul className="breadcrumb">
                         <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                         <li className="breadcrumb-item active">Accounts </li>
                       </ul>
                     </div>
                     <div className="col-auto float-end ml-auto">
                       <Link to={"/app/employee/new-account"} className="btn add-btn" ><i className="fa fa-plus" /> New Account </Link>
                     </div>
                   </div>
                 </div>
                 {/* /Page Header */}
                 {/* Search Filter */}
          
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
            pagination= { {total : accounts.length,
              showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
            style = {{overflowX : 'auto'}}
            columns={columns}                 
            // bordered
            dataSource={accounts}
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
 
 export default Accounts;
 