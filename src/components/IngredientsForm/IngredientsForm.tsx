import React, { useState } from "react";
import TextField from "../TextField/TextField";
import NumberField from "../NumberField/NumberField";

interface IIngredientsFormProps {
  customClassname?: string;
}

const IngredientsForm = (props: IIngredientsFormProps) => {
  const [ingredientList, setIngredientList] = useState({
    ingredient: "",
    quantity: 1,
  });
  const { ingredient, quantity } = ingredientList;

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | number;
  }) => {
    setIngredientList((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ingredientList);
  };

  return (
    <div>
      <form className={`${props.customClassname ? props.customClassname : ""}`}>
        <TextField
          type="text"
          value={ingredient}
          placeholder="Ingredient Name"
          label="ingredient"
          name="ingredient"
          onChange={handleChange}
        />
        <NumberField
          value={quantity}
          placeholder="Add quantity"
          label="Quantity"
          name="quantity"
          onChange={handleChange}
          numericalRangeLimit={{ max: 20, min: 0 }}
        />
      </form>
    </div>
  );
};

export default IngredientsForm;
