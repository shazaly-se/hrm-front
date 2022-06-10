
import React, { useState, useEffect,useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { Link ,useParams} from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import TableRows from './TableRows';
import {Applogo} from "../../Entryfile/imagepath"

const ShowPayroll = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({

      content: () => componentRef.current,
    });

    const token = Cookies.get("token")
    const [payroll,setPayRoll] =useState({})

    const [title, setTitle] =  useState("");
    const [date, setDate] = useState("");
    //const [month, setMonth] = useState();
    const [note, setNote] =  useState("");
    const [payrolldetails,setPayRollDetails] =useState([])
    const [rowsData, setRowsData] = useState([]);
    const [totalEmployees,setTotalEmployees] =useState(0)

    const [totalSalary,setTotalSalary] =useState(0)

    const [totalDeduct,setTotalDeduct] =useState(0)
    const [totalAmount,setTotalAmount] =useState(0)
    const [isLoading, setIsLoading] = useState(false);

    let params = useParams()
    useEffect(() => {
        let id = params.id
        setIsLoading(true)
    
        axios.get(baseUrl+"payrolls/"+id)
        .then(res => {
       
            setPayRoll(res.data.payroll)
            setPayRollDetails(res.data.payroldetails)
            setTotalEmployees(res.data.payroldetails.length)
            const data = res.data.payroldetails;
            let totalsalary= 0
            let totaldeduct=0

            for(let i=0;i<data.length;i++){
                totalsalary = totalsalary + data[i].salary
                totaldeduct = totaldeduct + data[i].expected_deduct
                //totalEmployee =parseInt(totalEmployee) +1
                setTotalSalary(totalsalary)
                setTotalDeduct(totaldeduct)
                setTotalAmount(totalsalary - totaldeduct)
                //setTotalEmployees(totalEmployee)
        
              }
        //     setIsLoading(false)
    
        //   setAnnouncements(res.data.announcements)
        })
        .catch(e=>{   
             setIsLoading(false)
             console.log("sommmsms")})
     
        
         }, [])

    const addTableRows = ()=>{
        

        const rowsInput={
            employee_id:0,
            regular_hours:0,
            worked_hours:0,
            salary:0 ,
            deduct:0
        } 
        setRowsData([...rowsData, rowsInput])
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
         total = parseInt(total)+parseInt(rows[i].salary)
         totaldeduct = parseInt(totaldeduct)+parseInt(rows[i].deduct)
         totalEmployee =parseInt(totalEmployee) +1
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
      totalsalary = parseInt(totalsalary)+parseInt(rowsInput[i].salary)
      totaldeduct = parseInt(totaldeduct)+parseInt(rowsInput[i].deduct)
      totalEmployee =parseInt(totalEmployee) +1
      setTotalSalary(totalsalary)
      setTotalDeduct(totaldeduct)
      
      setTotalAmount(totalsalary - totaldeduct)
      setTotalEmployees(totalEmployee)
    }

    setRowsData(rowsInput);

 
}

