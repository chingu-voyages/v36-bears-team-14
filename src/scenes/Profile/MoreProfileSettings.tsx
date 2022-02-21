import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import "../../components/CommonStyles/scene-style.css";
import TextField from "../../components/TextField";
import { TSecureUser } from "../../services/user/user.types";

interface IMoreSettingsProps {
  onDismiss?: () => void;
  customClassNames?: string;
  userContext: TSecureUser;
}

function MoreProfileSettingsModal(props: IMoreSettingsProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nameUpdateDisabled, setNameUpdateDisabled] = useState<boolean>(false);

  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordUpdateDisabled, setPasswordUpdateDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    setFirstName(props.userContext.firstName);
    setLastName(props.userContext.lastName);
  }, []);

  const onSubmitUpdatePassword = () => {
    // DO something
  };

  const onSubmitUpdateName = () => {
    // Do something
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
          />
          <TextField
            name="lastName"
            value={lastName}
            type="text"
            inputClassNames="input-text-width"
            onChange={handleLastNameChange}
          />
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
