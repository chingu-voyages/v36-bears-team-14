import { useState } from "react";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage";
import TextField from "../../components/TextField";
import "./login-style.css";

interface ILoginSceneProps {
  onDismiss?: () => void;
}

function LoginScene(props: ILoginSceneProps) {
  const [email, setEmail] = useState<string>("");
  const [plainTextPassword, setPlainTextPassword] = useState<string | null>(
    null
  );

  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [loginErrorMessage, setHasLoginErrorMessage] = useState<string | null>(
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
  return (
    <div className="LoginScene__Main">
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
              text={passwordErrorMessage ?? "Problem with password"}
            />
          )}
        </div>
        <div className="LoginScene__Controls__main">
          <div className="LoginScene__Controls login-vertical-spacing">
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
            />
          </div>
          {hasLoginError && (
            <div className="LoginScene__ErrorMessage_Main">
              <ErrorMessage text={loginErrorMessage ?? "Login error"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScene;
