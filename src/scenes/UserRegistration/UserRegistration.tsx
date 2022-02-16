import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import { EStatus } from "../../definitions";
import {
  registerNewUserAsync,
  selectRegistrationStatus,
} from "../../reducers/app-slice";
import { validateAndSanitizeRegistration } from "./registration-validation-helper";
import "./user-registration-style.css";

interface IUserRegistrationSceneProps {
  onDismiss?: () => void;
  onRegistrationSuccess?: () => void;
  customSceneClassNames?: string;
}
function RegistrationScene(props: IUserRegistrationSceneProps) {
  const dispatch = useDispatch();
  const registrationStatus = useSelector(
    selectRegistrationStatus,
    shallowEqual
  );
  const [hasRegistrationError, setHasRegistrationError] =
    useState<boolean>(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<
    string | null
  >(null);

  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );

  const [hasFirstNameError, setHasFirstNameError] = useState<boolean>(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<
    string | null
  >(null);

  const [hasLastNameError, setHasLastNameError] = useState<boolean>(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<
    string | null
  >(null);

  const [hasPassword1Error, setHasPassword1Error] = useState<boolean>(false);
  const [password1ErrorMessage, setPassword1ErrorMessage] = useState<
    string | null
  >(null);

  const [hasPassword2Error, setHasPassword2Error] = useState<boolean>(false);
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState<
    string | null
  >(null);

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const handleRegistrationCancelDismiss = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleEmailTextBoxChange = ({ value }: { value: string }) => {
    setEmail(value);
  };

  const handleFirstNameTextBoxChange = ({ value }: { value: string }) => {
    setFirstName(value);
  };
  const handleLastNameTextBoxChange = ({ value }: { value: string }) => {
    setLastName(value);
  };

  const handlePassword1TextBoxChange = ({ value }: { value: string }) => {
    setPassword1(value);
  };
  const handlePassword2TextBoxChange = ({ value }: { value: string }) => {
    setPassword2(value);
  };

  const validateRegistrationInfo = () => {
    clearAllErrorMessages();
    const results = validateAndSanitizeRegistration({
      input: {
        email: {
          data: email,
          setErrorMessage: setEmailErrorMessage,
          setHasError: setHasEmailError,
        },
        firstName: {
          data: firstName,
          setErrorMessage: setFirstNameErrorMessage,
          setHasError: setHasFirstNameError,
        },
        lastName: {
          data: lastName,
          setErrorMessage: setLastNameErrorMessage,
          setHasError: setHasLastNameError,
        },
        password1: {
          data: password1,
          setErrorMessage: setPassword1ErrorMessage,
          setHasError: setHasPassword1Error,
        },
        password2: {
          data: password2,
          setErrorMessage: setPassword2ErrorMessage,
          setHasError: setHasPassword2Error,
        },
      },
    });
    if (results.isAllDataValidated) {
      dispatch(
        registerNewUserAsync({
          email: results.sanitizedData.email,
          firstName: results.sanitizedData.firstName,
          lastName: results.sanitizedData.lastName,
          plainTextPassword: results.sanitizedData.password1,
          onSuccess: handleRegistrationSuccess,
          onError: handleRegistrationFail,
        })
      );
    } else {
      // There was a validation error
      setHasRegistrationError(true);
      setRegistrationErrorMessage(
        "Unable to proceed. Please check your details."
      );
    }
  };

  const handleRegistrationSuccess = () => {
    props.onRegistrationSuccess && props.onRegistrationSuccess();
  };

  const handleRegistrationFail = () => {
    // do some fail action
    setHasRegistrationError(true);
    setRegistrationErrorMessage("Unable to complete this registration");
  };

  const clearAllErrorMessages = () => {
    setHasRegistrationError(false);
    setRegistrationErrorMessage(null);

    setHasEmailError(false);
    setEmailErrorMessage(null);

    setHasFirstNameError(false);
    setFirstNameErrorMessage(null);

    setHasLastNameError(false);
    setLastNameErrorMessage(null);

    setHasPassword1Error(false);
    setPassword1ErrorMessage(null);

    setHasPassword2Error(false);
    setPassword2ErrorMessage(null);
  };
  return (
    <div
      className={`UserRegistration__Main ${
        props.customSceneClassNames ? props.customSceneClassNames : ""
      }`}
    >
      {registrationStatus && registrationStatus.status === EStatus.Loading && (
        <Spinner customClassNames="burgundy-spinner-color" />
      )}
      <Banner titleText="Sign Up" />
      <div className="UserRegistration__innerForm__main">
        <div className="UserRegistration__innerForm__email">
          <TextField
            type="email"
            name="email"
            label="E-mail"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handleEmailTextBoxChange}
          />
          {hasEmailError && (
            <ErrorMessage text={emailErrorMessage ?? "Please fix this field"} />
          )}
        </div>
        <div className="UserRegistration__innerForm__firstName">
          <TextField
            type="text"
            name="first_name"
            label="First name"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handleFirstNameTextBoxChange}
          />
          {hasFirstNameError && (
            <ErrorMessage
              text={firstNameErrorMessage ?? "Please fix this field"}
            />
          )}
        </div>
        <div className="UserRegistration__innerForm__lastName">
          <TextField
            type="text"
            name="last_name"
            label="Last name"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handleLastNameTextBoxChange}
          />
          {hasLastNameError && (
            <ErrorMessage
              text={lastNameErrorMessage ?? "Please fix this field"}
            />
          )}
        </div>
        <div className="UserRegistration__innerForm__password1">
          <TextField
            type="password"
            name="password1"
            label="Set a password"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handlePassword1TextBoxChange}
          />
          {hasPassword1Error && (
            <ErrorMessage
              text={password1ErrorMessage ?? "Please fix this field"}
            />
          )}
        </div>
        <div className="UserRegistration__innerForm__password2">
          <TextField
            type="password"
            name="password2"
            label="Confirm password"
            customClassNames="vertical-spacing"
            inputClassNames="text-box-flex-width round green-border"
            onChange={handlePassword2TextBoxChange}
          />
          {hasPassword2Error && (
            <ErrorMessage
              text={password2ErrorMessage ?? "Please fix this field"}
            />
          )}
        </div>
        <div className="UserRegistration__Controls__main registration-bottom-padding">
          <div className="UserRegistration__Controls vertical-spacing">
            <Button
              type={EButtonType.Normal}
              customClassNames="square green-fill"
              text="Go"
              customTextClassNames="white-text"
              onClick={validateRegistrationInfo}
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
              text={
                registrationErrorMessage ?? "Unable to complete registration"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationScene;
