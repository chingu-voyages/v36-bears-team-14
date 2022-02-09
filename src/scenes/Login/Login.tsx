import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import { EStatus } from "../../definitions";
import { selectLoginStateStatus } from "../../reducers/app-slice";
import "./login-style.css";

interface ILoginSceneProps {
  onDismiss?: () => void;
  onLoginSubmit?: ({
    email,
    plainTextPassword,
  }: {
    email: string;
    plainTextPassword: string;
  }) => void;
  errorMessage?: string | null;
  customSceneClassNames?: string;
}

function LoginScene(props: ILoginSceneProps) {
  const loginStateStatus = useSelector(selectLoginStateStatus, shallowEqual);
  const [email, setEmail] = useState<string>("");
  const [plainTextPassword, setPlainTextPassword] = useState<string | null>(
    null
  );

  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );

  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);

  const handleEmailTextBoxChange = ({ value }: { value: string }) => {
    setEmail(value);
  };
  const handlePlainTextPasswordTextBoxChange = ({
    value,
  }: {
    value: string;
  }) => {
    setPlainTextPassword(value);
  };

  const handleCancelLoginDismiss = () => {
    props.onDismiss && props.onDismiss();
  };

  const validateLoginInput = () => {
    clearAllErrors();
    if (!email || !email.length) {
      setHasEmailError(true);
      setEmailErrorMessage("Please enter valid e-mail");
    }
    if (!plainTextPassword || !plainTextPassword.length) {
      setHasPasswordError(true);
      setPasswordErrorMessage("Please enter a password");
      return;
    }
    props.onLoginSubmit && props.onLoginSubmit({ email, plainTextPassword });
  };

  const clearAllErrors = () => {
    setHasPasswordError(false);
    setHasEmailError(false);
    setEmailErrorMessage(null);
    setPasswordErrorMessage(null);
  };

  return (
    <div
      className={`LoginScene__Main ${
        props.customSceneClassNames ? props.customSceneClassNames : ""
      }`}
    >
      {loginStateStatus && loginStateStatus.status === EStatus.Loading && (
        <Spinner customClassNames="burgundy-spinner-color" />
      )}
      <Banner titleText="Log in" />
      <div className="LoginScene__innerForm__main">
        <div className="LoginScene__Email__div">
          <TextField
            type="email"
            name="email"
            customClassNames="login-vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            label="E-mail"
            onChange={handleEmailTextBoxChange}
          />
          {hasEmailError && (
            <ErrorMessage text={emailErrorMessage ?? "Problem with e-mail"} />
          )}
        </div>
        <div className="LoginScene__Password__div">
          <TextField
            type="password"
            name="password"
            customClassNames="login-vertical-spacing"
            label="Password"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handlePlainTextPasswordTextBoxChange}
          />
          {hasPasswordError && (
            <ErrorMessage
              text={passwordErrorMessage ?? "Please check your password"}
            />
          )}
        </div>
        <div className="LoginScene__Controls__main login-bottom-padding">
          <div className="LoginScene__Controls login-vertical-spacing">
            <Button
              type={EButtonType.Normal}
              customClassNames="square green-fill bottom-padding-halfRem left-padding-1rem right-padding-1rem top-padding-halfRem"
              text="Go"
              customTextClassNames="white-text"
              onClick={validateLoginInput}
            />
            <Button
              type={EButtonType.Normal}
              customClassNames="square white-fill"
              text="Cancel"
              customTextClassNames="black-text bottom-padding-halfRem left-padding-1rem right-padding-1rem top-padding-halfRem"
              onClick={handleCancelLoginDismiss}
            />
          </div>
        </div>
        {props.errorMessage && (
          <div className="Error_footer">
            <ErrorMessage text={props.errorMessage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScene;

/**
 * 
 *     {spinnerStatus && spinnerStatus.status === EStatus.Loading && (
        <Spinner title={spinnerStatus.message && "Loading"} />
      )}
 */
