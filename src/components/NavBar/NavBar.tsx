import AppLogo from "../App-logo/App-logo";
import Button from "../Button";
import { EButtonType } from "../Button/Button";
import LoginButton from "../Button/LoginButton";
import "./nav-bar-style.css";

interface INavBarProps {}

function NavBar(props: INavBarProps) {
  return (
    <nav className="NavBar__nav__main">
      <div className="NavBar__AppLogoGroup">
        <AppLogo
          customClassNames="margin-2pct"
          customImageClassNames="regular-logo black-border"
        />
      </div>
      <div className="NavBar__SecondGroup">
        <Button
          text="Submit Recipe"
          customClassNames="round white-fill green-text"
          type={EButtonType.Normal}
        />
        <Button
          customClassNames="mobile-add-recipes-plus-button"
          type={EButtonType.Plus}
        />
        <LoginButton />
      </div>
    </nav>
  );
}

export default NavBar;
