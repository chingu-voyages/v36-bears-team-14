import Button, { EButtonType } from "./Button";
import "./button-style.css";
import GenericProfileIcon from "./generic-profile-icon.svg";
import HamburgerButton from "./hamburger-button.svg";

interface ILoginButtonProps {
  customClassNames?: string;
  customTextClassNames?: string;
  customProfileImageClassNames?: string;
  isLoggedIn?: {
    firstName: string;
  };
  imageSource?: string;
  onClick?: () => void;
  buttonText?: string;
}
export function LoginButton(props: ILoginButtonProps) {
  const handleOnClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div
      className={`Button__main bottom-padding-halfRem top-padding-halfRem left-padding-1rem right-padding-1rem ${
        props.customClassNames ? props.customClassNames : ""
      }`}
      onClick={handleOnClick}
    >
      {props.isLoggedIn ? (
        <div className="Button__main__LoggedInButton__enclosure flex">
          <img
            className={`Button__main__LoggedInButton__Image generic-profile-icon-width-adjustment ${
              props.customProfileImageClassNames
                ? props.customProfileImageClassNames
                : ""
            }`}
            src={props.imageSource ? props.imageSource : GenericProfileIcon}
            alt="profile-icon"
          />
          <div
            className={`Button__main__LoggedInButton__UserNameText username-top-padding-adjustment-logged-in user-name-responsive ${
              props.customTextClassNames ? props.customTextClassNames : ""
            }`}
          >
            {props.isLoggedIn.firstName.length <= 8
              ? props.isLoggedIn.firstName
              : ""}
          </div>
        </div>
      ) : (
        <div
          className="Button__main__LoggedInButton__enclosure flex"
          onClick={handleOnClick}
        >
          <img
            className={`Button__main__LoggedInButton__Image responsive-login-hamburger-icon generic-profile-icon-width-adjustment ${
              props.customProfileImageClassNames
                ? props.customProfileImageClassNames
                : ""
            }`}
            src={HamburgerButton}
            alt="hamburger"
          />
          <Button
            type={EButtonType.Normal}
            text={props.buttonText ? props.buttonText : ""}
            customClassNames={`round white-fill responsive-login-text ${
              props.customClassNames ? props.customClassNames : ""
            }`}
            customTextClassNames="green-text"
          />
        </div>
      )}
    </div>
  );
}

export default LoginButton;
