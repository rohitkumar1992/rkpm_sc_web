import React from 'react';
import {LOGIN,TAG,TOKEN,USERID,HEADER,CHANGE_STATUS,CREATECATEGORY,CATEGORYLIST,CATEGORYDATABYID,toUpperCaseFilter} from '../../url.js';
import Pagination from "react-js-pagination";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import SearchComponent from '../../Component/SearchComponent/SearchComponent'
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
import Moment from 'react-moment';

class Category extends React.Component{
  state={modal_loading:false,open_portal:false,auth_err:'',modal_loading_msg:'',portalData:[],modal_type:'',isLoading:false,categoryList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
  componentDidMount()
  {
    this.getData(1,'');
  }
  getData=(page,keyword)=>{
    axios.post(`${CATEGORYLIST}?page=${page}`,{
      'tag':'dash',
      'limit':this.state.itemsCountPerPage,
      'searchKeyword':keyword,
      'user_id':USERID
    },HEADER).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data.data;
          this.setState({currentPage:response.current_page,categoryList:response.data,total:response.total});
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
  createCategory=(e)=>{
    e.preventDefault();
    var name=e.target.name.value.trim();
    axios.post(CREATECATEGORY,
      {
        user_id:USERID,
        cat_name:name,
        tag:TAG
      },HEADER).then((res)=>{
        if(res.data.success==3)
        {

        }
        else if(res.data.success==1)
        {
          this.setState({modal_loading_msg:"Creating Category",modal_loading:true},function()
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
  // getChannelData=(Id)=>{
  //     axios.post(CATEGORYDATABYID,{
  //       'tag':TAG,
  //       'id':Id,
  //     },HEADER).then((res)=>{
  //         if(res.data.success==1)
  //         {
  //           this.setState({modal_type:"channel_master_detail",open_portal:true,portalData:res.data.data});$("#portal_modal").addClass("show");$("body").addClass("bfix")
  //         }
  //     }).catch((error)=>{
  //   });
  // }
  render()
  {
    const {open_portal,auth_err,categoryList,isLoading,total_pages,modal_loading_msg,modal_loading,modal_type}=this.state;
    const tableContent=(categoryList.length >0?categoryList.map((res,key)=>{
      return(<tr key={key}><td className="tbl_l" onClick={()=>this.props.history.push(`/dashboard/admin/library/playlist/${res.id}/${res.name}`)}>{res.request_id}</td>
                <td>{res.name}</td>
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
          <BreadCrumb heading="Categories"/>
        <div class="box_t">
          <div class="buttons">
            <a class="btn s_btn" href="Javascript:" onClick={()=>{this.setState({modal_type:"add_category",open_portal:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add Category <span><i class="fas fa-plus"></i></span></a>
          </div>
          <SearchComponent getData={this.getData} currentPage={this.state.currentPage} placeholder="Search Category"/>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Name</th>
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
        {(open_portal) &&<Portal modalType={modal_type} portalData={this.state.portalData} modal_loading={modal_loading} closeModal={()=>this.setState({auth_err:'',open_portal:false,modal_loading_msg:'',modal_loading:false})} loading_msg={modal_loading_msg} createCategory={this.createCategory}/>}
        {/**/}
      </div>)
    }
    else
    {
      return(<div class="cont_area"><Loader/></div>);
    }
  }
}
export default Category;
