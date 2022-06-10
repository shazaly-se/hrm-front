import React,{useEffect,useState} from 'react'
import {Link,useHistory ,useParams} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Switch } from 'antd';

import { baseUrl } from '../../Entryfile/BaseUrl'
 function EditUser() {

    let params = useParams()
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
        email:"",
        role_id:0,
        department_id:0,
        activation:0,

     })
     const [roles, setRoles] = useState ([])

     const [anylocation, setAnyLocation] = useState (false)

     const handleLocation = (checked) => {
       setAnyLocation(checked)
    //  console.log(`switch to ${checked}`);
    };

    useEffect(() => {
        let id = params.id
      axios.get(baseUrl+"users/"+id).then(res=>{
          setUser(res.data.user)
      })
  
    }, [])

    useEffect(() => {
        axios.get(baseUrl+"roles").then(res=>{
            setRoles(res.data)
        })
    
      }, [])

      function handleChange(evt) {
        const value = evt.target.value;
        setUser({
          ...user,
          [evt.target.name]: value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        
        let id = params.id 
   
      //  const data = state
       axios.put(baseUrl+"users/"+id, user).then(res=>{
      //console.log(res.data.user)
          setUser(res.data.user)
        Swal.fire(
        'Success!',
         'Successfully updated!',
        'success'
       )
       history.push("/app/administrator/users")
  
         
       })
    }

  return (
    <div className="page-wrapper">
    <div className="content container-fluid">

      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Users</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Edit User</li>
            </ul>
          </div>
      
        </div>
      </div>
      <div className='row m-3'>
        
      </div>
      <div className='row m-3'>
          <div className='col-md-4'>
          <label> Name</label>
         <input name="name" value={user.name}  className="form-control" onChange={handleChange} />
          </div>
          <div className='col-md-4'>
          <label>Email</label>
         <input name="email" value={user.email}  className="form-control" onChange={handleChange} />
          </div>
    
      </div>

      <div className='row m-3'>
          <div className='col-md-4'>
              <label>Role</label>
              <select name='role_id' className='form-control' onChange={handleChange}>
                  <option value={user.role_id}>{user.role}</option>
                  {roles.map(role=>(
                      
                      <option value={role.id}>{role.name}</option>
                   
                  ))}
                  
              </select>
          </div>
          <div className='col-md-4'>
              <label>Department</label>
              <select className='form-control'>
                  <option>admin</option>
                  <option>user</option>
              </select>
          </div>
      </div>
      <div className='row m-3'>
          <div className='col-md-8'>
              <label>Activation</label>
              <select name='activation' className='form-control' onChange={handleChange}>
                  {user.activation ==1?
                  <>
                  <option value="1">active</option>
                  <option value="0">inactive</option>
                  </>:
                  <>
                  <option value="0">inactive</option>
                  <option value="1">active</option>
                  </>
                  }
                  
              </select>
          </div>
        
      </div>
      <div className='row m-5'>
        <label>Any location</label>
      <div className='col-md-4 m-3'>
            <Switch defaultChecked={anylocation}  onChange={handleLocation} />
            </div>
      </div>
  
     

    <div className='m-3'>
    <a className="btn btn-primary m-1" onClick={handleSubmit}><i className="fa fa-save m-r-5" />Update User</a>
    </div>
    <div className='row m-2'>
     <label>Permissions will take</label>
     

    </div>
    </div>


    {/* /Delete Department Modal */}
  </div>
  )
}

export default EditUser
