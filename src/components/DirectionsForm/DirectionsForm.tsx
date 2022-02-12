import { useState } from "react";
import TextField from "../TextField/TextField";

import Button, { EButtonType } from "../Button/Button";
import "./directions-form-style.css";
import { TRecipeStep } from "../../services/recipe/recipe.types";
import ErrorMessage from "../ErrorMessage";
import { recipeDirectionsValidator } from "../../utils/validators";

interface IDirectionsFormProps {
  customClassNames?: string;
  customControlsClassNames?: string;
  customSubmitButtonClassNames?: string;
  onSubmit?: (data: TRecipeStep) => void;
}

const DirectionsForm = (props: IDirectionsFormProps) => {
  const [directionsSteps, setDirectionsSteps] = useState({
    description: "",
    imageUrl: "",
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { description, imageUrl } = directionsSteps;

  const handleChange = ({
    HTMLName,
    value,
  }: {
    HTMLName: string;
    value: string | number;
  }) => {
    setDirectionsSteps((prev) => ({
      ...prev,
      [HTMLName]: value,
    }));
  };

  const handleSubmit = () => {
    clearErrors();
    recipeDirectionsValidator({
      data: directionsSteps,
      onSuccess: (validatedData) => {
        props.onSubmit && props.onSubmit(validatedData);
        resetInputs();
      },
      onError: (message) => {
        setHasError(true);
        setErrorMessage(message);
      },
    });
  };

  const resetInputs = () => {
    setDirectionsSteps({
      description: "",
      imageUrl: "",
    });
  };

  const clearErrors = () => {
    setHasError(false);
    setErrorMessage(null);
  };

  return (
    <div
      className={`DirectionsForm__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`${
          props.customControlsClassNames ? props.customControlsClassNames : ""
        } flex responsive-wrap form-flex-spacing`}
      >
        <TextField
          type="text"
          value={description}
          placeholder="Add a recipe instruction"
          label="step"
          name="description"
          onChange={handleChange}
        />
        <Button
          type={EButtonType.Normal}
          text="Add"
          customClassNames={
            props.customSubmitButtonClassNames
              ? props.customSubmitButtonClassNames
              : ""
          }
          onClick={handleSubmit}
        />
      </div>
      {hasError && errorMessage && <ErrorMessage text={errorMessage} />}
    </div>
  );
};

export default DirectionsForm;
