/**
 * App Header
 */
 import React, { useEffect } from 'react';
 import { withRouter } from 'react-router-dom';
 import { Link } from 'react-router-dom';
 
 const Sidebar = (props) => {
     let pathname = props.location.pathname
     

     return (
         <div className="sidebar" id="sidebar">
         <div className="sidebar-inner slimscroll">
           <div id="sidebar-menu" className="sidebar-menu">
             <ul>
               <li className="menu-title"> 
                 <span>Main</span>
               </li>
               <li><Link className={pathname.includes('main/dashboard') ?"active" :""} to="/app/main/dashboard"><i className="la la-dashboard" /> <span> Dashboard</span></Link></li>
      
               <li className="submenu">
                 <a href="javascript:void(0)"><i className="la la-cog" /> <span> Settings</span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                 <li><Link className={pathname.includes('company') ?"active" :""} to="/app/employee/company"> <span> Company </span></Link></li>
                   <li><Link className={pathname.includes('departments') ?"active" :""} to="/app/employee/departments"> <span> Departments </span></Link></li>
                   <li><Link className={pathname.includes('designations') ?"active" :""} to="/app/employee/designations"> <span> Designations </span> </Link></li>
                   <li><Link className={pathname.includes('holidays') ?"active" :""} to="/app/employee/holidays"><span> Holidays</span> </Link></li>
                   <li><Link className={pathname.includes('e-settings') ?"active" :""} to="/app/employee/leave-settings">Leave Settings</Link></li>
           
                 </ul>
               </li>

            
               <li className="submenu">
                 <a href="javascript:void(0)" className=""><i className="la la-user" /> <span> Employees</span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                   <li><Link className={pathname.includes('allemployees') ?"active" :pathname.includes('employees-list') ?"active" :""} 
                         to="/app/employee/allemployees"><span>All Employees</span></Link></li>
                 
                   <li><Link className={pathname.includes('es-admin') ?"active" :""} to="/app/employee/leaves-admin"> <span> Leaves </span></Link></li>
                  
                   <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/employee/attendance"> <span>Attendance</span></Link></li>
     
                 </ul>
               </li>

               <li className="submenu">
                 <a href="javascript:void(0)" className=""><i className="la la-user" /> <span> User Management</span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                   <li><Link className={pathname.includes('allemployees') ?"active" :pathname.includes('employees-list') ?"active" :""} 
                         to="/app/employee/roles-list"> <span>Roles</span></Link></li>
                 
             
                   <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/administrator/users"> <span>Users</span></Link></li>
               
                 </ul>
               </li>

               <li><Link className={pathname.includes('es-admin') ?"active" :""} to="/app/employee/announcements"><i className="la la-bullhorn" /> <span> Announcement </span></Link></li>

               <li className="submenu">
                 <a href="javascript:void(0)" className=""><i className="la la-user" /> <span> Accounts </span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                   <li><Link className={pathname.includes('accounts') ?"active" :pathname.includes('list-account') ?"active" :""} 
                         to="/app/employee/accounts"> <span>List accounts</span></Link></li>
                 
              
                   <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/employee/new-account"> <span>New account</span></Link></li>
               
                 </ul>
               </li>

               <li className="submenu">
                 <a href="javascript:void(0)" className=""><i className="la la-user" /> <span> Account Transactions </span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                   <li><Link className={pathname.includes('accounts') ?"active" :pathname.includes('list-account') ?"active" :""} 
                         to="#"> <span>comming soon</span></Link></li>
                 
              
               
                 </ul>
               </li>

           
                            <li className="submenu">
                 <a href="javascript:void(0)"><i className="la la-money" /> <span> Payroll </span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                 <li><Link className={pathname.includes('payrolls-') ?"active" :""} to="/app/employee/payrolls"> All Payrolls </Link></li>
                 <li><Link className={pathname.includes('create-payroll-') ?"active" :""} to="/app/employee/create-payroll"> New Payroll </Link></li>
                 </ul>
               </li>
               <li className="submenu">
                 <a href="javascript:void(0)"><i className="la la-pie-chart" /> <span> Reports </span> <span className="menu-arrow" /></a>
                 <ul style={{display: 'none'}}>
                 <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/employee/employee-attendance"> <span>Attendance</span></Link></li>
                 </ul>
               </li>
             </ul>
           </div>
         </div>
       </div>
        
       );
    
 }
 
 export default withRouter(Sidebar);
 