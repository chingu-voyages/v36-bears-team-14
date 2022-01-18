import React, { useState } from "react";

interface ITextFieldProps {
  customClassNames?: string;
  value?: string;
  label?: string;
  type: string;
  name?: string;
  placeholder?: string;
  onChange: () => string;
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

export default TextField;
