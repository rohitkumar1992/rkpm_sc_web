import React from 'react';
import Loader from '../../Component/Loader/loader';
class AdminHome extends React.Component{
  state={isLoading:false}
  componentDidMount()
  {
    setTimeout(()=>{this.setState({isLoading:true})})
  }
  render()
  {
    const {isLoading}=this.state
    if(isLoading)
    {
      return(<div class="cont_area">Home</div>)
    }
    else
    {
      return(<Loader/>);
    }
  }
}
export default AdminHome;
