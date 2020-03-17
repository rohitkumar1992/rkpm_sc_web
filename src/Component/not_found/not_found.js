import React from 'react';
import {Link} from 'react-router-dom'
const NotFound=()=>{
  return(<div><div class="no_page">
            <div class="error_wrapper">
              <div class="man_icon"><img src="images/notfound.svg" alt="" /></div>
              <h3 class="title">404</h3>
              <p class="info">Oh! Page not found</p>
              <Link to="/web"><button type="button" class="home_btn">Planetshare Home</button></Link>
            </div>
            <div class="clearfix"></div>
          </div> </div>
)
}
export default NotFound;
