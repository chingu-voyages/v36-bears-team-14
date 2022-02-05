import "./button-style.css";
import WhitePlusButton from "./white-plus-button.svg";
import LikeTrueIcon from "./like-true.svg";
import LikeFalseIcon from "./like-false.svg";

export enum EButtonType {
  Normal = "normal",
  Plus = "plus",
  Like = "like",
}
interface IButtonProps {
  text?: string;
  customClassNames?: string;
  customTextClassNames?: string;
  plusButtonClassNames?: string;
  loginButtonClassNames?: string;
  onClick?: () => void;
  type: EButtonType;
  likeButtonState?: {
    liked: boolean;
  };
}

function Button(props: IButtonProps) {
  const handleOnClick = () => {
    // Do something
    props.onClick && props.onClick();
  };
  return props.type === EButtonType.Normal ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_normal ${
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
  ) : props.type === EButtonType.Like ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_like ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img
        src={
          props.likeButtonState && props.likeButtonState.liked
            ? LikeTrueIcon
            : LikeFalseIcon
        }
        alt="like"
      />
    </div>
  ) : (
    <div
      onClick={handleOnClick}
      className={`Button__main button_plus ${
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
