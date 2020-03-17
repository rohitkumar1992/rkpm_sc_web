import React from 'react';
import Loader from 'react-loader-spinner'
const CommonLoader =(props)=>{
  return(<div class="loader_cont text-center" > <Loader
         type="RevolvingDot"
         color="#cd335e"
         height={100}
         width={100}
      ></Loader><p><b>{props.message}</b></p></div>)
}
export default CommonLoader;
  // return(<div class="container loader_cont" ><img src="/images/2.gif" style={{width:85,height:85}}/><h3>{props.message}</h3></div>)
