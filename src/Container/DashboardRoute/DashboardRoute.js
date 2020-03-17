import React, { Component } from 'react';
import Sidebar from '../../Component/sidebar';
import Authentication from '../Authentication/Authentication';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import Home from '../Admin/AdminHome'
import routes from './routes';
class App extends Component {
  state={sidebar:[{"name":"Employee Master","url":"/dashboard/admin/employee_master",'icon':"fas menu_icon fa-user-tie"},{"name":"Channel Master","url":"/dashboard/admin/channel_master","icon":"fas menu_icon fa-dice-d6"},
  {"name":"User Login Master","url":"/dashboard/admin/user_login_master",'icon':"fas menu_icon fa-sign-in-alt"},{"name":"Library","url":"/dashboard/admin/library",'icon':"fas menu_icon fa-book-reader"},
{"name":"Commercial","url":"/dashboard/admin/commercial",'icon':"fas menu_icon fa-building"},{"name":"Scheduling","url":"/dashboard/admin/scheduling",'icon':"fas menu_icon fa-clock"}]}

  // static getDerivedStateFromProps(props,state)
  // {
  //   console.log('hi');
  // }
  render() {
    const {sidebar}=this.state
    return (
      <div class="cont_wrap">
        {/*========sidebar===========*/}
        <Sidebar sidebar={sidebar} {...this.props}/>

        {/*========Content===========*/}
        <Switch >
          {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                  <route.component {...props} />
                )} />)
                : (null);
            },
          )}

        </Switch>
      </div>
    );
  }
}

export default App;
