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

export const titleDescriptionValidator = ({
  recipeTitle,
  recipeDescription,
  onError,
  onSuccess,
}: {
  recipeTitle: string;
  recipeDescription: string;
  onError: (message: string) => void;
  onSuccess: ({
    sanitizedTitle,
    sanitizedDescription,
  }: {
    sanitizedTitle: string;
    sanitizedDescription: string;
  }) => void;
}) => {
  if (!recipeTitle || recipeTitle.trim() === "") {
    onError("Please enter a title");
    return;
  }
  if (!recipeDescription || recipeDescription.trim() === "") {
    onError("Please enter a description");
    return;
  }
  onSuccess({
    sanitizedTitle: recipeTitle.trim(),
    sanitizedDescription: recipeDescription.trim(),
  });
};

export const cookTimePrepTimeValidator = ({
  cookTime,
  prepTime,
  onError,
  onSuccess,
}: {
  cookTime: number;
  prepTime: number;
  onError: (message: string) => void;
  onSuccess: () => void;
}) => {
  if (!cookTime || isNaN(cookTime)) {
    onError("Please enter a cooking time in minutes.");
    return;
  }
  if (!prepTime || isNaN(prepTime)) {
    onError("Please enter a preparation time in minutes.");
    return;
  }
  if (prepTime <= 0) {
    onError("Please enter a preparation time value greater than zero");
    return;
  }
  if (cookTime <= 0) {
    onError("Please enter a cooking time value greater than zero");
    return;
  }
  onSuccess();
};

export const ingredientsValidator = ({
  ingredientsList,
  onError,
  onSuccess,
}: {
  ingredientsList: TRecipeIngredient[];
  onError: (message: string) => void;
  onSuccess: () => void;
}) => {
  if (!ingredientsList || ingredientsList.length === 0) {
    onError("Please enter at least one ingredient");
    return;
  }
  onSuccess();
};

export const directionsValidator = ({
  directionsList,
  onError,
  onSuccess,
}: {
  directionsList: TRecipeStep[];
  onError: (message: string) => void;
  onSuccess: () => void;
}) => {
  if (!directionsList || directionsList.length === 0) {
    onError("Please enter at least one recipe step");
    return;
  }
  onSuccess();
};
