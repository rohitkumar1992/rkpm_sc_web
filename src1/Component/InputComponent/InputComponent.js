import React from 'react'
const InputBox=(props)=>{
  return(<input type={props.type} placeholder={props.placeholder} name={props.name} required={props.required}/>)
}
export default InputBox;
