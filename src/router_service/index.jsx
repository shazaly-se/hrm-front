
//main
import Dashboard from '../MainPage/Main/Dashboard';
import Apps from '../MainPage/Main/Apps';
//UI Interface
import UIinterface from '../MainPage/UIinterface';
//Pages
import ProfilePage from '../MainPage/Pages/Profile';
import Subscription from '../MainPage/Pages/Subscription';
import Pages from '../MainPage/Pages/Pages';
//Administrator
import Administrator from '../MainPage/Administration';
//Performance
import Performance from '../MainPage/Performance';
import Goals from '../MainPage/Performance/Goals';
import Performances from '../MainPage/Performance/Performance';
import Training from '../MainPage/Performance/Training';
//HR
import HR from '../MainPage/HR';
import Reports from '../MainPage/HR/Reports';
import Sales from '../MainPage/HR/Sales';
import Accounts from '../MainPage/HR/accounts';
import Payroll from '../MainPage/HR/Payroll';
//Employees
import Employees from '../MainPage/Employees';
import Projects from '../MainPage/Employees/Projects';
import Employee from '../MainPage/Employees/Employees';
import AddEmployee from '../MainPage/Employees/Employees/addemployee';
import EditEmployee from '../MainPage/Employees/Employees/editemployee';
import ViewEmployee from '../MainPage/Employees/Employees/Viewemployee';
import AttendanceAll from '../MainPage/Employees/Employees/attendanceall';

export default [
   {
      path: 'main',
      component: Dashboard
   },
   {
      path: 'apps',
      component: Apps
   },
   {
      path: 'employee',
      component: Employee
   },
   {
      path: 'employees',
      component: Employees
   },
   {
      path: 'projects',
      component: Projects
   },
   {
      path: 'ui-interface',
      component: UIinterface
   },
   {
      path: 'profile',
      component: ProfilePage
   },
   {
      path: 'addemployee',
      component: AddEmployee
   },
   {
      path: 'editemployee/:id',
      component: EditEmployee
   },
   {
      path: 'attendanceall',
      component: AttendanceAll
   },
   {
      path: 'viewemployee/:id',
      component: ViewEmployee
   },
   {
      path: 'subscription',
      component: Subscription
   },
   {
      path: 'pages',
      component: Pages
   },
   {
      path: 'administrator',
      component: Administrator
   },
   {
      path: 'performance',
      component: Performance
   },
   {
      path: 'goals',
      component: Goals
   },
   {
      path: 'performances',
      component: Performances
   },
   {
      path: 'training',
      component: Training
   },
   {
      path: 'hr',
      component: HR
   },
   {
      path: 'reports',
      component: Reports
   },
   {
      path: 'sales',
      component: Sales
   },
   {
      path: 'accounts',
      component: Accounts
   },
   {
      path: 'payroll',
      component: Payroll
   }
]