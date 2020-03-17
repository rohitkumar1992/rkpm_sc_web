import React from 'react';
import {LOGIN,TAG,TOKEN,USERLIST,USERID,HEADER,CHANGE_STATUS,toUpperCaseFilter} from '../../url.js';
import Pagination from "react-js-pagination";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../../Component/Loader/loader';
import SearchComponent from '../../Component/SearchComponent/SearchComponent'
import BreadCrumb from '../../Component/BreadCrumb/BreadCrumb'
import Portal from '../../Component/Portal/portal';
import Moment from 'react-moment';
class Home extends React.Component{
  state={isLoading:false}
  componentDidMount()
  {
    setTimeout(()=>{this.setState({isLoading:true})})
  }
  render()
  {
    const {isLoading}=this.state
    if(isLoading)
    {
      return(<div class="cont_wrap">Home</div>)
    }
    else
    {
      return(<Loader/>);
    }
  }
}
export default Home;
