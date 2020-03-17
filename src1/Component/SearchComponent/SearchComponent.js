import React from 'react';
const SearchComponent =(props)=>{
  return(
    <div class="searchbox">
      <div class="inputbox">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder={props.placeholder} alt="" onChange={(e)=>props.getData(props.currentPage,e.target.value)}/>
      </div>
    </div>
  )
}
export default SearchComponent;
