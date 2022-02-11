import {
  TRecipeIngredient,
  TRecipeStep,
} from "../../services/recipe/recipe.types";

export const recipeIngredientsValidator = ({
  data,
  onError,
  onSuccess,
}: {
  data: TRecipeIngredient;
  onError: (message: string) => void;
  onSuccess: (sanitizedData: TRecipeIngredient) => void;
}) => {
  if (!data) {
    onError("Check the information entered and ensure all fields are complete");
    return;
  }
  if (!data.name || data.name.trim() === "") {
    onError("Enter an ingredient name");
    return;
  }
  if (!data.unit || data.unit.trim() === "") {
    onError("Enter a unit of measurement");
    return;
  }
  if (!data.quantity) {
    onError("Please enter a numeric quantity");
    return;
  }
  if (isNaN(data.quantity)) {
    onError("Please enter a numerical value");
    return;
  }
  if (data.quantity <= 0) {
    onError("Please enter a number greater than 0");
    return;
  }

  onSuccess({
    name: data.name.trim(),
    quantity: data.quantity,
    unit: data.unit.trim(),
  });
};

export const recipeDirectionsValidator = ({
  data,
  onError,
  onSuccess,
}: {
  data: TRecipeStep;
  onError: (message: string) => void;
  onSuccess: (sanitizedData: TRecipeStep) => void;
}) => {
  if (!data) {
    onError("Check the information entered and ensure all fields are complete");
    return;
  }
  if (!data.description) {
    onError("Please enter a recipe step");
    return;
  }

  onSuccess({
    description: data.description.trim(),
    imageUrl: data.imageUrl ?? "",
  });
};
