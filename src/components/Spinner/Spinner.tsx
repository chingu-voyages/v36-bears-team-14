import "./spinner-style.css";

interface ISpinnerProps {
  title?: string;
  customClassNames?: string;
}

function Spinner(props: ISpinnerProps) {
  return (
    <div
      className={`loader spinner-responsive-margin ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      {props.title ? props.title : "Loading..."}
    </div>
  );
}

export default Spinner;
