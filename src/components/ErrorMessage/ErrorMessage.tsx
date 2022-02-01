import "./error-message-style.css";
import ErrorIcon from "./error-icon.svg";
interface IErrorMessageProps {
  customClassNames?: string;
  customTextClassNames?: string;
  customErrorMessageIconClassNames?: string;
  text: string;
}
function ErrorMessage(props: IErrorMessageProps) {
  return (
    <div
      className={`ErrorMessage__Main flex error-margin-bottom ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img
        className={`ErrorMessage__icon flex-size ${
          props.customErrorMessageIconClassNames
            ? props.customErrorMessageIconClassNames
            : ""
        }`}
        src={ErrorIcon}
        alt="error"
      />
      <div
        className={`ErrorMessage__text error-left-margin ${
          props.customClassNames ? props.customClassNames : ""
        }`}
      >
        {props.text}
      </div>
    </div>
  );
}

export default ErrorMessage;
