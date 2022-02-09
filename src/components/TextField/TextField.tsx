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
  onChange?: ({ value, name }: { value: string; name: string }) => void;
  labelClassNames?: string;
  rows?: number;
  cols?: number;
}

function TextField(props: ITextFieldProps) {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange &&
      props.onChange({ value: event.target.value, name: event.target.name });
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.onChange &&
      props.onChange({ value: event.target.value, name: event.target.name });
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
        />
      )}
    </div>
  );
}

export default TextField;
