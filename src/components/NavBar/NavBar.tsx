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
import { getAllRecipesAsync } from "../../reducers/recipe-slice";
import { setCurrentUserContextByIdAsync } from "../../reducers/user-slice";
import LoginScene from "../../scenes/Login";
import NewRecipeScene from "../../scenes/NewRecipe";
import ProfileScene from "../../scenes/Profile";
import RegistrationScene from "../../scenes/UserRegistration/UserRegistration";
import AppLogo from "../App-logo/App-logo";
import Button from "../Button";
import { EButtonType } from "../Button/Button";
import LoginButton from "../Button/LoginButton";
import ContextMenu from "../ContextMenu";
import ModalContainer from "../ModalContainer";
import ModalPopUp from "../ModalPop/ModalPop";
import { EModalPopType } from "../ModalPop/types";
import TextField from "../TextField";
import "./nav-bar-style.css";

interface INavBarProps {
  customClassNames?: string;
}

enum EModalType {
  Login = "login",
  Register = "register",
  Profile = "profile",
  NewRecipe = "newRecipe",
  ModalPop = "modalPop",
}

function NavBar(props: INavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);
  const [modalPopText, setModalPopText] = useState<string | null>(null);
  const [modalPopType, setModalPopType] = useState<EModalPopType | null>(null);
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
    dispatch(setCurrentUserContextByIdAsync({ id: "me" }));
    setModalType(EModalType.Profile);
    setIsModalOpen(true);
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
  const dismissNewRecipeWindow = () => {
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
    dispatch(
      logInUserAsync({ email, plainTextPassword, onSuccess: onLoginSuccess })
    );
    dispatch(clearLogInErrorStatus());
  };

  const dismissProfileWindow = () => {
    closeModal();
  };

  const handleAddNewRecipe = () => {
    setModalType(EModalType.NewRecipe);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(checkHasSessionAsync());
  }, []);

  const refreshRecipesAfterSubmit = () => {
    dispatch(getAllRecipesAsync({}));
    showDialog({
      type: EModalPopType.Success,
      text: "Thanks! Your recipe was added.",
    });
  };

  const showDialog = ({
    type,
    text,
  }: {
    type: EModalPopType;
    text: string;
  }) => {
    setModalPopType(type);
    setModalPopText(text);
    setModalType(EModalType.ModalPop);
    setIsModalOpen(true);
  };

  const handleModalPopClose = () => {
    setModalPopText(null);
    setModalPopType(null);
    closeModal();
  };

  // useEffect(()=> {
  //   if (!modalPopType && !modalPopText && !modalType) closeModal()
  // }, [modalPopType, modalPopText, modalType, isModalOpen ])

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
                customClassNames="Submit-Recipe-Text-Button round white-fill green-text full-recipe-top-margin-adjustment bottom-padding-halfRem left-padding-1rem right-padding-1rem top-padding-halfRem"
                type={EButtonType.Normal}
                onClick={handleAddNewRecipe}
              />
              <Button
                customClassNames="Submit-Recipe-Plus-Button mobile-add-recipes-plus-button plus-button-recipe-margin-adjustment bottom-padding-halfRem left-padding-1rem right-padding-1rem top-padding-halfRem"
                type={EButtonType.Plus}
                onClick={handleAddNewRecipe}
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
              customClassNames="bottom-padding-halfRem left-padding-1rem right-padding-1rem top-padding-halfRem"
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
            {modalType && modalType === EModalType.Profile && (
              <ProfileScene onDismiss={dismissProfileWindow} />
            )}
            {modalType && modalType === EModalType.NewRecipe && (
              <NewRecipeScene
                onDismiss={dismissNewRecipeWindow}
                onSubmitSuccess={refreshRecipesAfterSubmit}
              />
            )}
            {modalType &&
              modalType === EModalType.ModalPop &&
              modalPopType &&
              modalPopText && (
                <ModalPopUp
                  text={modalPopText ? modalPopText : "Text is not defined"}
                  customClassNames="pop-text-responsive-padding"
                  type={modalPopType}
                  onDismiss={handleModalPopClose}
                />
              )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
