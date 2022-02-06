import { useState } from "react";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage";
import TextField from "../../components/TextField";
import "./user-registration-style.css";

interface IUserRegistrationSceneProps {
  onDismiss?: () => void;
  customSceneClassNames?: string;
}
function RegistrationScene(props: IUserRegistrationSceneProps) {
  const [hasRegistrationError, setHasRegistrationError] =
    useState<boolean>(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<
    string | null
  >(null);

  const handleRegistrationCancelDismiss = () => {
    props.onDismiss && props.onDismiss();
  };

  return (
    <div
      className={`UserRegistration__Main ${
        props.customSceneClassNames ? props.customSceneClassNames : ""
      }`}
    >
      <Banner titleText="Sign Up" />
      <div className="UserRegistration__innerForm__main">
        <div className="UserRegistration__innerForm__email">
          <TextField
            type="email"
            name="email"
            label="E-mail"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
          />
        </div>
        <div className="UserRegistration__innerForm__firstName">
          <TextField
            type="text"
            name="first_name"
            label="First name"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
          />
        </div>
        <div className="UserRegistration__innerForm__lastName">
          <TextField
            type="text"
            name="last_name"
            label="Last name"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
          />
        </div>
        <div className="UserRegistration__innerForm__password1">
          <TextField
            type="password"
            name="password1"
            label="Set a password"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
          />
        </div>
        <div className="UserRegistration__innerForm__password2">
          <TextField
            type="password"
            name="password2"
            label="Confirm password"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
          />
        </div>
        <div className="UserRegistration__Controls__main registration-bottom-padding">
          <div className="UserRegistration__Controls vertical-spacing">
            <Button
              type={EButtonType.Normal}
              customClassNames="square green-fill"
              text="Go"
              customTextClassNames="white-text"
            />
            <Button
              type={EButtonType.Normal}
              customClassNames="square white-fill"
              text="Cancel"
              customTextClassNames="black-text"
              onClick={handleRegistrationCancelDismiss}
            />
          </div>
          {hasRegistrationError && (
            <ErrorMessage
              text={registrationErrorMessage ?? "Error with registration"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationScene;
