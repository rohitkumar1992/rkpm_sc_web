import React, {Component} from 'react';
import RowDragger from '../RowDragger/RowDragger';
import {GETALLLIBRARYCOMMERCIAL,TAG,USERID,HEADER} from '../../url';
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
class Scheduling extends Component {
  state={modal_loading:false,open_portal:false,auth_err:'',modal_loading_msg:'',libraryData:[],commercialData:[],modal_type:'',isLoading:false,draggerData:[]}
  componentDidMount()
  {
    setTimeout(()=>this.setState({isLoading:true}),1000)
  }
  getData=(keyword,type)=>{
    axios.post(GETALLLIBRARYCOMMERCIAL,{
      'tag':TAG,
      'req_type':type,
      'searchKeyword':keyword,
      'user_id':USERID
    }).then((res)=>{
        if(res.data.success==1)
        {
          var response=res.data;
          if(type=="library")
          {
              this.setState({libraryData:response.data});
              setTimeout(()=>{this.setState({modal_loading:false})},1000)
          }
          else {
            this.setState({commercialData:response.data});
            setTimeout(()=>{this.setState({modal_loading:false})},1000)
          }
        }
    }).catch((error)=>{

    })
  }
  setData=(type,data)=>{
    if(type=="library")
    {
      var final_res=this.state.libraryData.filter((res)=>{
        var child=false;
        for (var i=0;i<data.length;i++)
        {
          if(data[i]==res._id)
          {
            // console.log('hi');
            return true;
            // child=true;
            // break;
          }
          else {
            continue;
          }
        }
         // console.log(child)
      });
      let originalData = [...this.state.draggerData];
      for(var i=0;i<final_res.length;i++)
      {
          originalData.push(final_res[i]);
      }
      this.setState({modal_loading_msg:"Uploading Content",modal_loading:true,draggerData:originalData},function()
      {
      setTimeout(()=>{this.setState({modal_loading_msg:"",modal_loading:false});
      $("#portal_modal").removeClass("show");$("body").removeClass("bfix");
      },1000)
    })
    }
    else {
      var final_res=this.state.commercialData.filter((res)=>{
        var child=false;
        for (var i=0;i<data.length;i++)
        {
          if(data[i]==res._id)
          {
            // console.log('hi');
            return true;
            // child=true;
            // break;
          }
          else {
            continue;
          }
        }
         // console.log(child)
      });
      let originalData = [...this.state.draggerData];
      for(var i=0;i<final_res.length;i++)
      {
          originalData.push(final_res[i]);
      }
      this.setState({modal_loading_msg:"Uploading Content",modal_loading:true,draggerData:originalData},function()
      {
      setTimeout(()=>{this.setState({modal_loading_msg:"",modal_loading:false});
      $("#portal_modal").removeClass("show");$("body").removeClass("bfix");
      },1000)
    })
    }
  }
  render() {
    const {open_portal,auth_err,categoryList,isLoading,total_pages,modal_loading_msg,modal_loading,modal_type}=this.state;
    if(isLoading)
    {
    return(<div class="cont_area">
    <button type="button" id="sidebarCollapse" class="btn btn-sidebar"><span><i class="fa fa-align-left"></i></span></button>
    <BreadCrumb heading="Scheduling"/>
    <div class="schedlng">
      <div class="buttons">
        <a class="btn s_btn" href="Javascript:" onClick={()=>{this.getData('','library');this.setState({modal_type:"select_library_data",open_portal:true,modal_loading:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add Library <span><i class="fas fa-plus"></i></span></a>
        <a class="btn s_btn" href="Javascript:" onClick={()=>{this.getData('','commercial');this.setState({modal_type:"select_commercial_data",open_portal:true});$("#portal_modal").addClass("show");$("body").addClass("bfix")}}>Add Commercial <span><i class="fas fa-plus"></i></span></a>
      </div>
      <div class="sched_cont">
        <RowDragger draggerData={this.state.draggerData} updateDrag={(e)=>this.setState({draggerData:e})}/>
        <div class="clearfix"></div>
      </div>
      {(open_portal) &&<Portal modalType={modal_type} libraryData={this.state.libraryData} commercialData={this.state.commercialData} modal_loading={modal_loading} closeModal={()=>this.setState({auth_err:'',open_portal:false,modal_loading_msg:'',modal_loading:false})} loading_msg={modal_loading_msg} getData={this.getData.bind(this)} setData={this.setData.bind(this)}/>}
      <div class="clearfix"></div>
    </div>
    </div>);
  }
  else
  {
    return(<div class="cont_area"><Loader/></div>);
  }
}
}

export default  Scheduling;
