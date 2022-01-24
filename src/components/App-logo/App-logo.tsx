import ApplicationLogo from "./app-logo-essen.png";
import "./app-logo-style.css";
interface IApplicationLogoProps {
  customImageClassNames?: string;
  onClick?: () => void;
}
function AppLogo(props: IApplicationLogoProps) {
  return (
    <div className="AppLogo__main" onClick={props.onClick}>
      <img
        className={`AppLogo__image ${
          props.customImageClassNames ? props.customImageClassNames : ""
        }`}
        src={ApplicationLogo}
        alt="logo"
      />
    </div>
  );
}

export default AppLogo;
