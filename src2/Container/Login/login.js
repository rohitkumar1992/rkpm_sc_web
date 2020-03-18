import React, { Component } from 'react';
// import './login.css';
import $ from 'jquery';
import axios from 'axios';
import {LOGIN,TAG} from '../../url.js';
class Login extends Component {
formsubmit(e)
{
    e.preventDefault();
    $('#err_msg').html('');
      var emailid=e.target.email.value;
      var password=e.target.password.value;
      axios.post(LOGIN, {
      email:emailid,
      password:password,
      tag:TAG
    })
    .then((response)=>{
        if(response.data.success=='1'){
          localStorage.setItem('status','Y');
          localStorage.setItem('name',response.data.data.emp_name);
          localStorage.setItem('pmsl_token',response.data.token);
          localStorage.setItem('email',response.data.data.emp_email);
          localStorage.setItem('user_id',response.data.data.id);
          $('#login_button').html('Loading....');
          //setTimeout(()=>this.props.history.push('/'),1500);
          // setTimeout(()=>this.props.history.push('/'),1500);
          setTimeout(()=>{window.location.href='/'},1500);

        }
        else {
          $('#err_msg').html('Invalid Credentials');
        }
      })
      .catch((error)=> {
        console.log(error);
      });
  }
  togglePass=(id,id2)=>{
  var x = document.getElementById(id);
  if (x.type === "password") {
   $('#'+id2).removeClass('fa fa-eye-slash');
   $('#'+id2).addClass('fa fa-eye');
   x.type = "text";
  } else {
    $('#'+id2).removeClass('fa fa-eye');
    $('#'+id2).addClass('fa fa-eye-slash');
   x.type = "password";
  }
  }
  render() {
    return (<div class="login_wrap">
      <div class="login_cont">
        <div class="s_middle">
          <div class="b_l">
          <span id="err_msg" style={{color:'red',fontSize:'18px'}}></span>
            <form onSubmit={this.formsubmit}>
              <div class="inputbox">
                <span class="icn">
                  <i class="fas fa-user"></i>
                </span>
                <input type="email" id="email" Placeholder="Email" name="email" required  />
              </div>
              <div class="inputbox">
                <span class="icn">
                  <i class="fas fa-unlock-alt"></i>
                </span>
                <input type="password" id="password" placeholder="Password" name="password" required />
                <span class="eye" onClick={()=>this.togglePass('password','eyepass')}>
                  <i id="eyepass" class="fas fa-eye-slash"></i>
                </span>
              </div>
              <div class="buttons">
                <button type="submit" class="btndefault" id="login_button">Login</button>
              </div>
            </form>
          </div>
          <div class="b_r">
            <img src="images/logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
)
}
}
export default Login;
