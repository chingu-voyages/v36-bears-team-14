import React, { useState } from "react";

interface ITextFieldProps {
  customClassNames?: string;
  value?: string;
  label?: string;
  type: "text" | "number" | "url";
  name?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField(props: ITextFieldProps) {
  return (
    <label>
      {props.label}
      <input
        className={`${props.customClassNames ? props.customClassNames : "" }`}
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
