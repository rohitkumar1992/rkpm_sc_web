import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../Component/Loader/loader'
function Loading() {
return(<div class="cont_area"><Loader/></div>);
}

const ADMIN_HOME = Loadable({
  loader: () => import('../Admin/AdminHome.js'),
  loading: Loading,
});
const EMPLOYEE_MASTER = Loadable({
  loader: () => import('../Admin/EmployeeMaster.js'),
  loading: Loading,
});
const CHANNEL_MASTER = Loadable({
  loader: () => import('../Admin/ChannelMaster.js'),
  loading: Loading,
});
const LOGIN_MASTER = Loadable({
  loader: () => import('../Admin/LoginMaster.js'),
  loading: Loading,
});
const CATEGORY = Loadable({
  loader: () => import('../Library/category.js'),
  loading: Loading,
});
const LIBRARY = Loadable({
  loader: () => import('../Library/library.js'),
  loading: Loading,
});
const COMMERCIAL = Loadable({
  loader: () => import('../Library/commercial.js'),
  loading: Loading,
});
const routes = [
    { path:'/dashboard/admin',exact:true,name: 'Admin',  component: ADMIN_HOME },
    { path:'/dashboard/admin/employee_master',exact:true,name: 'EMPLOYEE_MASTER',  component: EMPLOYEE_MASTER },
    { path:'/dashboard/admin/channel_master',exact:true,name: 'CHANNEL_MASTER',  component: CHANNEL_MASTER },
    { path:'/dashboard/admin/user_login_master',exact:true,name: 'CHANNEL_MASTER',  component: LOGIN_MASTER },
    { path:'/dashboard/admin/library',exact:true,name: 'CATEGORY',  component: CATEGORY },
    { path:'/dashboard/admin/library/playlist/:cat_id/:cat_name',exact:true,name: 'LIBRARY',  component: LIBRARY },
    { path:'/dashboard/admin/commercial',exact:true,name: 'COMMERCIAL',  component: COMMERCIAL },
];

export default routes;
