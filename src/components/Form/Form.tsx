import React, { useState } from "react";
import TextField from "../TextField/TextField";

const Form = () => {
  const [ingredientList, setIngredientList] = useState({
    ingredient: "",
    quantity: "",
  });
  const { ingredient, quantity } = ingredientList;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIngredientList((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ingredientList);
  };

  return (
    <form>
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
  );
};

export default Form;
