import React from 'react';
import Loadable from 'react-loadable';
import Loader from './Component/Loader/loader'
function Loading() {
return(<div class="cont_area"><Loader/></div>);
}
const HOME = Loadable({
  loader: () => import('./Container/Home/home.js'),
  loading: Loading,
});
const NOT_FOUND = Loadable({
  loader: () => import('./Component/not_found/not_found.js'),
  loading: Loading,
});
const ADMIN_HOME = Loadable({
  loader: () => import('./Container/Admin/AdminHome.js'),
  loading: Loading,
});
const DashboardRoute = Loadable({
  loader: () => import('./Container/DashboardRoute/DashboardRoute.js'),
  loading: Loading,
});
const routes = [
    { path:'/',exact:true,name: 'Home',  component: HOME },
    { path:'/dashboard',exact:true,name: 'Home',  component: HOME },
    { path:'/dashboard/:role',name: 'Home',  component: DashboardRoute },
    { path:'*',exact:true,name: 'Not Found',  component: NOT_FOUND },
];

export default routes;
