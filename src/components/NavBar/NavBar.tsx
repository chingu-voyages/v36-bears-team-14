import AppLogo from "../App-logo/App-logo";
import "./nav-bar-style.css";

function NavBar() {
  return (
    <div className="NavBar__main">
      <nav className="NavBar__nav__main">
        <AppLogo
          customClassNames="margin-2pct"
          customImageClassNames="regular-logo black-border"
        />
      </nav>
    </div>
  );
}

export default NavBar;
