import Button from ".";
import { EButtonType } from "./Button";
import "./button-style.css";
import GenericProfileIcon from "./generic-profile-icon.svg";

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
  return (
    <div
      className={`Button__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
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
        <Button
          type={EButtonType.Normal}
          text="Login"
          customClassNames="round white-fill"
          customTextClassNames="green-text"
        />
      )}
    </div>
  );
}

export default LoginButton;
