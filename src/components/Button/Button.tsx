import "./button-style.css";
import WhitePlusButton from "./white-plus-button.svg";
interface IButtonProps {
  text?: string;
  customClassNames?: string;
  customTextClassNames?: string;
  onClick?: () => void;
  plusButton?: {
    color: "white";
  };
}

function Button(props: IButtonProps) {
  return !props.plusButton ? (
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
        {props.text}
      </div>
    </div>
  ) : (
    <div
      className={`Button__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img
        src={`${props.plusButton.color === "white" && WhitePlusButton}`}
        alt="add"
      />
    </div>
  );
}

export default Button;
