import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import "../../components/CommonStyles/scene-style.css";
import ErrorMessage from "../../components/ErrorMessage";
import TextField from "../../components/TextField";
import { securePatchUserDataByUserId } from "../../services/user/user.service";
import { TSecureUser } from "../../services/user/user.types";
import SuccessIcon from "./success-icon.svg";
interface IMoreSettingsProps {
  onDismiss?: () => void;
  customClassNames?: string;
  userContext: TSecureUser;
}

function MoreProfileSettingsModal(props: IMoreSettingsProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nameUpdateDisabled, setNameUpdateDisabled] = useState<boolean>(false);
  const [hasNameError, setHasNameError] = useState<boolean>(false);
  const [nameErrorText, setNameErrorText] = useState<string | null>(null);
  const [hasNameSuccessMessage, setHasNameSuccessMessage] =
    useState<boolean>(false);
  const [nameSuccessText, setNameSuccessText] = useState<string | null>(null);

  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordUpdateDisabled, setPasswordUpdateDisabled] =
    useState<boolean>(false);
  const [hasPasswordSuccessMessage, setHasPasswordSuccessMessage] =
    useState<boolean>(false);
  const [passwordSuccessText, setPasswordSuccessText] = useState<string | null>(
    null
  );

  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [passwordErrorText, setPasswordErrorText] = useState<string | null>(
    null
  );
  useState<boolean>(false);

  useEffect(() => {
    setFirstName(props.userContext.firstName);
    setLastName(props.userContext.lastName);
  }, []);

  const onSubmitUpdatePassword = async () => {
    setHasPasswordError(false);
    setPasswordErrorText(null);
    if (!password1) {
      setHasPasswordError(true);
      setPasswordErrorText("Please enter a password");
      return;
    }
    if (password1.trim() === "" || password1.trim().length < 8) {
      setHasPasswordError(true);
      setPasswordErrorText(
        "Please enter a password and ensure it is at least 8 characters long"
      );
      return;
    }
    if (password2.trim() !== password1.trim()) {
      setHasPasswordError(true);
      setPasswordErrorText("Please ensure passwords match");
      return;
    }
    securePatchUserDataByUserId({
      id: props.userContext._id,
      updateType: "password",
      payload: {
        password: password1,
      },
      onSuccess: handleSuccessfulPasswordUpdate,
      onError: handleErrorPasswordUpdate,
    });
  };

  const handleSuccessfulNameUpdate = () => {
    setNameSuccessText("Successfully updated first and last name");
    setNameUpdateDisabled(true);
    setHasNameSuccessMessage(true);
  };

  const handleErrorNameUpdate = (message: string) => {
    console.log("error", message);
    setNameErrorText(message);
    setHasNameError(true);
    setHasNameSuccessMessage(false);
    setNameSuccessText(null);
  };

  const handleSuccessfulPasswordUpdate = () => {
    setPasswordSuccessText("Successfully updated password");
    setPasswordUpdateDisabled(true);
    setHasPasswordSuccessMessage(true);
  };

  const handleErrorPasswordUpdate = (message: string) => {
    setPasswordErrorText(message);
    setHasPasswordError(true);
    setHasPasswordSuccessMessage(false);
    setPasswordSuccessText(null);
  };

  const onSubmitUpdateName = async () => {
    setHasNameError(false);
    setNameErrorText(null);
    if (!firstName || firstName.trim() === "") {
      setHasNameError(true);
      setNameErrorText("Enter a first name. It can't be empty");
      return;
    }

    if (!lastName || lastName.trim() === "") {
      setHasNameError(true);
      setNameErrorText("Enter a last name. It can't be empty");
      return;
    }

    securePatchUserDataByUserId({
      updateType: "name",
      id: props.userContext._id,
      payload: {
        firstName,
        lastName,
      },
      onError: handleErrorNameUpdate,
      onSuccess: handleSuccessfulNameUpdate,
    });
  };

  const handleFirstNameChange = ({ value }: { value: string }) => {
    setFirstName(value);
  };
  const handleLastNameChange = ({ value }: { value: string }) => {
    setLastName(value);
  };

  const handleP1Change = ({ value }: { value: string }) => {
    setPassword1(value);
  };
  const handleP2Change = ({ value }: { value: string }) => {
    setPassword2(value);
  };

  const SuccessMessage = ({ text }: { text: string }) => {
    return (
      <div className="SuccessMessage__main flex">
        <img className="SuccessMessage__icon" src={SuccessIcon} alt="ok" />
        <p className="SuccessMessage_text green-text">{text}</p>
      </div>
    );
  };
  return (
    <div
      className={`Profile__MoreSettings__main white-background responsive-margining ${
        props.customClassNames ? props.customClassNames : ""
      } top-margin-padding-px`}
    >
      <section className="Profile__MoreSettings__backButtonSection">
        <Button type={EButtonType.Back} onClick={props.onDismiss} />
      </section>
      <header className="Profile__MoreSettings__header">
        <Banner titleText="Settings" />
        <h4 className="centered-text top-margin-padding">
          You can update your name and password. Click the confirm update button
          to make the respective changes
        </h4>
      </header>
      <div className="Profile__MoreSettings__main__body responsive-margining bottom-padding">
        <section className="Profile__MoreSettings__section__changeName section-border section-bottom-border">
          <h5>Update your name</h5>
          <TextField
            name="firstName"
            value={firstName}
            type="text"
            inputClassNames="input-text-width"
            onChange={handleFirstNameChange}
            maxLength={255}
          />
          <TextField
            name="lastName"
            value={lastName}
            type="text"
            inputClassNames="input-text-width"
            onChange={handleLastNameChange}
            maxLength={255}
          />
          {hasNameError && nameErrorText && (
            <ErrorMessage text={nameErrorText} />
          )}
          {hasNameSuccessMessage && nameSuccessText && (
            <SuccessMessage text={nameSuccessText} />
          )}
          <Button
            disabled={nameUpdateDisabled}
            text="Confirm Update"
            type={EButtonType.Normal}
            customClassNames="round green-fill white-text standard-padding top-bottom-margining"
            onClick={onSubmitUpdateName}
          />
        </section>
        <section className="Profile__MoreSettings__section__UpdatePassword section-bottom-border top-margin-spacing">
          <h5>Update your password</h5>
          <TextField
            name="password1"
            value={password1}
            type="password"
            placeholder="New password"
            inputClassNames="input-text-width"
            onChange={handleP1Change}
          />
          <TextField
            name="password2"
            value={password2}
            type="password"
            placeholder="Confirm new password"
            inputClassNames="input-text-width"
            onChange={handleP2Change}
          />
          {hasPasswordError && passwordErrorText && (
            <ErrorMessage text={passwordErrorText} />
          )}
          <Button
            disabled={passwordUpdateDisabled}
            text="Confirm Update"
            type={EButtonType.Normal}
            customClassNames="round green-fill white-text standard-padding top-bottom-margining"
            onClick={onSubmitUpdatePassword}
          />
        </section>
      </div>
    </div>
  );
}

export default MoreProfileSettingsModal;
