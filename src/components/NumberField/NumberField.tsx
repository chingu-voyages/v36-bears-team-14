import "../CommonStyles/text-field-style.css";
interface INumberFieldProps {
  customClassNames?: string;
  inputClassName?: string;
  value?: number;
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: ({ value, name }: { value: number; name: string }) => void;
  numericalRangeLimit?: { min?: number; max?: number };
  labelClassNames?: string;
}

function NumberField(props: INumberFieldProps) {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange &&
      props.onChange({
        value: event.target.valueAsNumber,
        name: event.target.name,
      });
  };

  return (
    <div
      className={`TextInput__Main__common TextInput__Main__number ${
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
      <input
        className={`TextInput__Text__common ${
          props.inputClassName ? props.inputClassName : ""
        }`}
        type="number"
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleTextInputChange}
        name={`${props.name ? props.name : ""}`}
        max={
          props.numericalRangeLimit && props.numericalRangeLimit.max
            ? props.numericalRangeLimit.max
            : 10e3
        }
        min={
          props.numericalRangeLimit && props.numericalRangeLimit.min
            ? props.numericalRangeLimit.min
            : 0
        }
        id={props.name}
      />
    </div>
  );
}

export default NumberField;
