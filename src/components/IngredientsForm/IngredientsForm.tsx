import React, { useState } from "react";
import TextField from "../TextField/TextField";

interface IIngredientsFormProps {
  customClassname?: string;
}

const IngredientsForm = (props: IIngredientsFormProps) => {
  const [ingredientList, setIngredientList] = useState({
    ingredient: "",
    quantity: "",
  });
  const { ingredient, quantity } = ingredientList;

  const handleChange = ({ value, name }: { value: string; name: string }) => {
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
        <TextField
          type="number"
          value={quantity}
          placeholder="Add quantity"
          label="Quantity"
          name="quantity"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default IngredientsForm;
