/**
 * TermsCondition Page
 */
 import React, { useEffect, useState } from 'react';
 import { Helmet } from "react-helmet";
 import { Link,Redirect ,useHistory } from 'react-router-dom';

 import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../../Entryfile/imagepath'
 import axios from 'axios';
 import { baseUrl } from '../../../Entryfile/BaseUrl';
 import '../../../assets/css/profile.css'
 import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const AddEmployee = () => {
  const notify = () => toast.error("required  fields!");

  const token = Cookies.get("token")
  const history = useHistory();



  //  useEffect( ()=>{
  //    if($('.select').length > 0) {
  //      $('.select').select2({
  //        minimumResultsForSearch: -1,
  //        width: '100%'
  //      });
  //    }
  //  });  
   const [roles, setRoles] = useState ([])
   const [nationality, setNationality] = useState ([])
   const [departments, setDepartments] = useState ([])
   const [designations, setDesignations] = useState ([])
   const [photo, setphoto] = useState ("")


   const [errors, seterrors] = useState ({})

   
  
   const [state, setState] = useState({
    fullname: "",
    birthdate: "",
    joineddate: "",
    gender: 0,
    departmentselected: 0,
    designationselected: 0,
    role_id: 0,
    employeephone: 0,
    employeeEmail: "",
    employeeAddress: "",
    labourContractExpiry: "",
    contractStartDate: "",
    contractExpireDate: "",
    visaExpiry: "",
    passportno: 0,
    passportExpiryDate :"",
    nationalityselected: 0,
    religion: 0,
    maritialStatus: "",
    numberofChildren: "",
    emergencycontactname: "",
    emergencycontactrelationship: "",
    emergencycontactAddress:"", 
    emergencycontactphone: "",
    employeebankname :"",
    bankbranchname:"",
    employeebankacc: "",
    employeebankiban: "",
    basic_salary:0,
    transport_allowance:0,
    house_allowance:0,
    other_allowance:0,
    employeehomeadd: "",
    employeehomephone: "",
    employeehomephone2:"",
    imageUpload: "",
    imageShow: "",
    passport_copy:"",
    certification_copy:"",
    id_copy:""
  })

  function handleChange(evt) {
    const value = evt.target.value;

    // let input 
    // input[evt.target.name] = evt.target.value;
    // setInput(input)
    errors[evt.target.name] = "";

    setState({
      ...state,
      [evt.target.name]: value
    });
  }
const handleFeaturedImage = (e) => { 
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
        setState({ 
          ...state,
          imageShow: URL.createObjectURL(e.target.files[0]) ,
        })
    }
    function createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            setState({
              ...state,
              imageUpload: e.target.result
            });
        };
        reader.readAsDataURL(file);
    }

    // passport copy
    const handlePassportImage = (e) => { 
      let files = e.target.files || e.dataTransfer.files;
     
      if (!files.length)
          return;
          createPassportImage(files[0]);
  }
  function createPassportImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
          setState({
            ...state,
            passport_copy: e.target.result
          });
      };
      reader.readAsDataURL(file);
  }

      // certification copy
      const handleCertificationImage = (e) => { 
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
            createCertificationImage(files[0]);
    }
    function createCertificationImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            setState({
              ...state,
              certification_copy: e.target.result
            });
        };
        reader.readAsDataURL(file);
    }

          // ID copy
          const handleIDImage = (e) => { 
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
                createIDImage(files[0]);
        }
        function createIDImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setState({
                  ...state,
                  id_copy: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
     
  const saveEmployee = (e) => {
    //  const data = state

  
    if(validate()){
     axios.post(baseUrl+"employees", state).then(res=>{
      
      Swal.fire(
        {
          icon: 'success',
          title: 'Successfully created!',
          timer: 1500
        }
 
     )
     history.push("/app/employee/allemployees")

       
     })
  }else{
    notify()
  }
}

function validate(){
  let fields = state;
    let errors = {};
    let formIsValid = true;

  if (!fields["fullname"]) {
    formIsValid = false;
    errors["fullname"] = "Please enter  name.";
    }

    if (state.departmentselected < 1) {
         

    
      formIsValid =false
      errors["departmentselected"] = "department is required";
 
    }
   

    if (state.designationselected < 1) {
         
    
    
      formIsValid =false
      errors["designationselected"] = "designation is required";
    }

    if (state.role_id < 1) {
      formIsValid =false
      errors["role_id"] = "user role is required";
    }

    if (!fields["employeeEmail"]) {
      formIsValid = false;
      errors["employeeEmail"] = "Cannot be empty";
    }

    if (typeof fields["employeeEmail"] !== "undefined") {
      let lastAtPos = fields["employeeEmail"].lastIndexOf("@");
      let lastDotPos = fields["employeeEmail"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["employeeEmail"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["employeeEmail"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["employeeEmail"] = "Email is not valid";
      }
    }
 
  seterrors(
    errors
  );

  return formIsValid;
}

   useEffect(() => {
     axios.get(baseUrl+"countries").then(res=>{
         setNationality(res.data)
     })

   }, [])

   useEffect(() => {
    axios.get(baseUrl+"roles").then(res=>{
        setRoles(res.data)
    })

  }, [])

   useEffect(() => {
    axios.get(baseUrl+"departments",{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }}).then(res=>{
        setDepartments(res.data.departments)
    })

  }, [])
  useEffect(() => {
    axios.get(baseUrl+"designations").then(res=>{
        setDesignations(res.data.designations)
    })

  }, [])

   function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });
   
     return (
         <div className="page-wrapper">          
             <div className="content container-fluid">
             <ToastContainer />
               <div className="page-header">
                 <div className="row">
                   <div className="col-sm-12">
                     <h3 className="page-title">Add Employee</h3>
                     <ul className="breadcrumb">
                       <li className="breadcrumb-item"><Link to = "/app/employee/allemployees">All Employees</Link></li>
                       <li className="breadcrumb-item active">Add Employee</li>
                     </ul>
                   </div>
                 </div>
               </div>
               <div className="card mb-0">
                 <div className="card-body">
                   <div className="row">
                     <div className="col-md-12">
                       <div className="profile-view">
                         <div className="profile-basic">
                           <div className="row">
                             <div className="col-md-5">
                               <div className="profile-info-left">
                                 <div class="avatar-upload">
                                    <div class="avatar-edit">
                                        <input type='file' onChange={handleFeaturedImage}  name="imageUpload" id="imageUpload" accept=".png, .jpg, .jpeg" />
                                        <label for="imageUpload"></label>
                                    </div>
                                    <div class="avatar-preview">
                                        <div id="imagePreview" style={{backgroundImage: "url(https://services.findproperties.ae/public/uploads/profiles/no_avatar.png)"}}>
                                        </div>
                                    </div>
                                </div>
                                <ul className="personal-info">
                                <li>
                                    <div className="title">Full Name</div>
                                    <div className="text">
                                        <input name="fullname" value={state.firstName} onChange={handleChange} className="form-control floating" placeholder=''/>
                                        <div className="text-danger">{errors.fullname}</div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="title">Birth Date</div>
                                    <div className="text">
                                        <input name="birthdate" value={state.birthdate} onChange={handleChange} className="form-control" type="date"  placeholder='dd/mm/yyyy'/>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="title">Joined Date</div>
                                    <div className="text">
                                        <input name="joineddate" value={state.joineddate} onChange={handleChange} className="form-control" type="date"  placeholder='dd/mm/yyyy'/>
                                    </div>
                                    </li>
                                    <li>
                                        <div className="title">Visa Expiry Date</div>
                                        <div className="text">
                                            <input name="visaExpiry" value={state.visaExpiry} onChange={handleChange} className="form-control" type="date"  placeholder=''/>
                                        </div>
                                    </li>
                                </ul>
                               </div>
                             </div>
                             <div className="col-md-7">                              
                               <ul className="personal-info">
                                <li>
                                    <div className="title">Gender</div>
                                    <div className="text">
                                      <select name="gender" class="form-control">
                                        <option value={1}>Male</option>
                                        <option value={2}>Female</option>
                                      </select>
                                    </div>
                                  </li>
                                   <li>
                                    <div className="title">Department</div>
                                    <div className="text">
                                        <select name="departmentselected" onChange={handleChange} className="form-control">
                                            <option value={state.departmentselected}>Select Department</option>
                                                {departments.map((dept, i) => (
                                                    <option value={dept.id} >{dept.department}</option> 
                                                ))}
                                            </select>
                                            <div className="text-danger">{errors.departmentselected}</div>

                                    </div>
                                    </li>
                                    <li>
                                      <div className="title">Designation</div>
                                      <div className="text">
                                          <select name="designationselected" onChange={handleChange} className="form-control">
                                              <option value={state.designationselected}>Select Designation</option>
                                                  {designations.map((des, i) => (
                                                      <option name={des.id} value={des.id} >{des.designationName}</option> 
                                                  ))}
                                          </select>
                                          <div className="text-danger">{errors.designationselected}</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="title">Role</div>
                                      <div className="text">
                                          <select name="role_id" onChange={handleChange} className="form-control">
                                              <option value={state.role_id}>Select Role</option>
                                                  {roles.map((role, i) => (
                                                      <option name={role.id} value={role.id} >{role.name}</option> 
                                                  ))}
                                              </select>
                                              <div className="text-danger">{errors.role_id}</div>
                                      </div>
                                    </li>
                                    <li>
                                        <div className="title">Phone</div>
                                        <div className="text">
                                            <input name="employeephone" value={state.employeephone}  onChange={handleChange}className="form-control" type="number"  placeholder=''/>
                                        </div>
                                        </li>

                                    <li>
                                    <div className="title">Email</div>
                                    <div className="text">
                                        <input name="employeeEmail" value={state.employeeEmail} onChange={handleChange} className="form-control" type="email"  placeholder=''/>
                                        <div className="text-danger">{errors.employeeEmail}</div>
                                    </div>
                                  </li>
                                 
                                 <li>
                                        <div className="title">Address</div>
                                        <div className="text">
                                            <input name="employeeAddress" value={state.employeeAddress} onChange={handleChange} className="form-control" type="text"  placeholder=''/>
                                        </div>
                                 </li>
                                 <li>
                                        <div className="title">Contract Start Date</div>
                                        <div className="text">
                                            <input  name="contractStartDate" value={state.contractStartDate} onChange={handleChange} className="form-control" type="date"  placeholder=''/>
                                        </div>
                                        </li>
                                       <li>
                                        <div className="title">Contract Expiry Date</div>
                                        <div className="text">
                                            <input name="contractExpireDate" value={state.contractExpireDate} onChange={handleChange} className="form-control" type="date"  placeholder=''/>
                                        </div>
                                        </li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="card tab-box">
                 <div className="row user-tabs">
                   <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                     <ul className="nav nav-tabs nav-tabs-bottom">
                    </ul>
                   </div>
                 </div>
               </div>
               <div className="tab-content">
                 {/* Profile Info Tab */}
                 <div id="emp_profile" className="pro-overview tab-pane fade show active">
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Personal Informations </h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Passport No.</div>
                               <div className="text">
                                   <input name="passportno" value={state.passportno} onChange={handleChange} className="form-control floating" placeholder='xxxxxxxx'/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Passport Exp Date.</div>
                               <div className="text">
                                   <input name="passportExpiryDate" value={state.passportExpiryDate} onChange={handleChange} className="form-control" type="date"  placeholder='dd/mm/yyyy'/>
                               </div>
                             </li>

                             <li>
                               <div className="title">Nationality</div>
                               <div className="text">
                                   <select name="nationalityselected"  onChange={handleChange} className="form-control">
                                      <option value={state.nationalityselected}>Select Nationality</option>
                                        {nationality.map((nat, i) => (
                                            <option value={nat.id} >{nat.country_enNationality}</option> 
                                        ))}
                                    </select>

                               </div>
                             </li>
                             <li>
                               <div className="title">Religion</div>
                               <div className="text">
                                    <select name="religion" onChange={handleChange} className="select form-control">
                                      <option value={1}>Christian</option>          
                                      <option value={2}>Islam</option>                                 
                                      <option value={3}>Hinduism</option>      
                                      <option value={4}>Buddhism</option>       
                                      <option value={5}>Other</option>                                                                                                                                                                                                    
                                    </select>
                               </div>
                             </li>
                             <li>
                               <div className="title">Marital status</div>
                               <div className="text">
                                  <select name="maritialStatus" onChange={handleChange} className="select form-control">
                                      <option value={1}>Single</option>          
                                      <option value={2}>Maried</option>                                 
                                      <option value={3}>Divorce</option>      
                                      <option value={4}>Widowed</option>                                                                                                      
                                    </select>
                               </div>
                             </li>

                             <li>
                               <div className="title">No. of children</div>
                               <div className="text">
                                   <input name="numberofChildren" value={state.numberofChildren} onChange={handleChange} className="form-control floating" placeholder='0'/>
                               </div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Emergency Contact</h3>
                           <h5 className="section-title">Primary</h5>
                           <ul className="personal-info">
  
                             <li>
                               <div className="title">Name</div>
                               <div className="text">
                                    <input name="emergencycontactname" value={state.emergencycontactname} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                                </div>
                             </li>
                             <li>
                               <div className="title">Relationship</div>
                               <div className="text">
                                   <input name="emergencycontactrelationship" value={state.emergencycontactrelationship} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Phone </div>
                               <div className="text">
                                   <input name="emergencycontactphone" value={state.emergencycontactphone} onChange={handleChange} className="form-control floating" type="number" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Address </div>
                               <div className="text">
                                  <input name="emergencycontactAddress" value={state.emergencycontactAddress} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>

                           </ul>
                           {/* <hr /> */}
                           {/* <h5 className="section-title">Secondary</h5> */}
                           {/* <ul className="personal-info">
                             <li>
                               <div className="title">Name</div>
                               <div className="text">Karen Wills</div>
                             </li>
                             <li>
                               <div className="title">Relationship</div>
                               <div className="text">Brother</div>
                             </li>
                             <li>
                               <div className="title">Phone </div>
                               <div className="text">9876543210, 9876543210</div>
                             </li>
                           </ul> */}
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Bank information</h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Bank name</div>
                               <div className="text">
                                 <input name="employeebankname" value={state.employeebankname} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Branch Name</div>
                               <div className="text">
                                 <input name="bankbranchname" value={state.bankbranchname} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Bank account No.</div>
                               <div className="text">
                                  <input name="employeebankacc" value={state.employeebankacc} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">IBAN NUMBER</div>
                               <div className="text">
                                  <input name="employeebankiban" value={state.employeebankiban} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>

                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Salary Information</h3>
                 
                            <ul className="personal-info">
                             <li>
                               <div className="title">Basic Salay</div>
                               <div className="text">
                                 <input name="basic_salary"  value={state.basic_salary} onChange={handleChange}  className="form-control floating" type="number" defaultValue={0}/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Transport Allowance</div>
                               <div className="text">
                               <input name="transport_allowance" value={state.transport_allowance} onChange={handleChange}  className="form-control floating" type="number" defaultValue={0}/>                               </div>
                             </li>
                             <li>
                               <div className="title">House Allowance</div>
                               <div className="text">
                               <input name="house_allowance" value={state.house_allowance} onChange={handleChange} className="form-control floating" type="number" defaultValue={0}/>                               </div>
                             </li>
                             <li>
                               <div className="title">Other Allowance</div>
                               <div className="text">
                               <input name="other_allowance" value={state.other_allowance} onChange={handleChange} className="form-control floating" type="number" defaultValue={0}/>                               </div>
                             </li>
                             {/* <li>
                               <div className="title">Increment</div>
                               <div className="text">
                               <input name="transportallownce"  className="form-control floating" type="number" defaultValue={0}/>                               </div>
                             </li> */}
                             {/* <li>
                               <div className="title">Bonus </div>
                               <div className="text">
                               <input name="transportallownce"  className="form-control floating" type="number" defaultValue={0}/>                               </div>
                             </li> */}
                             <li>
                               <div className="title">Total</div>
                               <div className="text">
                               <input name="total_salary" value={Number(state.basic_salary) + Number(state.transport_allowance)+Number(state.house_allowance)+Number(state.other_allowance)} onChange={handleChange}  className="form-control floating" type="number"  readOnly/>                               </div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div className="row">
                   <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Home Country Address</h3>
                 
                            <ul className="personal-info">
                             <li>
                               <div className="title">Address</div>
                               <div className="text">
                                 <input name="employeehomeadd" value={state.employeehomeadd} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Phone</div>
                               <div className="text">
                                  <input name="employeehomephone" value={state.employeehomephone} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>
                             <li>
                               <div className="title">Phone 2</div>
                               <div className="text">
                                  <input name="employeehomephone2" value={state.employeehomephone2} onChange={handleChange} className="form-control floating" type="text" placeholder=''/>
                               </div>
                             </li>

                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Uploads</h3>
                 
                            <ul className="personal-info">
                              <li>
                               <div className="title">Passport</div>
                               <div className="text">
                               <input type='file' onChange={handlePassportImage}  name="passport_copy" id="passport_copy" className="form-control floating" accept=".png, .jpg, .jpeg" />
                               </div>
                             </li>
                             <li>
                               <div className="title">Certification</div>
                               <div className="text">
                               <input type='file' onChange={handleCertificationImage}  name="certification_copy" id="certification_copy" className="form-control floating" accept=".png, .jpg, .jpeg" />
                             </div>
                             </li>
                             <li>
                               <div className="title">ID Copy</div>
                               <div className="text">
                               <input type='file' onChange={handleIDImage}  name="id_copy" id="id_copy" className="form-control floating" accept=".png, .jpg, .jpeg" />
                               </div>
                             </li>
                       
                           </ul>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="page-header">

                      <div className="col-auto float-end ml-auto">
                      <a  href="#" className="btn add-btn" onClick={saveEmployee}><i className="fa fa-plus" /> Save Data</a>
                      </div>
                  </div>
                   {/* <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Education Informations </h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">International College of Arts and Science (UG)</a>
                                     <div>Bsc Computer Science</div>
                                     <span className="time">2000 - 2003</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">International College of Arts and Science (PG)</a>
                                     <div>Msc Computer Science</div>
                                     <span className="time">2000 - 2003</span>
                                   </div>
                                 </div>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Experience </h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Zen Corporation</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Ron-tech</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Dalt Technology</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div> */}
                 </div>
                 {/* /Profile Info Tab */}
                 {/* Projects Tab */}
                 <div className="tab-pane fade" id="emp_projects">
                   <div className="row">
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Office Management</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">9</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Project Management</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">5</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Video Calling App</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">3</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Hospital Administration</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">4</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* /Projects Tab */}
                 {/* Bank Statutory Tab */}
                 {/* <div className="tab-pane fade" id="bank_statutory">
                   <div className="card">
                     <div className="card-body">
                       <h3 className="card-title">  Salary Information</h3>
                   
                         <div className="row">
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Salary basis <span className="text-danger">*</span></label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Transport Allowance<small className="text-muted">per month</small></label>
                               <div className="input-group">
                                 <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                               </div>
                             </div>
                           </div>
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">House Allowance</label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Other Allowance</label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           <div className="row">
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Increment</label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Bonus</label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           <div className="col-sm-3">
                             <div className="form-group">
                               <label className="col-form-label">Total</label>
                               <input type="number" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                             </div>
                           </div>
                           </div>
                         </div> */}
                         {/* <hr />
                         <h3 className="card-title"> PF Information</h3>
                         <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">PF contribution</label>
                               <select className="select">
                                 <option>Select PF contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">PF No. <span className="text-danger">*</span></label>
                               <select className="select">
                                 <option>Select PF contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                         </div>
                         <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Employee PF rate</label>
                               <select className="select">
                                 <option>Select PF contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                               <select className="select">
                                 <option>Select additional rate</option>
                                 <option>0%</option>
                                 <option>1%</option>
                                 <option>2%</option>
                                 <option>3%</option>
                                 <option>4%</option>
                                 <option>5%</option>
                                 <option>6%</option>
                                 <option>7%</option>
                                 <option>8%</option>
                                 <option>9%</option>
                                 <option>10%</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Total rate</label>
                               <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                             </div>
                           </div>
                         </div>
                         <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Employee PF rate</label>
                               <select className="select">
                                 <option>Select PF contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                               <select className="select">
                                 <option>Select additional rate</option>
                                 <option>0%</option>
                                 <option>1%</option>
                                 <option>2%</option>
                                 <option>3%</option>
                                 <option>4%</option>
                                 <option>5%</option>
                                 <option>6%</option>
                                 <option>7%</option>
                                 <option>8%</option>
                                 <option>9%</option>
                                 <option>10%</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Total rate</label>
                               <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                             </div>
                           </div>
                         </div>
                         <hr /> */}
                         {/* <h3 className="card-title"> ESI Information</h3>
                         <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">ESI contribution</label>
                               <select className="select">
                                 <option>Select ESI contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">ESI No. <span className="text-danger">*</span></label>
                               <select className="select">
                                 <option>Select ESI contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                         </div> */}
                         {/* <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Employee ESI rate</label>
                               <select className="select">
                                 <option>Select ESI contribution</option>
                                 <option>Yes</option>
                                 <option>No</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                               <select className="select">
                                 <option>Select additional rate</option>
                                 <option>0%</option>
                                 <option>1%</option>
                                 <option>2%</option>
                                 <option>3%</option>
                                 <option>4%</option>
                                 <option>5%</option>
                                 <option>6%</option>
                                 <option>7%</option>
                                 <option>8%</option>
                                 <option>9%</option>
                                 <option>10%</option>
                               </select>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Total rate</label>
                               <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                             </div>
                           </div>
                         </div> */}
                        {/* 
                     </div>
                   </div>
                 </div> */}
                 {/* /Bank Statutory Tab */}
               </div>
             </div>
             {/* /Page Content */}
             {/* Profile Modal */}

             {/* /Experience Modal */}
           </div>
        
     );
   }
   export default AddEmployee;
 