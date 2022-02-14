import "./button-style.css";
import WhitePlusButton from "./white-plus-button.svg";
import LikeTrueIcon from "./like-true.svg";
import LikeFalseIcon from "./like-false.svg";
import BackButton from "./back-button.svg";
import EditButton from "./edit-button.svg";

export enum EButtonType {
  Normal = "normal",
  Plus = "plus",
  Like = "like",
  Back = "back",
  Edit = "edit",
}
interface IButtonProps {
  text?: string;
  customClassNames?: string;
  customTextClassNames?: string;
  plusButtonClassNames?: string;
  backButtonClassNames?: string;
  editButtonClassNames?: string;
  loginButtonClassNames?: string;
  likeButtonClassNames?: string;
  onClick?: () => void;
  type: EButtonType;
  likeButtonState?: {
    liked: boolean;
  };
  disabled?: boolean;
}

function Button(props: IButtonProps) {
  const handleOnClick = () => {
    // Do something
    if (props.disabled) return;
    props.onClick && props.onClick();
  };
  return props.type === EButtonType.Normal ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_normal ${
        props.customClassNames ? props.customClassNames : ""
      } ${props.disabled ? "disabled-stylings" : ""}`}
    >
      <div
        className={`Button__text ${
          props.customTextClassNames ? props.customTextClassNames : ""
        } ${props.disabled ? "disabled-stylings" : ""}`}
      >
        {props.text}
      </div>
    </div>
  ) : props.type === EButtonType.Like ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_like ${
        props.customClassNames ? props.customClassNames : ""
      } ${props.disabled ? "disabled-stylings" : ""}`}
    >
      <img
        className={`Button__main like-button-svg ${
          props.likeButtonClassNames ? props.likeButtonClassNames : ""
        } ${props.disabled ? "disabled-stylings-image" : ""}`}
        src={
          props.likeButtonState && props.likeButtonState.liked
            ? LikeTrueIcon
            : LikeFalseIcon
        }
        alt="like"
      />
    </div>
  ) : props.type === EButtonType.Back ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_back ${
        props.customClassNames ? props.customClassNames : ""
      } ${props.disabled ? "disabled-stylings" : ""}`}
    >
      <img
        className={`BackButton__Img ${
          props.backButtonClassNames ? props.backButtonClassNames : ""
        }  ${props.disabled ? "disabled-stylings-image" : ""}`}
        src={BackButton}
        alt="add"
      />
    </div>
  ) : props.type === EButtonType.Edit ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_edit ${
        props.customClassNames ? props.customClassNames : ""
      } ${props.disabled ? "disabled-stylings" : ""}`}
    >
      <img
        className={`EditButton__img ${
          props.editButtonClassNames ? props.editButtonClassNames : ""
        } ${props.disabled ? "disabled-stylings-image" : ""}`}
        src={EditButton}
        alt="edit"
      />
    </div>
  ) : (
    <div
      onClick={handleOnClick}
      className={`Button__main button_plus ${
        props.customClassNames ? props.customClassNames : ""
      } ${props.disabled ? "disabled-stylings" : ""}`}
    >
      <img
        className={`PlusButton__Img ${
          props.plusButtonClassNames ? props.plusButtonClassNames : ""
        } ${props.disabled ? "disabled-stylings-image" : ""}`}
        src={WhitePlusButton}
        alt="add"
      />
    </div>
  );
}

export default Button;
