
import React, { useState, useEffect } from 'react';
import { Link ,useHistory ,useParams} from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import TableRows from './TableRows';
import { event } from 'jquery';
import { DatePicker, Space } from 'antd';


const CreatePayroll = () => {
  const history = useHistory();
    const token = Cookies.get("token")
    const [title, setTitle] =  useState("");
    const [date, setDate] = useState("");
    const [payrollmonth,setPayrollMonth] =useState("")
    const [note, setNote] =  useState("");
    const [rowsData, setRowsData] = useState([]);
    const [totalEmployees,setTotalEmployees] =useState(0)

    const [totalSalary,setTotalSalary] =useState(0)

    const [totalDeduct,setTotalDeduct] =useState(0)
    const [totalAmount,setTotalAmount] =useState(0)
    const [monthselected,setMonthSelected] = useState(true)

    

    const addTableRows = ()=>{

      if(payrollmonth=="" || payrollmonth==null){
        setMonthSelected(false)
        return
      }else{
        setMonthSelected(true)
        const rowsInput={
            employee_id:0,
            salary:0 ,
            absent:0,
            late_time:0,
            expected_deduct:0,
            salary_after_deduct:0
      } 
      setRowsData([...rowsData, rowsInput])
      }
        

      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        console.log("rows length",rows.length-1)
        if(rows.length-1 ==0){
          setTotalSalary(0)
          setTotalDeduct(0)
          setTotalEmployees(0) 
          setTotalAmount(0)
        }
        rows.splice(index, 1);
        setRowsData(rows);
        let total= 0
        let totaldeduct=0
        let totalEmployee=0
       for(let i=0;i<rows.length;i++){
         total = parseFloat(total)+parseFloat(rows[i].salary)
         totaldeduct = parseFloat(totaldeduct)+parseFloat(rows[i].expected_deduct)
         totalEmployee =parseFloat(totalEmployee) +1
         setTotalSalary(total)
         setTotalDeduct(totaldeduct)
         setTotalEmployees(totalEmployee)
         setTotalAmount(total - totaldeduct)
 
       }
      
   }
 
   const handleChange2 = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    // const total= parseInt(totalDeduct) + parseInt(value)
    // setTotalDeduct(total)
    let totalsalary=0
    let totaldeduct= 0
    let totalEmployee=0
    for(let i=0;i<rowsInput.length;i++){
      totalsalary = parseFloat(totalsalary)+parseFloat(rowsInput[i].salary)
      totaldeduct = parseFloat(totaldeduct)+parseFloat(rowsInput[i].deduct)
      totalEmployee =parseFloat(totalEmployee) +1
      setTotalSalary(totalsalary)
      setTotalDeduct(totaldeduct)
      
      setTotalAmount(totalsalary - totaldeduct)
      setTotalEmployees(totalEmployee)
    }

    setRowsData(rowsInput);

 
}

const handleChange3 = (id, index, empName)=>{

   // const { name, value } = evnt.target;

    const rowsInput = [...rowsData];
    rowsInput[index][empName] = id;
    

    const data= {employee_id:id,payrollmonth:payrollmonth}



   
    axios.post(baseUrl+"getemployee",data)
    .then(res => {
    //  console.log(res.data)
    //  return

      rowsInput[index]["employee_id"] = id;
      rowsInput[index]["salary"] = res.data.total_salary;
      rowsInput[index]["absent"] = res.data.absent_day;
      rowsInput[index]["late_time"] = res.data.total_late;
      rowsInput[index]["expected_deduct"] = res.data.expected_deduct;
      rowsInput[index]["salary_after_deduct"] = res.data.salary_after_deduct;
     


      let totalsalary= 0
      let totaldeduct=0
       let totalEmployee=0
      for(let i=0;i<rowsData.length;i++){
        totalsalary = parseFloat(totalsalary)+parseFloat(rowsData[i].salary)
        totaldeduct = parseFloat(totaldeduct)+parseFloat(rowsData[i].expected_deduct)
        totalEmployee =parseFloat(totalEmployee) +1
        setTotalSalary(totalsalary)
        setTotalDeduct(totaldeduct)
        setTotalAmount(totalsalary - totaldeduct)
        setTotalEmployees(totalEmployee)

      }
     

      setRowsData(rowsInput)
      
    })
    .catch(e=>console.log("sommmsms"))

}

