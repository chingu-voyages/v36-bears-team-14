//@ts-nocheck
import React, { useState } from "react";

interface ITextFieldProps {
  customClassNames?: string;
  value?: string;
  label?: string;
  type: string;
  placeholder?: string;
  onChange(name: string): any;
}

function TextField(props: ITextFieldProps) {
  return (
    <label>
      {props.label}
      <input
        className={`${props.customClassNames}`}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      />
    </label>
  );
}

// const TextField = ({ value, label, name, placeholder, type, onChange }) => (

//     <input
//       type={type}
//       value={value}
//       name={name}
//       placeholder={placeholder}
//       onChange={onChange}
//     />
// );

export default TextField;
