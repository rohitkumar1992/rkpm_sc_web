import React from 'react';
import {LOGIN,TAG,TOKEN,EMPLOYEELIST,USERID,HEADER,CHANGE_STATUS,EMPLOYEEDATABYID,CREATEEMPLOYEE,toUpperCaseFilter} from '../../url.js';
import Pagination from "react-js-pagination";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import SearchComponent from '../../Component/SearchComponent/SearchComponent'
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
import Moment from 'react-moment';
class EmployeeMaster extends React.Component{
  state={modal_type:'',modal_loading:false,open_portal:false,auth_err:'',modal_loading_msg:'',portalData:[],isLoading:false,employeeList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
  componentDidMount()
  {
    $('.table-responsive').on('show.bs.dropdown', function () {
         $('.table-responsive').css( "overflow", "inherit" );
    });

    $('.table-responsive').on('hide.bs.dropdown', function () {
         $('.table-responsive').css( "overflow", "auto" );
    });
    this.getData(1,'');
  }
  getData=(page,keyword)=>{
    axios.post(`${EMPLOYEELIST}?page=${page}`,{
      'tag':'dash',
      'limit':this.state.itemsCountPerPage,
      'searchKeyword':keyword,
      'user_id':USERID
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({currentPage:response.current_page,employeeList:response.data,total:response.total});
          setTimeout(()=>this.setState({isLoading:true}),1000)
        }
    }).catch((error)=>{

    })
  }
  status=(Id,status)=>{
    var name="";
    if(status==1)
    {
      name="Active";
    }
    if(status==0)
    {
      name="Inactive";
    }
      return( <div class="status_btn">
              <button type="button" className={`btn ${status==1?'btn-success':'btn-danger'} btn-sm`} id={`status_${Id}`} onClick={()=>this.changeStatus(Id,status)}>{name}</button>
            </div>);
  }
  changeStatus=(Id,status)=>{
    axios.post(CHANGE_STATUS,{
      'tag':'dash',
      'user_id':USERID,
      'role':'employee_list',
      'id':Id,
      'status':!status
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          this.getData(this.state.currentPage,'')
        }
    }).catch((error)=>{
  });
  }
  createEmployee=(e,joining_date,releaving_date)=>{
    e.preventDefault();
    var emp_name=e.target.emp_name.value.trim();
    var emp_code=e.target.emp_code.value.trim();
    var emp_zone=e.target.emp_zone.value.trim();
    var emp_address=e.target.emp_address.value.trim();
    var emp_place=e.target.emp_place.value.trim();
    var emp_pincode=e.target.emp_pincode.value.trim();
    var emp_mobile_no=e.target.emp_mobile_no.value.trim();
    var emp_fax_no=e.target.emp_fax_no.value.trim();
    var emp_phone_no=e.target.emp_phone_no.value.trim();
    var emp_email=e.target.emp_email.value.trim();
    var emp_department=e.target.emp_department.value.trim();
    var emp_designation=e.target.emp_designation.value.trim();
    axios.post(CREATEEMPLOYEE,
      {
        user_id:USERID,
        name:emp_name,
        email:emp_email,
        code:emp_code,
        location:emp_place,
        mobile:emp_mobile_no,
        department:emp_department,
        designation:emp_designation,
        joining_date:joining_date,
        releaving_date:releaving_date,
        emp_zone:emp_zone,
        emp_address:emp_address,
        emp_pincode:emp_pincode,
        emp_fax_no:emp_fax_no,
        emp_phone_no:emp_phone_no,
        tag:TAG
      },HEADER).then((res)=>{
        if(res.data.success==3)
        {

        }
        else if(res.data.success==1)
        {
          this.setState({modal_loading_msg:"Creating Employee",modal_loading:true},function()
        {
          setTimeout(()=>{this.setState({modal_loading_msg:"",modal_loading:false});
          $("#portal_modal").removeClass("show");$("body").removeClass("bfix");
          this.getData(1,'');
        },1000)
        })
        }
        else {

        }
    }).catch((error)=>{

    })
  }
  getEmployeeData=(Id)=>{
      axios.post(EMPLOYEEDATABYID,{
        'tag':TAG,
        'id':Id,
      },HEADER).then((res)=>{
          if(res.data.success==1)
          {
            this.setState({modal_type:"employee_master_detail",open_portal:true,portalData:res.data.data});$("#portal_modal").addClass("show");$("body").addClass("bfix")
          }
      }).catch((error)=>{
    });
  }
  render()
  {
    const {open_portal,auth_err,employeeList,isLoading,total_pages,modal_loading_msg,modal_loading,modal_type}=this.state;
    const tableContent=(employeeList.length >0?employeeList.map((res,key)=>{
      return(<tr key={key}><td className="tbl_l"  onClick={()=>this.getEmployeeData(res.id)}>{res.Accountid}</td>
                <td>{res.emp_name}</td>
                <td>{res.emp_email}</td>
                <td>{res.emp_code}</td>
                <td><Moment filter={toUpperCaseFilter} element="span"  format="DD/MM/YYYY HH:mm" add={{hours:5.5}}>{res.created_at}</Moment></td>
                <td>{this.status(res.id,res.emp_status)}</td>
                <td>
                  <div class="action_buttons">
                    <a href="javascript:" class="btn"><i class="fas fa-edit"></i></a>
                    <a class="btn" href="javascript:"><i class="fas fa-trash-alt"></i></a>
                    <div class="dropdown">
                      <a href="javascript:" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="javascript:;"><i class="fas fa-eye"></i> View Entries</a>
                          <a class="dropdown-item" href="javascript:;"><i class="fas fa-edit"></i> Edit</a>
                          <a class="dropdown-item" href="javascript;;"><i class="fas fa-trash-alt"></i> Delete</a>
                      </div>
                    </div>
                  </div>
                </td></tr>)
                }):<tr>
                <td colspan="7"><span class="noresult">No Result Found</span></td>
            </tr>)
    if(isLoading)
    {
      return(<div class="cont_area">
        <button type="button" id="sidebarCollapse" class="btn btn-sidebar"><span><i class="fa fa-align-left"></i></span></button>
          <BreadCrumb heading="Employee Master"/>
        <div class="box_t">
          <div class="buttons">
            <a class="btn s_btn" href="Javascript:" onClick={()=>{this.setState({modal_type:"employee_master",open_portal:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add Employee <span><i class="fas fa-plus"></i></span></a>
          </div>
          <SearchComponent getData={this.getData} currentPage={this.state.currentPage} placeholder="Search Employee"/>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Account Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Emp Code</th>
                <th>Register Date</th>
                <th>Status</th>
                <th class="ac">Action</th>
              </tr>
            </thead>
            <tbody>
            {tableContent}

            </tbody>
          </table>
          <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.getData}
                    itemClass='page-item'
                    linkClass="page-link bold"
                  />
        </div>
        {(open_portal) &&<Portal modalType={modal_type} portalData={this.state.portalData} modal_loading={modal_loading} closeModal={()=>this.setState({auth_err:'',open_portal:false,modal_loading_msg:'',modal_loading:false})} loading_msg={modal_loading_msg} createEmployee={this.createEmployee}/>}
        {/**/}
      </div>)
    }
    else
    {
      return(<div class="cont_area"><Loader/></div>);
    }
  }
}
export default EmployeeMaster;
