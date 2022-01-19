import React from "react";

interface IButtonProps {
  buttonText: string;
  buttonClass: string;
  onClick: () => void;
}

function Button(props: IButtonProps) {
  return <div className={props.buttonClass}>{props.buttonText}</div>;
}

export default Button;
