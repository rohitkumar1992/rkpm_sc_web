import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import ScrollToTop from './scrolltotop';
import Dashboard from './Container/DashboardRoute/DashboardRoute';
class MainContainer extends React.Component{
  render()
  {
  return(
    <HashRouter>
      <LastLocationProvider>
        <ScrollToTop />
        <Switch >
          <Route path="/dashboard"  component={App}/>
          <Route path="/" exact={true} component={App}/>
        </Switch>
      </LastLocationProvider>
    </HashRouter>)
}
}
ReactDOM.render(
  <MainContainer />,
  document.getElementById('root')
);
//
// <Route path="/" exact={true} component={App}>
// <Redirect to="/dashboard"/>
// </Route>
