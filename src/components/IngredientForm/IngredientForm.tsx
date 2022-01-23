import React, { useState } from "react";
import TextField from "../TextField/TextField";
import NumberField from "../NumberTextField/NumberTextField";

interface IIngredientFormProps {
  customClassName?: string;
}

const IngredientForm = (props: IIngredientFormProps) => {
  const [ingredientList, setIngredientList] = useState({
    ingredient: "",
    quantity: 0,
  });
  const { ingredient, quantity } = ingredientList;

  const handleChange = ({ value, name }: { value: string; name: string }) => {
    setIngredientList((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ingredientList);
  };

  const handleNumChange = ({
    value,
    name,
  }: {
    value: number;
    name: string;
  }) => {
    setIngredientList((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ingredientList);
  };

  return (
    <div className={`${props.customClassName ? props.customClassName : ""}`}>
      <form>
        <TextField
          type="text"
          value={ingredient}
          placeholder="Ingredient Name"
          label="ingredient"
          name="ingredient"
          onChange={handleChange}
        />
        <NumberField
          type="number"
          value={quantity}
          placeholder="Add quantity"
          label="Quantity"
          name="quantity"
          onChange={handleNumChange}
        />
      </form>
    </div>
  );
};

export default IngredientForm;
