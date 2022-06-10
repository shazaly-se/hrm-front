
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link ,useHistory ,useParams} from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { Modal, Button, Form } from "react-bootstrap";
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import Multiselect from 'multiselect-react-dropdown';

//import { MultiSelect } from "react-multi-select-component";


const Announcement = () => {
    const token = Cookies.get("token")
    const history = useHistory();

    const [type_id, setType_id] =  useState(0);

    const [selected, setSelected] = useState([]);
    const [announcement_types, setAnnouncement_types] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [description, setDescription] = useState("");


    useEffect(() => {
        axios.get(baseUrl+"alldepartments",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(res => {
          setDepartments(res.data.departments)
        })
        .catch(e=>console.log("sommmsms"))
      }, [])

      useEffect(() => {
        axios.get(baseUrl+"announcement_types")
        .then(res => {
            setAnnouncement_types(res.data.announcementTypes)
        })
        .catch(e=>console.log("sommmsms"))
      }, [])

      const handleType =(event) =>{
        setType_id(event.target.value)

      }
      const handleDescription =(event) =>{
          setDescription(event.target.value)
    }

    function handleSubmit (event) {
       event.preventDefault();
    //   let id = params.id
      const data = {type_id: type_id,departments:selected,description:description}
 
      axios.post(baseUrl+"announcement",data)
      .then(res =>{
        Swal.fire(
          'Success!',
           'Successfully Sent!',
          'success'
         )
         history.push("/app/employee/announcements")
      
      })

    //   axios.put(baseUrl+"role-permissions/"+id, data)
    //     .then(res => {
    //       Swal.fire(
     
    //         {
              
    //           icon: 'success',
    //           title: 'Successfully Updated!',
    //           //showConfirmButton: false,
    //           timer: 1500
    //         }
    //       )
    //       history.push("/app/employee/roles-list")
    //     })
    }


      // console.log("data sent",data);




      const onSelect = (selectedList, selectedItem) => {
       // console.log(selectedItem)
       setSelected(selectedList)
    }
    
    const onRemove = (selectedList, removedItem)=> {
      setSelected(selectedList)
    }



      return (         
      <div className="page-wrapper">
      <div className="content container-fluid">

        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Announcement</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">New Announcement</li>
              </ul>
            </div>
        
          </div>
        </div>
     
    
       
       <div className='row m-3'>
           <div className='col-md-4'>
                       <label>Type</label>
                       <select className='form-control' onChange={handleType}>
                       <option  value="0">all</option>
                           {announcement_types.map(announcement_type =>(
                                  <option key={announcement_type.id} value={announcement_type.id}>{announcement_type.name}</option>  
                           ))}
                    
                       </select>
           </div>
           <div className='col-md-8'>
<label>Departments: </label>
      {/* <Multiselect
        options={options}
     //   value={selected}
      //  onChange={setSelected}
        labelledBy="Select"
      />    */}

<Multiselect
options={departments} // Options to display in the dropdown
//selectedValues={selectedValue} // Preselected value to persist in dropdown
onSelect={onSelect} // Function will trigger on select event
onRemove={onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
</div>

      </div>

      <div className="row m-4">
      <label >Description</label>
      <textarea  rows="5" onChange={handleDescription}></textarea>
       </div>
      <div className='m-3'>
      <a className="btn btn-primary m-1" onClick={handleSubmit}><i className="fa fa-send m-r-5" />Send </a>
      </div>

      </div>

      {/* /Page Content */}
      {/* Add Department Modal */}





      {/* /Edit Department Modal */}
      {/* Delete Department Modal */}

      {/* /Delete Department Modal */}
    </div>
        );
}

export default Announcement;
