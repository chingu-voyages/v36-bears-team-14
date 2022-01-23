import React, { useState } from "react";

interface INumberFieldProps {
  customClassNames?: string;
  inputClassname?: string;
  value?: number;
  label?: string;
  type: "number";
  name?: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: number; name: string }) => void;
}

function NumberField(props: INumberFieldProps) {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({
      value: event.target.valueAsNumber,
      name: event.target.name,
    });
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

export default NumberField;
