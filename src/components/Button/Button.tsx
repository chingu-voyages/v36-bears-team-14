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
        className={`Button__main like-button-svg ${
          props.likeButtonClassNames ? props.likeButtonClassNames : ""
        }`}
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
      }`}
    >
      <img
        className={`BackButton__Img ${
          props.backButtonClassNames ? props.backButtonClassNames : ""
        }`}
        src={BackButton}
        alt="add"
      />
    </div>
  ) : props.type === EButtonType.Edit ? (
    <div
      onClick={handleOnClick}
      className={`Button__main button_edit ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img
        className={`EditButton__img ${
          props.editButtonClassNames ? props.editButtonClassNames : ""
        }`}
        src={EditButton}
        alt="edit"
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
