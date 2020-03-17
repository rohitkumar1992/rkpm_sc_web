import React,{useEffect} from 'react';
import $ from 'jquery'
const BreadCrumb =(props)=>{
  useEffect(()=>{
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('body').toggleClass('sidebar_icon_only');
    });
  })
  return(
    <div class="content_header">
      <h2>{props.heading}</h2>
      {/*
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="Javascript:">
              <i class="fa fa-home" aria-hidden="true"></i>
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{props.heading}</li>
        </ol>
      </nav>*/}
    </div>
  )
}
export default BreadCrumb;
