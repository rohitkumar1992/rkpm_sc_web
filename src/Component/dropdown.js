import React from 'react';
import {Dropdown} from 'primereact/dropdown';
const Dropdowns=(props)=>{
  return(<Dropdown optionLabel={props.optionLabel}  value={props.selectVal} filter={true} filterPlaceholder={props.filterPlaceholder} options={props.list} onChange={(e) =>props.onChangeSelect(e.value)}  placeholder={props.placeholder}/>)
}
export default Dropdowns;
