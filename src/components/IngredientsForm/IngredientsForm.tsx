import React, { useState } from "react";
import TextField from "../TextField/TextField";
import NumberField from "../NumberField/NumberField";
import Button, { EButtonType } from "../Button/Button";
import "./ingredients-form-style.css";
import { TRecipeIngredient } from "../../services/recipe/recipe.types";
import { recipeIngredientsValidator } from "../../utils/validators";
import ErrorMessage from "../ErrorMessage";
interface IIngredientsFormProps {
  customClassNames?: string;
  customControlsClassNames?: string;
  customSubmitButtonClassNames?: string;
  onSubmit?: (data: TRecipeIngredient) => void;
}

const IngredientsForm = (props: IIngredientsFormProps) => {
  const [ingredientList, setIngredientList] = useState({
    name: "",
    quantity: 1,
    unit: "",
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { name, quantity, unit } = ingredientList;

  const handleChange = ({
    HTMLName,
    value,
  }: {
    HTMLName: string;
    value: string | number;
  }) => {
    setIngredientList((prev) => ({
      ...prev,
      [HTMLName]: value,
    }));
  };

  const handleSubmit = () => {
    clearErrors();
    recipeIngredientsValidator({
      data: ingredientList,
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
    setIngredientList({
      name: "",
      quantity: 1,
      unit: "",
    });
  };

  const clearErrors = () => {
    setHasError(false);
    setErrorMessage(null);
  };

  return (
    <div
      className={`IngredientsForm__main ${
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
          value={name}
          placeholder="Ingredient Name"
          label="name"
          name="name"
          onChange={handleChange}
        />
        <NumberField
          value={quantity}
          placeholder="Add quantity"
          label="Quantity"
          name="quantity"
          onChange={handleChange}
          numericalRangeLimit={{ max: 5000, min: 0 }}
        />
        <TextField
          type="text"
          value={unit}
          placeholder="Unit"
          label="Unit"
          name="unit"
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

export default IngredientsForm;