const handleChange3 = (index, evnt)=>{

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    axios.get(baseUrl+"getemployee/"+evnt.target.value)
    .then(res => {
      console.log("response is",res.data)
      rowsInput[index]["employee_id"] = evnt.target.value;
      rowsInput[index]["regular_hours"] = res.data.regular_hours;
      rowsInput[index]["worked_hours"] = res.data.worked_hours;
      rowsInput[index]["salary"] = res.data.employee.total_salary;


      let totalsalary= 0
      let totaldeduct=0
       let totalEmployee=0
      for(let i=0;i<rowsData.length;i++){
        totalsalary = parseInt(totalsalary)+parseInt(rowsData[i].salary)
        totaldeduct = parseInt(totaldeduct)+parseInt(rowsData[i].deduct)
        totalEmployee =parseInt(totalEmployee) +1
        setTotalSalary(totalsalary)
        setTotalDeduct(totalDeduct)
        setTotalAmount(totalsalary - totaldeduct)
        setTotalEmployees(totalEmployee)

      }
     

      setRowsData(rowsInput)
      
    })
    .catch(e=>console.log("sommmsms"))

}



    function handleTitle (e) {
      e.preventDefault(); 
      setTitle(e.target.value) 
    }

    function handleDate (e) {
        e.preventDefault(); 
        setDate(e.target.value) 
      }

      
      function handleNote (e) {
        e.preventDefault(); 
        setNote(e.target.value) 
      }
  

    function handleSubmit (event) {
      event.preventDefault();
      
      const data = {date: date,note:note,title:title,total_amount:totalAmount,employee:rowsData}
     

      axios.post(baseUrl+"payroll", data)
        .then(res => {
          const rowsInput={
            employee_id:0,
            regular_hours:0,
            worked_hours:0,
            salary:0 ,
            deduct:0
        } 
         // setRowsData([rowsInput])
    
          setDate("")
          setTitle("")
          setNote("")
          //setShowadd(false)
        
          // console.log("responded from server", res.data);
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
                <li className="breadcrumb-item"><Link to="/app/employee/payrolls">Payrolls</Link></li>
                <li className="breadcrumb-item active">Payslip</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <div className="btn-group btn-group-sm">
                <button className="btn btn-white">CSV</button>
                <button className="btn btn-white">PDF</button>
                <button className="btn btn-white" onClick={handlePrint}><i className="fa fa-print fa-lg" /> Print</button>
              </div>
            </div>
          </div>
        </div>
        <div  ref={componentRef}>
        <div class="card">
      <div class="card-body">
      <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={Applogo} className="inv-logo" alt="" />
                    <ul className="list-unstyled mb-0">
                      <li>Dreamguy's Technologies</li>
                      <li>3864 Quiet Valley Lane,</li>
                      <li>Sherman Oaks, CA, 91403</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">Payslip #{params.id}</h3>
                      <ul className="list-unstyled">
                        <li>Salary Month: <span>{payroll.month}, {payroll.year}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                   <div className='row mt-10'>
                  <div className='col-md-12'>

               
                <table className="table table-bordered">
                 <tbody>
          
                     <tr>
                       <td style={{backgroundColor:'lightgray'}}>Name</td>
                       <td >{payroll.title}</td>
                       <td style={{backgroundColor:'lightgray'}}>Number of Employees</td>
                        <td >{totalEmployees}</td>
            
                     </tr>
                     <tr>
                       <td style={{backgroundColor:'lightgray'}}>Date</td>
                       <td >{payroll.date}</td>
                       <td style={{backgroundColor:'lightgray'}}>Total Salary</td>
                        <td >{totalSalary}</td>
            
                     </tr>
                     <tr>
                       <td style={{backgroundColor:'lightgray'}}>Note</td>
                       <td >{payroll.note}</td>
                       <td style={{backgroundColor:'lightgray'}}>Total deduct</td>
                        <td >{totalDeduct}</td>
            
                     </tr>

                     <tr >
                       
                       <td colSpan={2}> </td>
                       <td style={{fontSize:'20px',backgroundColor:'lightgray'}}>Total </td>
                        <td style={{fontSize:'20px'}}>{totalSalary - totalDeduct}</td>
            
                     </tr>
                 </tbody>
                </table>
                </div>
                {/* <div className='col-md-4'></div> */}
  
                </div>
            </div></div>
        <div class="card">
      <div class="card-body">
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
                       
                          
                      </tr>
                    </thead>
                   <tbody style={{backgroundColor:'white'}}>
                       {payrolldetails.map(payroldetail=>(
                           <tr>
                               <td>{payroldetail.fullname}</td>
                               <td>{payroldetail.salary}</td>
                               <td>{payroldetail.absent}</td>
                               <td>{payroldetail.late_time}</td>
                               
                               <td>{payroldetail.expected_deduct}</td>
                               <td>{payroldetail.salary_after_deduct}</td>
                           </tr>
                       ))}
                       
                   {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange2={handleChange2} handleChange3={handleChange3} /> */}
                   </tbody> 
    
                </table>
                
            </div>
          </div>
          
        </div>
        <div className='row mt-3'>
         
        </div>
        </div></div>
        </div>
      </div>
    </div>
        );
}

export default ShowPayroll;
