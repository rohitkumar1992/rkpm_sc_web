import React, { Component } from 'react';
import Header from './Component/header';
import Sidebar from './Component/sidebar';
import Authentication from './Container/Authentication/Authentication';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import routes from './routes';
class App extends Component {
  // static getDerivedStateFromProps(props,state)
  // {
  //   console.log('hi');
  // }
  render() {
    return (
      <div>
        {/*========Header===========*/}
        <Header {...this.props}/>
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

export default Authentication(App);
