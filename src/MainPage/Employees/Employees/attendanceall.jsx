import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AttendanceAll = () => {
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Attendance - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Attendance</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Attendance</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col">
            <div className="card recent-activity">
              <div className="card-body">
                <h5 className="card-title">Filter Attendance</h5>
                <div className="row">
                   <div className="col-sm-2">
                    <div className="form-group form-focus select-focus">
                      <div>
                        <input type="text" className="form-control floating" />
                      </div>
                      <label className="focus-label">Employee Name</label>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group form-focus select-focus">
                      <div>
                        <input type="date" className="form-control floating" />
                      </div>
                      <label className="focus-label">Date</label>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group form-focus select-focus">
                      <div>
                        <input type="date" className="form-control floating" />
                      </div>
                      <label className="focus-label">Date</label>
                    </div>
                  </div>
                <div className="col-sm-2">
                  <div className="form-group form-focus select-focus">
                    <select className="select floating">
                      <option>-</option>
                      <option>Jan</option>
                      <option>Feb</option>
                      <option>Mar</option>
                      <option>Apr</option>
                      <option>May</option>
                      <option>Jun</option>
                      <option>Jul</option>
                      <option>Aug</option>
                      <option>Sep</option>
                      <option>Oct</option>
                      <option>Nov</option>
                      <option>Dec</option>
                    </select>
                    <label className="focus-label">Select Month</label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group form-focus select-focus">
                    <select className="select floating">
                      <option>-</option>
                      <option>2019</option>
                      <option>2018</option>
                      <option>2017</option>
                      <option>2016</option>
                      <option>2015</option>
                    </select>
                    <label className="focus-label">Select Year</label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <a href="#" className="btn btn-success btn-block w-100 p-2">
                    {" "}
                    Search{" "}
                  </a>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Search Filter */}
        {/* <div className="row filter-row">
              <div className="col-sm-3">  
                <div className="form-group form-focus select-focus">
                  <div>
                    <input type="date" className="form-control floating datetimepicker" />
                  </div>
                  <label className="focus-label">Date</label>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="form-group form-focus select-focus">
                  <select className="select floating"> 
                    <option>-</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                  </select>
                  <label className="focus-label">Select Month</label>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="form-group form-focus select-focus">
                  <select className="select floating"> 
                    <option>-</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                  </select>
                  <label className="focus-label">Select Year</label>
                </div>
              </div>
              <div className="col-sm-3">  
                <a href="#" className="btn btn-success btn-block w-100"> Search </a>  
              </div>     
            </div> */}
        {/* /Search Filter */}
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee Name</th>
                    <th>Date </th>
                    <th>Punch In</th>
                    <th>Punch Out</th>
                    <th>Total Work hr</th>
                    <th>Overtime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Biniam A</td>
                    <td>19 Feb 2019</td>
                    <td>10 AM</td>
                    <td>7 PM</td>
                    <td>9 hrs</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Shazalay</td>
                    <td>20 Feb 2019</td>
                    <td>10 AM</td>
                    <td>7 PM</td>
                    <td>9 hrs</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default AttendanceAll;
