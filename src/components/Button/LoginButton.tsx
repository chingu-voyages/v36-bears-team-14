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
}
export function LoginButton(props: ILoginButtonProps) {
  const handleOnClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div
      className={`Button__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
      onClick={handleOnClick}
    >
      {props.isLoggedIn ? (
        <div className="Button__main__LoggedInButton__enclosure flex">
          <img
            className={`Button__main__LoggedInButton__Image ${
              props.customProfileImageClassNames
                ? props.customProfileImageClassNames
                : ""
            }`}
            src={props.imageSource ? props.imageSource : GenericProfileIcon}
            alt="profile-icon"
          />
          <div
            className={`Button__main__LoggedInButton__UserNameText ${
              props.customTextClassNames ? props.customTextClassNames : ""
            }`}
          >
            {props.isLoggedIn.firstName}
          </div>
        </div>
      ) : (
        <div
          className="Button__main__LoggedInButton__enclosure flex"
          onClick={handleOnClick}
        >
          <img
            className={`Button__main__LoggedInButton__Image responsive-login-hamburger-icon ${
              props.customProfileImageClassNames
                ? props.customProfileImageClassNames
                : ""
            }`}
            src={HamburgerButton}
            alt="hamburger"
          />
          <Button
            type={EButtonType.Normal}
            text="Login"
            customClassNames="round white-fill responsive-login-text"
            customTextClassNames="green-text"
          />
        </div>
      )}
    </div>
  );
}

export default LoginButton;
