import React from 'react';
import {LOGIN,TAG,TOKEN,CHANNELLIST,USERID,HEADER,CHANGE_STATUS,CREATECHANNEL,CHANNELDATABYID,toUpperCaseFilter} from '../../url.js';
import Pagination from "react-js-pagination";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import SearchComponent from '../../Component/SearchComponent/SearchComponent'
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
import Moment from 'react-moment';
class ChannelMaster extends React.Component{
  state={modal_loading:false,open_portal:false,auth_err:'',modal_loading_msg:'',portalData:[],modal_type:'',isLoading:false,employeeList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
  componentDidMount()
  {
    this.getData(1,'');
  }
  getData=(page,keyword)=>{
    axios.post(`${CHANNELLIST}?page=${page}`,{
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
      'role':'channel_list',
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
  createChannel=(e)=>{
    e.preventDefault();
    var name=e.target.name.value.trim();
    var short_name=e.target.short_name.value.trim();
    var location=e.target.location.value.trim();
    axios.post(CREATECHANNEL,
      {
        user_id:USERID,
        channel_name:name,
        short_name:short_name,
        location:location,
        tag:TAG
      },HEADER).then((res)=>{
        if(res.data.success==3)
        {

        }
        else if(res.data.success==1)
        {
          this.setState({modal_loading_msg:"Creating Channel",modal_loading:true},function()
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
  getChannelData=(Id)=>{
      axios.post(CHANNELDATABYID,{
        'tag':TAG,
        'id':Id,
      },HEADER).then((res)=>{
          if(res.data.success==1)
          {
            this.setState({modal_type:"channel_master_detail",open_portal:true,portalData:res.data.data});$("#portal_modal").addClass("show");$("body").addClass("bfix")
          }
      }).catch((error)=>{
    });
  }
  render()
  {
    const {open_portal,auth_err,employeeList,isLoading,total_pages,modal_loading_msg,modal_loading,modal_type}=this.state;
    const tableContent=(employeeList.length >0?employeeList.map((res,key)=>{
      return(<tr key={key}><td className="tbl_l"  onClick={()=>this.getChannelData(res.id)}>{res.Channelid}</td>
                <td>{res.channel_name}</td>
                <td>{res.short_name}</td>
                <td>{res.location}</td>
                <td><Moment filter={toUpperCaseFilter} element="span"  format="DD/MM/YYYY HH:mm" add={{hours:5.5}}>{res.created_at}</Moment></td>
                <td>{this.status(res.id,res.status)}</td>
                <td>
                  <div class="action_buttons">
                    <a href="javascript:" class="btn"><i class="fas fa-edit"></i></a>
                    <a class="btn" href="javascript:"><i class="fas fa-trash-alt"></i></a>
                    <div class="dropdown">
                      <a href="javascript:" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
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
          <BreadCrumb heading="Channel Master"/>
        <div class="box_t">
          <div class="buttons">
            <a class="btn s_btn" href="Javascript:" onClick={()=>{this.setState({modal_type:"channel_master",open_portal:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add Channel <span><i class="fas fa-plus"></i></span></a>
          </div>
          <SearchComponent getData={this.getData} currentPage={this.state.currentPage} placeholder="Search Channel"/>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Channel Id</th>
                <th>Name</th>
                <th>Short Name</th>
                <th>Location</th>
                <th>Created At</th>
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
        {(open_portal) &&<Portal modalType={modal_type} portalData={this.state.portalData} modal_loading={modal_loading} closeModal={()=>this.setState({auth_err:'',open_portal:false,modal_loading_msg:'',modal_loading:false})} loading_msg={modal_loading_msg} createChannel={this.createChannel}/>}
        {/**/}
      </div>)
    }
    else
    {
      return(<div class="cont_area"><Loader/></div>);
    }
  }
}
export default ChannelMaster;
