import { useState } from "react";
import Banner from "../../components/Banner";
import {
  TRecipeIngredient,
  TRecipeStep,
} from "../../services/recipe/recipe.types";
import "./new-recipe-style.css";
import { SceneName } from "./scene.types";
import CookPrepTimeScene from "./scenes/CookPreTimeScene";
import DirectionsScene from "./scenes/DirectionsScene";
import IngredientsScene from "./scenes/IngredientsScene";
import RecipePhotoScene from "./scenes/RecipePhoto";
import CreateRecipeSubmitScene from "./scenes/Submit";
import TitleDescriptionScene from "./scenes/TitleDescriptionScene";

interface INewRecipeSceneProps {
  customClassNames?: string;
  onDismiss: () => void;
}

export function NewRecipeScene(props: INewRecipeSceneProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [recipeTitle, setRecipeTitle] = useState<string | null>(null);
  const [recipeDescription, setRecipeDescription] = useState<string | null>(
    null
  );

  const [cookTime, setCookTime] = useState<number | null>(null);
  const [prepTime, setPrepTime] = useState<number | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [ingredientsList, setIngredientsList] = useState<TRecipeIngredient[]>(
    []
  );
  const [recipeSteps, setRecipeSteps] = useState<TRecipeStep[]>([]);

  const getNewRecipeScene = ({ idx }: { idx: number }) => {
    switch (idx) {
      case 0:
        return (
          <TitleDescriptionScene
            index={idx}
            sceneName={SceneName.TitleDescription}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
          />
        );
      case 1:
        return (
          <CookPrepTimeScene
            index={idx}
            sceneName={SceneName.CookPrepTime}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
            onClickBack={handleClickBack}
          />
        );
      case 2:
        return (
          <RecipePhotoScene
            index={idx}
            sceneName={SceneName.Photo}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
            onClickBack={handleClickBack}
          />
        );
      case 3:
        return (
          <IngredientsScene
            index={idx}
            sceneName={SceneName.Ingredients}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
            onClickBack={handleClickBack}
          />
        );
      case 4:
        return (
          <DirectionsScene
            index={idx}
            sceneName={SceneName.Directions}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
            onClickBack={handleClickBack}
          />
        );
      case 5:
        return (
          <CreateRecipeSubmitScene
            index={idx}
            sceneName={SceneName.Final}
            onSubmit={handleSubmit}
            onDismiss={handleClickCancel}
            onClickBack={handleClickBack}
          />
        );
    }
  };

  const handleClickNext = (data: any) => {
    if (data) {
      if (data.sceneName === SceneName.TitleDescription) {
        setRecipeTitle(data.recipeTitle);
        setRecipeDescription(data.recipeDescription);
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.CookPrepTime) {
        setCookTime(data.cookTime);
        setPrepTime(data.prepTime);
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.Photo) {
        setPhotoUrl(data.photoUrl);
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.Ingredients) {
        setIngredientsList(data.ingredientsList);
        setCurrentStageIndex(() => currentStageIndex + 1);
      }
    }
  };

  const handleClickBack = (data?: any) => {
    if (data.sceneName === SceneName.CookPrepTime) {
      setCookTime(data.cookTime);
      setPrepTime(data.prepTime);
      setCurrentStageIndex(0);
    } else if (data.sceneName === SceneName.Photo) {
      setPhotoUrl(data.photoUrl);
      setCurrentStageIndex(1);
    } else if (data.sceneName === SceneName.Ingredients) {
      setIngredientsList(data.ingredientsList);
      setCurrentStageIndex(2);
    } else if (data.sceneName === SceneName.Directions) {
      setRecipeSteps(data.directionsList);
      setCurrentStageIndex(3);
    } else if (data.sceneName === SceneName.Final) {
      setCurrentStageIndex(4);
    }
  };

  const clearAllData = () => {
    setRecipeTitle(null);
    setRecipeDescription(null);
    setCookTime(null);
    setPrepTime(null);
    setPhotoUrl(null);
    setIngredientsList([]);
  };

  const handleClickCancel = () => {
    setCurrentStageIndex(0);
    clearAllData();
    props.onDismiss();
  };

  const handleSubmit = () => {
    // validate, dispatch
  };

  const testLog = () => {
    console.log(recipeTitle);
    console.log(recipeDescription);
    console.log(cookTime);
    console.log(prepTime);
    console.log(photoUrl);
    console.log(ingredientsList);
    console.log(recipeSteps);
  };
  testLog();
  return (
    <div
      className={`NewRecipe__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <Banner titleText="New Recipe" />
      <div className="NewRecipe__main__Stage__main">
        {getNewRecipeScene({ idx: currentStageIndex })}
      </div>
    </div>
  );
}

export default NewRecipeScene;
