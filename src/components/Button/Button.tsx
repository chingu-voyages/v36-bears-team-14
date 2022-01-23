import "./button-style.css";
interface IButtonProps {
  buttonText: string;
  customClassNames?: string;
  customTextClassNames?: string;
  onClick?: () => void;
}

function Button(props: IButtonProps) {
  return (
    <div
      className={`Button__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`Button__text ${
          props.customTextClassNames ? props.customTextClassNames : ""
        }`}
      >
        {props.buttonText}
      </div>
    </div>
  );
}

export default Button;
