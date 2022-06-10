/**
 * Signin Firebase
 */

 import React, { useEffect,useState } from 'react';

import axios from 'axios';
import { baseUrl,baseUrlImage } from '../../../Entryfile/BaseUrl';
import Swal from 'sweetalert2'

const company = () => {
    const [isLoading, setIsLoading] = useState(false);
    
const [time_categories,setTimae_Categories] = useState([])


    const [company, setCompany] = useState({
         name:"",
         email:"",
         phone:"",
         fulladdress:"",
         ip_address:"",
         website_url:"",
         logo:"",
         imageUpload:"",
         imageShow:"",
         start_time:"",
         last_time_allow:"",
         amount:"",
         total_break_time:"",
         check_out_time:""
      })



useEffect(() => {
  
  
      axios.get(baseUrl+"company")
      .then(res => {
        setCompany(res.data.company)
        setTimae_Categories(res.data.time_categories)
      
      }) 
 

  }, [])

  function handleChange(evt) {
    const value = evt.target.value;
    setCompany({
      ...company,
      [evt.target.name]: value
    });
  }

  const handleSubmit = (e) => {
      e.preventDefault()
 
    //  const data = state
     axios.post(baseUrl+"company", company).then(res=>{
     
    //   Swal.fire(
    //   'Success!',
    //    'Successfully updated!',
    //   'success',
      
    //  )

    Swal.fire({
      icon: 'success',
      title: 'Successfully updated!',
      showConfirmButton: true,
      timer: 1500
    })
     setCompany(res.data.company)
    // history.push("/app/employee/allemployees")

       
     })
  }

  const handleImage = (e) => { 
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
    createImage(files[0]);
    setCompany({ 
      ...company,
      imageShow: URL.createObjectURL(e.target.files[0]) ,
    })
}
function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
        setCompany({
          ...company,
          imageUpload: e.target.result
        });
    };
    reader.readAsDataURL(file);
}


      return ( 
       <div className="page-wrapper">

       {/* Page Content */}
       <div className="content container-fluid">
         <div className="row">
           <div className="col-md-8 offset-md-2">
             {/* Page Header */}
             <div className="page-header">
               <div className="row">
                 <div className="col-sm-12">
                   <h3 className="page-title">Company Settings</h3>
                 </div>
               </div>
             </div>
             {/* /Page Header */}
             <form>
               <div className="row">
                 <div className="col-sm-6">
                   <div className="form-group">
                     <label>Company Name <span className="text-danger">*</span></label>
                     <input name="name" className="form-control" type="text" defaultValue={company.name} onChange={handleChange} />
                   </div>
                 </div>
                 <div className="col-sm-6">
                   <div className="form-group">
                     <label>Full Address</label>
                     <input name="fulladdress" className="form-control " defaultValue={company.fulladdress} type="text" onChange={handleChange} />
                   </div>
                 </div>
               </div>

               <div className="row">
                 <div className="col-sm-6">
                   <div className="form-group">
                     <label>Email</label>
                     <input name="email" className="form-control" defaultValue={company.email} type="email" onChange={handleChange} />
                   </div>
                 </div>
                 <div className="col-sm-6">
                   <div className="form-group">
                     <label>Phone Number</label>
                     <input name="phone" className="form-control" defaultValue={company.phone} type="text"  onChange={handleChange} />
                   </div>
                 </div>
               </div>
               <div className="row">
                 <div className="col-sm-6">
                 <div className="form-group">
                     <label>Website Url</label>
                     <input name="website_url" className="form-control" defaultValue={company.website_url} type="text" onChange={handleChange} />
                   </div>
                
                 </div>
                 <div className="col-sm-6">
                   <div className="form-group">
                     <label>Logo</label>
                     <img style={{height:'35px',width:'35px'}} src={baseUrlImage+"/uploads/logo/"+company.logo}  />
                     <input name="logo" className="form-control"  type="file" onChange={handleImage} />
                   </div>
                 </div>
               </div>
               <h4>Attend Settings <span className='text-danger'>Required for Attends</span></h4>
               <hr />
               <div className="row">
                 <div className="col-sm-12">
                 <div className="form-group">
                     <label>Company Network IP Address <span className='text-danger'></span></label>
                     <input name="ip_address" className="form-control" defaultValue={company.ip_address} type="text" onChange={handleChange} />
                   </div>
                 </div>
               </div>
               <div className='row'>
                 <div className='col-md-3'>
                 <div className="form-group">
                     <label>Start Time <span className='text-danger'></span></label>
                     <input name="start_time" className="form-control"  defaultValue={company.start_time} type="text" placeholder='00:00:00' onChange={handleChange} />
                   </div>
                 </div>
                 <div className='col-md-3'>
                 <div className="form-group">
                     <label>Last Time Allow <span className='text-danger'></span></label>
                     <input name="last_time_allow" className="form-control"  defaultValue={company.last_time_allow} type="text" placeholder='00:00:00' onChange={handleChange} />
                   </div>
                 </div>

                 {/* <div className='col-md-3'>
                 <div className="form-group">
                     <label> Late each<span className='text-danger'></span></label>
                    <select className='form-control' onChange={handleChange} name="late_category">
                    <option value={company.late_category}>{company.late_category_name}</option>
                    {time_categories.map((time_category) =>(
                      <>
                      {time_category.id !=company.late_category? 
                      <option value={time_category.id}>{time_category.name}</option>:
                      null}
                      </>
   

                    ))} */}
                      {/* <option value="1">1 Hour</option>
                      <option value="2">50 Minutes</option>
                      <option value="3">40 Minutes</option>
                      <option value="4">30 Minutes</option>
                      <option value="5">20 Minutes</option>
                      <option value="6">10 Minutes</option>
                      <option value="7">5 Minutes</option> */}

                    {/* </select>
                   </div>
                 </div> */}
                 <div className='col-md-3'>
                 <div className="form-group">
                     <label>Amount<span className='text-danger'></span></label>
                     <input name="amount" className="form-control"  defaultValue={company.amount} type="text" placeholder='20' onChange={handleChange} />
                   </div>
                 </div>
               </div>
               <div className='row'>
               <div className='col-md-4'>
                 <div className="form-group">
                     <label>Break Time in hour<span className='text-danger'></span></label>
                     <input name="total_break_time" className="form-control"  defaultValue={company.total_break_time} type="text" placeholder='1' onChange={handleChange} />
                   </div>
                 </div>
                 <div className='col-md-4'>
                 <div className="form-group">
                     <label>Check Out Time<span className='text-danger'></span></label>
                     <input name="check_out_time" className="form-control"  defaultValue={company.check_out_time} type="text" placeholder='00:00:00' onChange={handleChange} />
                   </div>
                 </div>

                 <div className='col-md-4 mt-3'>
                 <div className="form-group">
                   <label></label>
                 <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Save</button>
                 </div>
                 </div>


               </div>
           
             </form>
           </div>
         </div>
       </div>
       {/* /Page Content */}
     </div>
      );
}

export default company;
