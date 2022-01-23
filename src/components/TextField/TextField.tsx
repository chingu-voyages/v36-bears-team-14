import React, { useState } from "react";

interface ITextFieldProps {
  customClassNames?: string;

  inputClassname?: string;
  value?: string | number;
  label: string;
  type: "text" | "number" | "url";
  name?: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
}

function TextField(props: ITextFieldProps) {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({ value: event.target.value, name: event.target.name });
  };

  return (
    <div className={`${props.customClassNames ? props.customClassNames : ""}`}>
      <label>
        {props.label}
        <input
          className={`${props.inputClassname ? props.inputClassname : ""}`}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleTextInputChange}
          name={`${props.name ? props.name : ""}`}
        />
      </label>
    </div>
  );
}

export default TextField;
