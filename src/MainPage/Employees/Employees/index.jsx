/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AllEmployees from './allemployees';
import AllEmployeesList from './employeeslist';
import Holidays from './holidays';
import LeaveAdmin from './leave_admin';
import LeaveEmployee from './leaveemployee';
import Leavesetting from './leavesettings';
import AttendanceAdmin from './attendanceadmin';
import AttendanceEmployee from './attendanceemployee';
import Department from './department';
import Designation from './designation';
import Timesheet from './timesheet';
import Overtime from './overtime';
import ShiftScheduling from './shiftscheduling';
import ShiftList from './shiftlist';
import Attendance from '../Attensance/Attendance';
import ListRoles from '../../Roles/ListRoles';
import RolePermissions from '../../Roles/RolePermissions';
import AttendanceReport from '../Attensance/AttendanceReport';
import Announcement from '../../Announcement/Announcement';
import company from './company';
import NewRole from '../../Roles/NewRole';
import Announcements from '../../Announcement/Announcements';
import EditAnnouncement from '../../Announcement/EditAnnouncement';
import CreatePayroll from '../../Payroll/CreatePayroll';
import Payrolls from '../../Payroll/Payrolls';
import ShowPayroll from '../../Payroll/ShowPayroll';
import Accounts from '../../Account/Accounts';
import NewAccount from '../../Account/NewAccount';
import EditAccount from '../../Account/EditAccount';
import Create from '../../AccountTransaction/create';
import Transactions from '../../AccountTransaction/Transactions';
import EditTransaction from '../../AccountTransaction/EditTransaction';

const EmployeesRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
      <Route path={`${match.url}/allemployees`} component={AllEmployees} />
      <Route path={`${match.url}/employees-list`} component={AllEmployeesList} />
      <Route path={`${match.url}/holidays`} component={Holidays} />
      <Route path={`${match.url}/leaves-admin`} component={LeaveAdmin} />
      <Route path={`${match.url}/attendance`} component={Attendance} />

      <Route path={`${match.url}/employee-attendance`} component={AttendanceReport} />

      <Route path={`${match.url}/leaves-employee`} component={LeaveEmployee} />
      <Route path={`${match.url}/leave-settings`} component={Leavesetting} />
      <Route path={`${match.url}/attendance-admin`} component={AttendanceAdmin} />
      <Route path={`${match.url}/attendance-employee`} component={AttendanceEmployee} />
      <Route path={`${match.url}/company`} component={company} />
      <Route path={`${match.url}/departments`} component={Department} />
      <Route path={`${match.url}/designations`} component={Designation} />
      <Route path={`${match.url}/timesheet`} component={Timesheet} />
      <Route path={`${match.url}/overtime`} component={Overtime} />
      <Route path={`${match.url}/shift-scheduling`} component={ShiftScheduling} />
      <Route path={`${match.url}/shift-list`} component={ShiftList} />
      <Route path={`${match.url}/roles-list`} component={ListRoles} />
      <Route path={`${match.url}/role-permissions/:id`} component={RolePermissions} />
      <Route path={`${match.url}/new-role`} component={NewRole} />
      <Route path={`${match.url}/announcements`} component={Announcements} />
      <Route path={`${match.url}/new-announcement`} component={Announcement} />
      <Route path={`${match.url}/announcement/:id`} component={EditAnnouncement} />
      <Route path={`${match.url}/payrolls`} component={Payrolls} />
      <Route path={`${match.url}/payroll/:id`} component={ShowPayroll} />
      <Route path={`${match.url}/create-payroll`} component={CreatePayroll} />

      <Route path={`${match.url}/accounts`} component={Accounts} />
      <Route path={`${match.url}/new-account`} component={NewAccount} />
      <Route path={`${match.url}/account/:id`} component={EditAccount} />

      <Route path={`${match.url}/transactions`} component={Transactions} />
      <Route path={`${match.url}/transaction/create`} component={Create} />
      <Route path={`${match.url}/transaction/:id`} component={EditTransaction} />

   </Switch>
);

export default EmployeesRoute;
