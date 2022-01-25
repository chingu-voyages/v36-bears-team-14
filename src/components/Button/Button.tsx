import "./button-style.css";
import WhitePlusButton from "./white-plus-button.svg";

export enum EButtonType {
  Normal = "normal",
  Plus = "plus",
}
interface IButtonProps {
  text?: string;
  customClassNames?: string;
  customTextClassNames?: string;
  plusButtonClassNames?: string;
  loginButtonClassNames?: string;
  onClick?: () => void;
  type: EButtonType;
}

function Button(props: IButtonProps) {
  return props.type === EButtonType.Normal ? (
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
        className={`PlusButton__Img ${
          props.plusButtonClassNames ? props.plusButtonClassNames : ""
        }`}
        src={WhitePlusButton}
        alt="add"
      />
    </div>
  );
}

export default Button;
