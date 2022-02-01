import { useState } from "react";
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

function NavBar(props: INavBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
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
        <Button
          text="Submit Recipe"
          customClassNames="Submit-Recipe-Text-Button round white-fill green-text"
          type={EButtonType.Normal}
        />
        <Button
          customClassNames="Submit-Recipe-Plus-Button mobile-add-recipes-plus-button"
          type={EButtonType.Plus}
        />
        <LoginButton onClick={() => setMenuOpen(true)} />
      </div>
      {menuOpen && (
        <ModalContainer onClickAway={() => setMenuOpen(false)}>
          <ContextMenu
            actions={{
              test: {
                text: "test menu",
                onClick: () => {
                  console.log("test is clicked!");
                },
              },
            }}
          />
        </ModalContainer>
      )}
    </nav>
  );
}

export default NavBar;