function handlePayrollMonthDate(date, dateString){

  setPayrollMonth(dateString) 
  setMonthSelected(true)

 
setRowsData([])
  
}

    function handleTitle (e) {
      e.preventDefault(); 
      setTitle(e.target.value) 
    }

    function handleDate (date, dateString) {
      console.log( dateString);
        // e.preventDefault(); 
         setDate(dateString) 
      }

      
      function handleNote (e) {
        e.preventDefault(); 
        setNote(e.target.value) 
      }
  

    function handleSubmit (event) {
      event.preventDefault();
      
      const data = {date: date,note:note,title:title,payrollmonth:payrollmonth,total_salary:totalSalary,total_deduct:totalDeduct,total_amount:totalAmount,employee:rowsData}
     
 
      axios.post(baseUrl+"payroll", data)
        .then(res => {
 
        Swal.fire(
          'Success!',
           'Successfully added!',
          'success'
         )

           history.push("/app/employee/payrolls")

        })
    }

    function handleUpdate (event) {
      event.preventDefault();
      const data = {department: departmentname}

      axios.put(baseUrl+"departments/"+departmentid, data)
        .then(res => {
           console.log(res);
           setShow(false)
        })
    }

      const columns = [        
   
        {
          title: 'Role Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="" style={{justifyContent:'space-between'}}>
                   <a className="btn btn-primary m-1"  href={"/app/employee/role-permissions/"+record.id}><i className="fa fa-pencil m-r-5" /> </a>
                  
          
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
   
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Payroll </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Create</li>
              </ul>
            </div>
      
          </div>
        </div>
        <div class="card">
      <div class="card-body">
             <div className='row'>
                 <div className='col-md-4'>
                     
                     <label>Payroll Name</label>
                     <input onChange={handleTitle} type="text" className="form-control" />
                 </div>
                 <div className='col-md-4'>
                 <label>Date</label>
                 <Space direction="vertical mt-3">
                 <DatePicker onChange={handleDate} className="form-control" />
                 </Space>
                     {/* <input onChange={handleDate} type="date" className="form-control" /> */}
                 </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
              <label>Note</label>
                     <textarea onChange={handleNote} type="text" className="form-control" rows={5} ></textarea>
              </div>
            </div>
            </div></div>
        <div class="card">
      <div class="card-body">
      <div className='col-md-3'>
      
                 <label>Payroll Month</label>
                     {/* <input onChange={handlePayrollMonthDate} type="month" className="form-control" /> */}
                     <Space direction="vertical mt-3">
                 <DatePicker onChange={handlePayrollMonthDate} className="form-control" picker="month"/>
                 </Space>
                    
                 </div>
                 {!monthselected?<span className='text-danger'>select which moth salary you apply</span>:null}
        <div className="row mt-3">
          <div className="col-md-12">
          <div className="table-responsive" >
              
          <table className="table table-bordered">
                    <thead >
                      <tr>
                          <th>Full Name</th>
                          <th>Total Salary</th>
                          <th>Absent Days</th>
                          <th>Late Times</th>
                          <th>Expected Deduct</th>
                          <th>Salary After Deduct</th>
                          <th><button className="btn btn-primary" onClick={addTableRows} >+ </button></th>
                      </tr>
                    </thead>
                   <tbody style={{backgroundColor:'white'}}>
                       
                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange2={handleChange2} handleChange3={handleChange3} />
                   </tbody> 
    
                </table>
                <div className='row'>
                  <div className='col-md-4'>

               
                <table className="table table-bordered">
                 <tbody>
          
                     <tr>
                       <td>Number of Employees</td>
                       <td >{totalEmployees}</td>
            
                     </tr>
                     <tr>
                       <td>Total Salary</td>
                       <td >{totalSalary}</td>
            
                     </tr>
                     <tr>
                       <td>Total deduct</td>
                       <td >{totalDeduct.toFixed(2)}</td>
            
                     </tr>

                     <tr>
                       <td>Total Salary After Deduction</td>
                       <td >{(totalSalary - totalDeduct).toFixed(2)}</td>
            
                     </tr>
                 </tbody>
                </table>
                </div>
                </div>
            </div>
          </div>
          
        </div>
        <div className='row mt-3'>
            <div className='col-md-4'>
            <a  onClick={handleSubmit} className="btn btn-primary">Submit</a>
            </div>
        </div>
        </div></div>
      </div>
    </div>
        );
}

export default CreatePayroll;
