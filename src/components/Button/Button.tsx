import "./button-style.css";
import WhitePlusButton from "./white-plus-button.svg";
import GreenPlusButton from "./green-plus-button.svg";
interface IButtonProps {
  buttonText?: string;
  customClassNames?: string;
  customTextClassNames?: string;
  onClick?: () => void;
  plusButton: {
    yes: boolean;
    color: "white" | "green";
  };
}

function Button(props: IButtonProps) {
  return !props.plusButton.yes ? (
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
  ) : (
    <div
      className={`Button__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img
        src={`${
          props.plusButton.color === "white" ? WhitePlusButton : GreenPlusButton
        }`}
        alt="add"
      />
    </div>
  );
}

export default Button;
