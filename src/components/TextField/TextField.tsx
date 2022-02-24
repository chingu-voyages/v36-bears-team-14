import "../CommonStyles/text-field-style.css";

interface ITextFieldProps {
  customClassNames?: string;
  inputClassNames?: string;
  value?: string | number;
  label?: string;
  type: "text" | "url" | "password" | "email";
  multiLine?: boolean;
  name: string;
  placeholder?: string;
  onChange?: ({ value, HTMLName }: { value: string; HTMLName: string }) => void;
  labelClassNames?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  disabled?: boolean;
}

const TEXT_MAX_LENGTH = 5000;

function TextField(props: ITextFieldProps) {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange &&
      props.onChange({
        value: event.target.value,
        HTMLName: event.target.name,
      });
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.onChange &&
      props.onChange({
        value: event.target.value,
        HTMLName: event.target.name,
      });
  };

  return (
    <div
      className={`TextInput__Main__common ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      {props.label && (
        <label
          htmlFor={props.name}
          className={`TextInput__label__common ${
            props.labelClassNames ? props.labelClassNames : ""
          }`}
        >
          {props.label}
        </label>
      )}
      {props.multiLine ? (
        <textarea
          className={`TextInput__Text__text-area ${
            props.inputClassNames ? props.inputClassNames : ""
          }`}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleTextAreaChange}
          name={`${props.name}`}
          id={props.name}
          rows={props.rows ?? 10}
          cols={props.cols ?? 6}
          maxLength={props.maxLength ?? TEXT_MAX_LENGTH}
          disabled={props.disabled}
        />
      ) : (
        <input
          className={`TextInput__Text__common ${
            props.inputClassNames ? props.inputClassNames : ""
          }`}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleTextInputChange}
          name={`${props.name}`}
          id={props.name}
          maxLength={props.maxLength ?? TEXT_MAX_LENGTH}
          disabled={props.disabled}
        />
      )}
    </div>
  );
}

export default TextField;
