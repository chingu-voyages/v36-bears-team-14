import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EStatus } from "../../definitions";
import {
  checkHasSessionAsync,
  clearLogInErrorStatus,
  logInUserAsync,
  logOutUserAsync,
  selectAuthenticatedUser,
  selectIsAuthenticated,
  selectLoginStateStatus,
} from "../../reducers/app-slice";
import LoginScene from "../../scenes/Login";
import RegistrationScene from "../../scenes/UserRegistration/UserRegistration";
import AppLogo from "../App-logo/App-logo";
import Button from "../Button";
import { EButtonType } from "../Button/Button";
import LoginButton from "../Button/LoginButton";
import ContextMenu from "../ContextMenu";
import ModalContainer from "../ModalContainer";
import TextField from "../TextField";
import "./nav-bar-style.css";

interface INavBarProps {
  customClassNames?: string;
}

enum EModalType {
  Login = "login",
  Register = "register",
}

function NavBar(props: INavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);
  const isAuthenticated = useSelector(selectIsAuthenticated, shallowEqual);
  const logInStatus = useSelector(selectLoginStateStatus, shallowEqual);
  const authenticatedUser = useSelector(selectAuthenticatedUser, shallowEqual);
  const dispatch = useDispatch();

  const showLoginScreen = () => {
    setModalType(EModalType.Login);
    setIsModalOpen(true);
  };

  const showSignUpScreen = () => {
    setModalType(EModalType.Register);
    setIsModalOpen(true);
  };

  const showProfileScreen = () => {
    // Show profile screen
  };

  const handleLogOut = () => {
    if (isAuthenticated) {
      dispatch(logOutUserAsync());
    } else {
      console.log("User isn't authenticated so not logging out");
    }
  };

  const dismissLoginWindow = () => {
    dispatch(clearLogInErrorStatus());
    closeModal();
  };
  const dismissRegistrationWindow = () => {
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const onLoginSuccess = () => {
    dispatch(clearLogInErrorStatus());
    closeModal();
  };

  const handleLogInSubmit = ({
    email,
    plainTextPassword,
  }: {
    email: string;
    plainTextPassword: string;
  }) => {
    // This should be validated at this point
    dispatch(clearLogInErrorStatus());
    dispatch(
      logInUserAsync({ email, plainTextPassword, onSuccess: onLoginSuccess })
    );
  };

  useEffect(() => {
    dispatch(checkHasSessionAsync());
  }, []);

  return (
    <div className="Nav">
      <nav
        className={`NavBar__nav__main white-background ${
          props.customClassNames ? props.customClassNames : ""
        }`}
      >
        <div className="NavBar__AppLogoGroup">
          <AppLogo
            customClassNames="margin-2pct"
            customImageClassNames="regular-logo black-border"
          />
        </div>
        <div className="NavBar__TextBarSearchGroup">
          <TextField
            type="text"
            name="search_bar"
            placeholder="Search"
            inputClassNames="round thin-border-width green-border nav-bar-flex-width search-bar-left-margin"
          />
        </div>
        <div className="NavBar__SecondGroup">
          {isAuthenticated && (
            <div className="NavBar__authenticated-function-buttons">
              <Button
                text="Submit Recipe"
                customClassNames="Submit-Recipe-Text-Button round white-fill green-text full-recipe-top-margin-adjustment"
                type={EButtonType.Normal}
              />
              <Button
                customClassNames="Submit-Recipe-Plus-Button mobile-add-recipes-plus-button plus-button-recipe-margin-adjustment"
                type={EButtonType.Plus}
              />
            </div>
          )}

          {isAuthenticated && authenticatedUser ? (
            <LoginButton
              buttonText=""
              onClick={() => setMenuOpen(true)}
              isLoggedIn={{ firstName: authenticatedUser.firstName }}
            />
          ) : (
            <LoginButton
              buttonText="Log in"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
        {!isAuthenticated && menuOpen && (
          <ModalContainer onClickAway={() => setMenuOpen(false)}>
            <ContextMenu
              actions={{
                login: {
                  text: "Login",
                  onClick: showLoginScreen,
                },
                signUp: {
                  text: "Sign up",
                  onClick: showSignUpScreen,
                },
              }}
            />
          </ModalContainer>
        )}
        {isAuthenticated && menuOpen && (
          <ModalContainer onClickAway={() => setMenuOpen(false)}>
            <ContextMenu
              actions={{
                profile: {
                  text: "My Profile",
                  onClick: showProfileScreen,
                },
                logOut: {
                  text: "Log out",
                  onClick: handleLogOut,
                },
              }}
            />
          </ModalContainer>
        )}
        {isModalOpen && (
          <div className="modal__main">
            {modalType && modalType === EModalType.Login && (
              <LoginScene
                onDismiss={dismissLoginWindow}
                customSceneClassNames="window-body white-background"
                onLoginSubmit={handleLogInSubmit}
                errorMessage={
                  logInStatus.status === EStatus.Error && logInStatus.message
                    ? logInStatus.message
                    : null
                }
              />
            )}
            {modalType && modalType === EModalType.Register && (
              <RegistrationScene
                onDismiss={dismissRegistrationWindow}
                customSceneClassNames="window-body white-background"
              />
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
