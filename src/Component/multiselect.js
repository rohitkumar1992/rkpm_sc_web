import React from 'react';
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MultiSelects=(props)=>{
  return(<MultiSelect value={props.selectVal} options={props.list} onChange={(e) =>props.onChangeSelect(e.value)}  style={{minWidth:'12em'}} filter={true} placeholder={props.placeholder} required={props.required}/>)
}
export default MultiSelects;
