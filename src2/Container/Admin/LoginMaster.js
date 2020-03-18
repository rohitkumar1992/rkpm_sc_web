import React from 'react';
import {LOGIN,TAG,TOKEN,LOGINLIST,USERID,HEADER,CHANGE_STATUS,LOGINDATABYID,CREATEELOGINUSER,toUpperCaseFilter} from '../../url.js';
import Pagination from "react-js-pagination";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import SearchComponent from '../../Component/SearchComponent/SearchComponent'
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
import Moment from 'react-moment';
class LoginMaster extends React.Component{
  state={modal_type:'',modal_loading:false,open_portal:false,auth_err:'',modal_loading_msg:'',channelList:[],channelList:[],portalData:[],isLoading:false,loginList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3,warning_msg:[],channelListing:[],roleListing:[]}
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
    axios.post(`${LOGINLIST}?page=${page}`,{
      'tag':'dash',
      'limit':this.state.itemsCountPerPage,
      'searchKeyword':keyword,
      'user_id':USERID
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({currentPage:response.current_page,loginList:response.data,total:response.total,roleList:res.data.roles,channelList:res.data.channels});
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
  createLoginUser=(e,rolesSelect,channelsSelect,employeeSelect)=>{
    e.preventDefault();
    this.setState({auth_err:'',warning_msg:[]});
    if(employeeSelect==null)
    {
      this.setState({auth_err:"All fields must be filled"});
      return false;
    }
    var login_name=e.target.login_name.value.trim();
    var password=e.target.password.value.trim();
    axios.post(CREATEELOGINUSER,
      {
        user_id:USERID,
        login_name:login_name,
        password:password,
        email:employeeSelect.emp_email,
        role_id:rolesSelect,
        channel_id:channelsSelect,
        employee_id:employeeSelect.id,
        tag:TAG
      },HEADER).then((res)=>{
        if(res.data.success==3)
        {
          this.setState({warning_msg:res.data.error})
        }
        else if(res.data.success==1)
        {
          this.setState({modal_loading_msg:"Creating User",modal_loading:true},function()
        {
          setTimeout(()=>{this.setState({modal_loading_msg:"",modal_loading:false});
          $("#portal_modal").removeClass("show");$("body").removeClass("bfix");
          this.getData(1,'');
        },1000)
        })
        }
        else {
          this.setState({auth_err:res.data.msg})
        }
    }).catch((error)=>{

    })
  }
  getLoginData=(Id)=>{
      axios.post(LOGINDATABYID,{
        'tag':TAG,
        'id':Id,
      },HEADER).then((res)=>{
          if(res.data.success==1)
          {
            this.setState({modal_type:"login_master_detail",open_portal:true,portalData:res.data.data,channelListing:res.data.channel,roleListing:res.data.role});$("#portal_modal").addClass("show");$("body").addClass("bfix")
          }
      }).catch((error)=>{
    });
  }
  render()
  {
    const {open_portal,auth_err,loginList,isLoading,total_pages,modal_loading_msg,modal_loading,modal_type,channelList,roleList}=this.state;
    const tableContent=(loginList.length >0?loginList.map((res,key)=>{
      return(<tr key={key}><td className="tbl_l"  onClick={()=>this.getLoginData(res.id)}>{res.Accountid}</td>
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
          <BreadCrumb heading="Login Master"/>
        <div class="box_t">
          <div class="buttons">
            <a class="btn s_btn" href="Javascript:" onClick={()=>{this.setState({modal_type:"login_master",open_portal:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add User <span><i class="fas fa-plus"></i></span></a>
          </div>
          <SearchComponent getData={this.getData} currentPage={this.state.currentPage} placeholder="Search User"/>
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
        {(open_portal) &&<Portal modalType={modal_type} channelListing={this.state.channelListing} roleListing={this.state.roleListing} auth_err={this.state.auth_err} employeeList={loginList} warning_msg={this.state.warning_msg} portalData={this.state.portalData} roleList={roleList} channelList={channelList} modal_loading={modal_loading} closeModal={()=>this.setState({warning_msg:[],auth_err:'',open_portal:false,modal_loading_msg:'',modal_loading:false})} loading_msg={modal_loading_msg} createLoginUser={this.createLoginUser}/>}
        {/**/}
      </div>)
    }
    else
    {
      return(<div class="cont_area"><Loader/></div>);
    }
  }
}
export default LoginMaster;
