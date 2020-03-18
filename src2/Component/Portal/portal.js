
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ActivityLoader from 'react-loader-spinner';
import Loader from '../Loader/loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputBox from '../InputComponent/InputComponent';
import {Dropdown} from 'primereact/dropdown';
import MultiSelect from '../multiselect.js'
import DropDown from '../dropdown.js';
import CSVReader from "react-csv-reader";
import Moment from 'react-moment';
const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};
const modalRoot=document.getElementById('portal_modal');

const Modal =(props)=>{
  const [joining_date,change_joining_date]=useState(new Date());
  const [releaving_date,change_releaving_date]=useState();
  const [rolesSelect,changeRolesSelect]=useState([])
  const [channelsSelect,changeChannelsSelect]=useState([]);
  const [employeeSelect,changeEmployeeSelect]=useState(null);
  const {portalData}=props;
  const [libraryCsvData,changeLibraryCsvData]=useState([])
  const [commercialCsvData,changeCommercialCsvData]=useState([])
  const [showTable,changeShowTable]=useState(false)
  const uploadLibraryCsv = (data, fileName) =>
  {
    if(data[0].content_id==null || data[0].name==null || data[0].short_name==null || data[0].category_id==null || data[0].duration==null || data[0].channel_id==null || data[0].rights==null)
    {
      alert('Wrong');
      return false;
    }
    else {
    const newArr1 = data.map(v => ({...v, status: 1}));
    changeLibraryCsvData(newArr1);
    changeShowTable(true)
  }
}
const uploadCommercialCsv = (data, fileName) =>
{
  if(data[0].commercial_id==null || data[0].name==null || data[0].short_name==null || data[0].duration==null || data[0].rights==null)
  {
    alert('Wrong');
    return false;
  }
  else {
  const newArr1 = data.map(v => ({...v, status: 1}));
  changeCommercialCsvData(newArr1);
  changeShowTable(true)
}
}
const checkeddata=(type,id)=>{
  var myArray=[];
  // var data=$( "#"+id+":checked" ).map(function() {
  //   console.log(($(this).val()));
  //     return $(this).val();
  // }).get();
  $("#"+id+":checked").each(function(){
     myArray.push($(this).val());
   });
  props.setData(type,myArray)
 //

}
return ReactDOM.createPortal(
    <div className="modal" style={{
      backgroundColor:'rgba(0,0,0,0.6)'
    }} >
  {(props.modalType=="employee_master") && <div class="modal-dialog" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
          <form id="create_employee_form"  onSubmit={(e)=>props.createEmployee(e,joining_date,releaving_date)}>
            <h3>Employee Master</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="inputbox">
                  <label>Name<sup>*</sup></label>
                  <InputBox type="text" placeholder="Name" name="emp_name" required="true"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Code<sup>*</sup></label>
                  <InputBox type="text" placeholder="Code" name="emp_code" required="true"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Zone</label>
                  <select name="emp_zone">
                    <option value="North" selected>North</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                    <option value="West">West</option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="inputbox addr">
                  <label>Address</label>
                  <input type="text" placeholder="Address" name="emp_address" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Place<sup>*</sup></label>
                  <select name="emp_place" required>
                    <option value="Delhi" selected>Delhi</option>
                    <option value="Gujarat" >Gujarat</option>
                    <option value="Mumbai" >Mumbai</option>
                    <option value="Punjab" >Punjab</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Pin Code</label>
                  <input type="text" placeholder="Pin code" name="emp_pincode" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Mobile No<sup>*</sup></label>
                  <input type="text" placeholder="Mobile no" name="emp_mobile_no" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Fax No</label>
                  <input type="text" placeholder="Fax no" name="emp_fax_no" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Phone No</label>
                  <input type="text" placeholder="Phone no" name="emp_phone_no" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Email<sup>*</sup></label>
                  <input type="email" placeholder="Email" name="emp_email" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Department<sup>*</sup></label>
                  <input type="text" placeholder="Department" name="emp_department" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Designation<sup>*</sup></label>
                  <input type="text" placeholder="Designation" name="emp_designation" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Joining Date<sup>*</sup></label>
                  <DatePicker
                     selected={joining_date}
                     onChange={(value, e) => change_joining_date(value)}
                     dateFormat="MM-dd-yyyy"
                     showYearDropdown={true}
                     showMonthDropdown={true}
                   />
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Releaving Date</label>
                  <DatePicker
                     selected={releaving_date}
                     onChange={(value, e) => change_releaving_date(value)}
                     dateFormat="MM-dd-yyyy"
                     showYearDropdown={true}
                     showMonthDropdown={true}
                   />
                </div>
              </div>
            </div>
            {/*<div class="error_box"><ul><li><p>The license rights field is required.</p></li></ul></div>*/}
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
              <button type="button" class="btndefault" onClick={()=>{$('#create_employee_form').trigger("reset")}}>Clear</button>
            </div>
          </form>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="employee_master_detail") && <div class="modal-dialog sm_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form view">
          <h4>Employee Master Detail</h4>
          <ul class="inf_list">
            <li class="fw">
              <p><span>Name :</span> <span class="vl">{portalData.emp_name}</span></p>
            </li>
            <li>
              <p><span>Code :</span> <span class="vl">{portalData.emp_code}</span></p>
            </li>
            <li>
              <p><span>Zone :</span> <span class="vl">{portalData.emp_zone}</span></p>
            </li>
            <li class="fw">
              <p><span>Address :</span> <span class="vl">{portalData.emp_address}</span></p>
            </li>
            <li>
              <p><span>Place :</span> <span class="vl">{portalData.emp_location}</span></p>
            </li>
            <li>
              <p><span>Pin Code :</span> <span class="vl">{portalData.emp_pincode}</span></p>
            </li>
            <li>
              <p><span>Mobile No :</span> <span class="vl">{portalData.emp_mobile}</span></p>
            </li>
            <li>
              <p><span>Fax No :</span> <span class="vl">{portalData.emp_fax}</span></p>
            </li>
            <li>
              <p><span>Phone No :</span> <span class="vl">{portalData.emp_phone}</span></p>
            </li>
            <li>
              <p><span>Email :</span> <span class="vl">{portalData.emp_email}</span></p>
            </li>
            <li>
              <p><span>Department :</span> <span class="vl">{portalData.emp_department}</span></p>
            </li>
            <li>
              <p><span>Designation :</span> <span class="vl">{portalData.emp_designation}</span></p>
            </li>
            <li>
              <p><span>Joining Date :</span> <span class="vl">{portalData.emp_joining_date}</span></p>
            </li>
            <li>
              <p><span>Releaving Date :</span> <span class="vl">{portalData.emp_releaving_date}</span></p>
            </li>
          </ul>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="channel_master") && <div class="modal-dialog small_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
          <form id="create_channel_form"  onSubmit={props.createChannel}>
            <h3>Channel Master</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="inputbox">
                  <label>Name<sup>*</sup></label>
                  <input type="text" placeholder="Name" name="name" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Short Name<sup>*</sup></label>
                  <input type="text" placeholder="Code" name="short_name" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Location</label>
                  <select name="location" required>
                    <option value="India" selected>India</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>
            </div>
            {/*<div class="error_box"><ul><li><p>The license rights field is required.</p></li></ul></div>*/}
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
              <button type="button" class="btndefault" onClick={()=>{$('#create_channel_form').trigger("reset")}}>Clear</button>
            </div>
          </form>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="channel_master_detail") && <div class="modal-dialog small_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form view">
        <h4>Channel Master Detail</h4>
        <ul class="inf_list">
          <li class="fw">
            <p><span>Name :</span> <span class="vl">{portalData.channel_name}</span></p>
          </li>
          <li>
            <p><span>Short Name :</span> <span class="vl">{portalData.short_name}</span></p>
          </li>
          <li>
            <p><span>Location :</span> <span class="vl">{portalData.location}</span></p>
          </li>
        </ul>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="login_master") && <div class="modal-dialog" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="user_login_form">
          <form onSubmit={(e)=>props.createLoginUser(e,rolesSelect,channelsSelect,employeeSelect)}>
            <h3>User Login Master</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="inputbox">
                  <label>Employee<sup>*</sup></label>
                  <DropDown list={props.employeeList} optionLabel="emp_name" filterPlaceholder="Select Employee"  placeholder="Select Employee" selectVal={employeeSelect} onChangeSelect={changeEmployeeSelect} required="true"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Login Name<sup>*</sup></label>
                  <input type="text" placeholder="Login name" name="login_name" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Password<sup>*</sup></label>
                  <input type="text" placeholder="Password" name="password" required/>
                </div>
              </div>
              <div class="col-md-12">

                <div class="inputbox">
                  <label>Module<sup>*</sup></label>
                  <MultiSelect list={props.roleList} placeholder="Select Roles" selectVal={rolesSelect} onChangeSelect={changeRolesSelect} required="true"/>
                </div>
              </div>
            </div>
            {/*<div class="module_table">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Module</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Administrator</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Sales-Admin</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Scheduling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>*/}
            <hr></hr>
            <div class="row">
              <div class="col-md-12">
                <div class="inputbox">
                  <label><b>Channels List</b> <sup>*</sup></label>
                  <MultiSelect list={props.channelList} placeholder="Select Channels" selectVal={channelsSelect} onChangeSelect={changeChannelsSelect} required="true"/>
                </div>
              </div>
            </div>
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
            </div>
          </form>
        </div>}
        {props.warning_msg.length>0 && <div class="error_box"><ul>
          {props.warning_msg.map((res,key)=>{
            return(<li><p>{res}</p></li>)
          })}
          </ul></div>}
          <span id="error_msg" style={{color:'red'}}>{props.auth_err}</span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="login_master_detail") && <div class="modal-dialog sm_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form view">
          <h4>Employee Master Detail</h4>
          <ul class="inf_list">
            <li class="fw">
              <p><span>Name :</span> <span class="vl">{portalData.emp_name}</span></p>
            </li>
            <li>
              <p><span>Code :</span> <span class="vl">{portalData.emp_code}</span></p>
            </li>
            <li>
              <p><span>Zone :</span> <span class="vl">{portalData.emp_zone}</span></p>
            </li>
            <li class="fw">
              <p><span>Address :</span> <span class="vl">{portalData.emp_address}</span></p>
            </li>
            <li>
              <p><span>Place :</span> <span class="vl">{portalData.emp_location}</span></p>
            </li>
            <li>
              <p><span>Pin Code :</span> <span class="vl">{portalData.emp_pincode}</span></p>
            </li>
            <li>
              <p><span>Mobile No :</span> <span class="vl">{portalData.emp_mobile}</span></p>
            </li>
            <li>
              <p><span>Fax No :</span> <span class="vl">{portalData.emp_fax}</span></p>
            </li>
            <li>
              <p><span>Phone No :</span> <span class="vl">{portalData.emp_phone}</span></p>
            </li>
            <li>
              <p><span>Email :</span> <span class="vl">{portalData.emp_email}</span></p>
            </li>
            <li>
              <p><span>Department :</span> <span class="vl">{portalData.emp_department}</span></p>
            </li>
            <li>
              <p><span>Designation :</span> <span class="vl">{portalData.emp_designation}</span></p>
            </li>
            <li>
              <p><span>Joining Date :</span> <span class="vl">{portalData.emp_joining_date}</span></p>
            </li>
            <li>
              <p><span>Releaving Date :</span> <span class="vl">{portalData.emp_releaving_date}</span></p>
            </li>
          </ul>
          <div class="chn_rol">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Roles</th>
                    </tr>
                    {props.roleListing.length>0 && props.roleListing.map((res,key)=>{
                      return(<tr>
                        <td>{res}</td>
                      </tr>)
                    })}
                  </tbody>
                </table>
                </div>
                <div class="col-md-6">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Channels</th>
                      </tr>
                      {props.channelListing.length>0 && props.channelListing.map((res,key)=>{
                        return(<tr>
                          <td>{res}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="add_category") && <div class="modal-dialog small_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
          <form id="create_category_form"  onSubmit={props.createCategory}>
            <h3>Create Category</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="inputbox">
                  <label>Name<sup>*</sup></label>
                  <input type="text" placeholder="Category Name" name="name" required/>
                </div>
              </div>
            </div>
            {/*<div class="error_box"><ul><li><p>The license rights field is required.</p></li></ul></div>*/}
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
              <button type="button" class="btndefault" onClick={()=>{$('#create_category_form').trigger("reset")}}>Clear</button>
            </div>
          </form>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="add_single_library") && <div class="modal-dialog sm_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
          <form id="add_single_library_form"  onSubmit={props.createSingleLibrary}>
            <h3>Library Content</h3>
            <div class="row">
            <div class="col-md-6">
              <div class="inputbox">
                <label>Content Id<sup>*</sup></label>
                <input type="text" placeholder="Content Id" name="content_id" required/>
              </div>
            </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Name<sup>*</sup></label>
                  <input type="text" placeholder="Name" name="name" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Short Name<sup>*</sup></label>
                  <input type="text" placeholder="Code" name="short_name" required/>
                </div>
              </div>
              <div class="col-md-6">
              <div class="inputbox">
                <label>Duration<sup>*</sup></label>
                <input type="text" placeholder="Duration" name="duration" required/>
              </div>
              </div>
              <div class="col-md-6">
              <div class="inputbox">
                <label>Category Id<sup>*</sup></label>
                <input type="text" placeholder="Category Id" name="category_id" required/>
              </div>
              </div>
              <div class="col-md-6">
              <div class="inputbox">
                <label>Channel Id<sup>*</sup></label>
                <input type="text" placeholder="Channel Id" name="channel_id" required/>
              </div>
              </div>
              <div class="col-md-12">
              <div class="inputbox">
                <label>Rights<sup>*</sup></label>
                <input type="text" placeholder="Rights" name="rights" required/>
              </div>
              </div>
            </div>
            {/*<div class="error_box"><ul><li><p>The license rights field is required.</p></li></ul></div>*/}
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
              <button type="button" class="btndefault" onClick={()=>{$('#add_single_library_form').trigger("reset")}}>Clear</button>
            </div>
          </form>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="add_csv_library") && <div class="modal-dialog" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
        <div className="upl_box">
          <label>
            <CSVReader
              cssClass="react-csv-input"
              onFileLoaded={uploadLibraryCsv}
              parserOptions={papaparseOptions}
            />
            <div class="inf">
              <a href="javascript:" class="btn s_btn">
                  Upload CSV
                  <span><i class="fas fa-upload" aria-hidden="true"></i></span>
              </a>
            </div>
          </label>
        </div>
        <div class="nocsvcont">
          <p>No csv data here</p>
        </div>
        {showTable &&<div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Content Id</th>
                <th>Name</th>
                <th>Short Name</th>
                <th>Category Id</th>
                <th>Channel Id</th>
                <th>Rights</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {libraryCsvData.map((res,key)=>{
              return(<tr key={key}><td className="tbl_l">{res.content_id}</td>
                        <td>{res.name}</td>
                        <td>{res.short_name}</td>
                        <td>{res.category_id}</td>
                        <td>{res.channel_id}</td>
                        <td>{res.rights}</td>
                        <td><Moment  element="span"  format="HH:mm" add={{hours:5.5}}>{res.duration}</Moment></td>
                    </tr>)
            })}
            </tbody>
          </table>
          <div class="buttons">
            <button type="button" class="btndefault" onClick={()=>props.createCsvLibrary(libraryCsvData)}>Save</button>
          </div>
          </div>}
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="add_single_commercial") && <div class="modal-dialog sm_modal" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
          <form id="add_single_commercial_form"  onSubmit={props.createSingleCommercial}>
            <h3>Library Content</h3>
            <div class="row">
            <div class="col-md-6">
              <div class="inputbox">
                <label>Commercial Id<sup>*</sup></label>
                <input type="text" placeholder="Content Id" name="commercial_id" required/>
              </div>
            </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Name<sup>*</sup></label>
                  <input type="text" placeholder="Name" name="name" required/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="inputbox">
                  <label>Short Name<sup>*</sup></label>
                  <input type="text" placeholder="Code" name="short_name" required/>
                </div>
              </div>
              <div class="col-md-6">
              <div class="inputbox">
                <label>Duration<sup>*</sup></label>
                <input type="text" placeholder="Duration" name="duration" required/>
              </div>
              </div>
              <div class="col-md-12">
              <div class="inputbox">
                <label>Rights<sup>*</sup></label>
                <input type="text" placeholder="Rights" name="rights" required/>
              </div>
              </div>
            </div>
            {/*<div class="error_box"><ul><li><p>The license rights field is required.</p></li></ul></div>*/}
            <div class="buttons">
              <button type="submit" class="btndefault">Save</button>
              <button type="button" class="btndefault" onClick={()=>{$('#add_single_commercial_form').trigger("reset")}}>Clear</button>
            </div>
          </form>
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
  {(props.modalType=="add_csv_commercial") && <div class="modal-dialog" role="document" style={{width:500}}>
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
        {!props.modal_loading && <div class="emp_form">
        <div className="upl_box">
          <label>
            <CSVReader
              cssClass="react-csv-input"
              onFileLoaded={uploadCommercialCsv}
              parserOptions={papaparseOptions}
            />
            <div class="inf">
              <a href="javascript:" class="btn s_btn">
                  Upload CSV
                  <span><i class="fas fa-upload" aria-hidden="true"></i></span>
              </a>
            </div>
          </label>
        </div>
        <div class="nocsvcont">
          <p>No csv data here</p>
        </div>
        {showTable &&<div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Commercial Id</th>
                <th>Name</th>
                <th>Short Name</th>
                <th>Rights</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {commercialCsvData.map((res,key)=>{
              return(<tr key={key}><td className="tbl_l">{res.commercial_id}</td>
                        <td>{res.name}</td>
                        <td>{res.short_name}</td>
                        <td>{res.rights}</td>
                        <td><Moment  element="span"  format="HH:mm" add={{hours:5.5}}>{res.duration}</Moment></td>
                    </tr>)
            })}
            </tbody>
          </table>
          <div class="buttons">
            <button type="button" class="btndefault" onClick={()=>props.createCsvCommercial(commercialCsvData)}>Save</button>
          </div>
          </div>}
        </div>}
          <span id="error_msg" style={{color:'red'}}></span>
          {props.modal_loading && <Loader message={props.loading_msg}/>}
        </div>
      </div>
    </div>}
    {(props.modalType=="select_library_data") && <div class="modal-dialog lib_data" role="document" style={{width:500}}>
        <div class="modal-content">
          <div class="modal-body">
          <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
          {!props.modal_loading && <div>
            <div class="searchbox">
              <div class="inputbox">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search Library" alt="" onChange={(e)=>props.getData(e.target.value,'library')}/>
              </div>
            </div>
            <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Content Id</th>
                  <th>Name</th>
                  <th>Short Name</th>
                  <th>Rights</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
              {props.libraryData.map((res,key)=>{
                return(<tr key={key}><td>
                    <label className="checkbox">
                      <input type="checkbox" Value={res._id} id="selected_library"/>
                      <span><i class="fas fa-check"></i></span>
                    </label>
                  </td>
                  <td className="tbl_l">{res.content_id}</td>
                          <td>{res.name}</td>
                          <td>{res.short_name}</td>
                          <td>{res.rights}</td>
                          <td><Moment  element="span"  format="HH:mm" add={{hours:5.5}}>{res.duration}</Moment></td>
                      </tr>)
              })}
              </tbody>
            </table>
            </div>
            </div>
          }
            <div class="buttons">
              <button type="button" class="btndefault" onClick={()=>checkeddata('library','selected_library')}>Save</button>
            </div>
            <span id="error_msg" style={{color:'red'}}></span>
            {props.modal_loading && <Loader message={props.loading_msg}/>}
          </div>
        </div>
      </div>}
    {(props.modalType=="select_commercial_data") && <div class="modal-dialog lib_data" role="document" style={{width:500}}>
        <div class="modal-content">
          <div class="modal-body">
          <button type="button" class="close" onClick={()=>{props.closeModal();$("#portal_modal").removeClass("show");$("body").removeClass("bfix")}}>&times;</button>
          {!props.modal_loading && <div><div class="searchbox">
            <div class="inputbox">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search Commercial" alt="" onChange={(e)=>props.getData(e.target.value,'commercial')}/>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Commercial Id</th>
                  <th>Name</th>
                  <th>Short Name</th>
                  <th>Rights</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {props.commercialData.map((res,key)=>{
                return(<tr key={key}><td>
                    <label className="checkbox">
                      <input type="checkbox" Value={res._id} id="selected_commercial"/>
                      <span><i class="fas fa-check"></i></span>
                    </label>
                  </td>
                  <td className="tbl_l">{res.commercial_id}</td>
                          <td>{res.name}</td>
                          <td>{res.short_name}</td>
                          <td>{res.rights}</td>
                          <td><Moment  element="span"  format="HH:mm" add={{hours:5.5}}>{res.duration}</Moment></td>
                      </tr>)
              })}
              </tbody>
            </table>
            </div>
            </div>
          }
            <div class="buttons">
              <button type="button" class="btndefault" onClick={()=>checkeddata('commercial','selected_commercial')}>Save</button>
            </div>
            <span id="error_msg" style={{color:'red'}}></span>
            {props.modal_loading && <Loader message={props.loading_msg}/>}
          </div>
        </div>
      </div>}

          </div>,modalRoot
    )
}
export default Modal;
