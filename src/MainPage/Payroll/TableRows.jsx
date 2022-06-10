import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Select } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import $ from 'jquery';
import 'select2';                       // globally assign select2 fn to $ element
import 'select2/dist/css/select2.css';

const { Option } = Select;

function TableRows({rowsData, deleteTableRows, handleChange2,handleChange3}) {

    const [employees, setEmployees] = useState([{}]);



   
    useEffect(() => {
        axios.get(baseUrl+"payroll-employee")
        .then(res => {
          setEmployees(res.data.employees)
        })
        .catch(e=>console.log("sommmsms"))
      }, [])



    return(
        
        rowsData.map((data, index)=>{
            const {employee_id, salary,absent,late_time,expected_deduct,salary_after_deduct}= data;
            // console.log("employees",employees)
            return(

                <tr key={index}>
                <td>
               
                <Select style={{ width: '100%'}}  onChange={(e)=>handleChange3(e,index, 'employee_id')} size='large' className='select-container' showSearch placeholder='Select a type' optionFilterProp='children' filterOption={(input, option) => option?.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {employees?.map((employee) => (
                    <Option key={employee.id}value={employee.id}>
                     {employee.fullname}
                    </Option>
                  ))}   
                </Select>
         {/* <select name="employee_id" className='form-control selectdata' data-live-search="true" onChange={(evnt)=>(handleChange3(index, evnt))} >
        <option value="0">...select...</option>
        {employees.map((employee)=>(
        <option key={employee.id} value={employee.id}>{employee.fullname}</option>
        
        ))}
            </select>                */}
                </td>
                {/* <td><input type="text" value={regular_hours}  onChange={(evnt)=>(handleChange2(index, evnt))} name="number_of_hours" className="form-control" readOnly required/> </td>
                <td><input type="text" value={worked_hours}  onChange={(evnt)=>(handleChange2(index, evnt))} name="number_of_hours" className="form-control" readOnly required/> </td> */}

                <td><input type="text" value={salary}   name="salary" className="form-control" readOnly /> </td>
                <td><input type="text" value={absent}  name="dedabsentuct" className="form-control" readOnly /> </td>
                <td><input type="text" value={late_time}  name="late_time" className="form-control" readOnly /> </td>

                <td><input type="text" value={expected_deduct.toFixed(2)} name="expected_deduct" className="form-control" readOnly /> </td>
                <td><input type="text" value={salary_after_deduct.toFixed(2)}  name="salary_after_deduct" className="form-control" readOnly /> </td>

                <td><button className="btn btn-danger" onClick={()=>(deleteTableRows(index))}>x </button></td>
            </tr>

            )
        })
        
   
    )
    
}

export default TableRows;