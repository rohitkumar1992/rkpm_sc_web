import React from 'react';
import {Link} from 'react-router-dom';
import {LOGIN,TAG,USERID,HEADER,LOGOUT} from '../url.js';
import $ from 'jquery';
import axios from 'axios';
const Header=(props)=>{
  const ActiveTab=props.location.pathname.split('/')[2];
  const logout=()=>{
    axios.post(LOGOUT,{},{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Bearer " + localStorage.getItem('pmsl_token'),
    }
    }).then((res)=>{
      if(res.data.success==1)
      {
        localStorage.clear();
      setTimeout(()=>window.location.href='/',1000);
      }
    }).catch((error)=>{

    })
  }
  return( <header>
        <div class="container">
          <div class="head_area">
            <nav class="navbar navbar-expand-sm">
              <ul class="navbar-nav">
                <li className={`nav-item ${ActiveTab==null?"active":""}`}>
                  <Link class="nav-link" to="/">
                    <div class="icon">
                      <i class="fas fa-home"></i>
                    </div>
                    <span>Home</span>
                  </Link>
                </li>
                <li className={`nav-item ${ActiveTab=="admin"?"active":""}`}>
                  <Link class="nav-link" to="/dashboard/admin">
                    <div class="icon">
                      <i class="fas fa-user-tie"></i>
                    </div>
                    <span>Admin</span>
                  </Link>
                </li>
                <li className={`nav-item ${ActiveTab=="programming"?"active":""}`}>
                  <Link class="nav-link" to="/dashboard/programming">
                    <div class="icon">
                      <i class="far fa-clock"></i>
                    </div>
                    <span>Programming</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="fas fa-credit-card"></i>
                    </div>
                    <span>Credit Control</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="fas fa-chart-pie"></i>
                    </div>
                    <span>Sales Admin</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="fas fa-desktop"></i>
                    </div>
                    <span>NTC</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="fas fa-calendar-alt"></i>
                    </div>
                    <span>Scheduling</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="fas fa-file-alt"></i>
                    </div>
                    <span>Billing</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:">
                    <div class="icon">
                      <i class="far fa-chart-bar"></i>
                    </div>
                    <span>MIS</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="Javascript:" onClick={logout}>
                    <div class="icon">
                      <i class="fas fa-ban"></i>
                    </div>
                    <span>Exit</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div class="logo">
              <h1>
                <a href="Javascript:">
                  <img src="images/logo.png" alt="" />
                </a>
              </h1>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </header>)
}
export default Header;
