import React from 'react';
import {Link} from "react-router-dom";
const Sidebar=(props)=>{
  return(<div id="sidebar" class="sidebar sticky-top">
      <div class="links_area">
        <ul>
        {props.sidebar.map((res,key)=>{
          return(<li key={key} className={props.location.pathname==res.url?"active":""}>
                <Link to={res.url}>
                  <i className={res.icon}></i>
                  <span class="menu-title">{res.name}</span>
                </Link>
              </li>)
        })}
        </ul>
      </div>
  </div>)
}
export default Sidebar;
