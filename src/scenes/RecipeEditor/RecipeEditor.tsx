import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Banner from "../../components/Banner";
import ErrorMessage from "../../components/ErrorMessage";
import { postNewRecipeAsync } from "../../reducers/recipe-slice";
import {
  getRecipeById,
  patchRecipe,
} from "../../services/recipe/recipe.service";
import {
  TRecipeIngredient,
  TRecipeStep,
} from "../../services/recipe/recipe.types";
import { RecipeStorageIO } from "../../utils/recipe-submission/recipe-storage-writer";
import "./recipe-editor-style.css";
import { SceneName } from "./scene.types";
import CookPrepTimeScene from "./scenes/CookPreTimeScene";
import DirectionsScene from "./scenes/DirectionsScene";
import IngredientsScene from "./scenes/IngredientsScene";
import RecipePhotoScene from "./scenes/RecipePhotoScene";
import CreateRecipeSubmitScene from "./scenes/Submit";
import TitleDescriptionScene from "./scenes/TitleDescriptionScene";

interface IRecipeEditorSceneProps {
  customClassNames?: string;
  onDismiss: () => void;
  onSubmitSuccess?: () => void;
  editMode: boolean;
  recipeEditContextId?: string;
  titleText: string;
}

export function RecipeEditor(props: IRecipeEditorSceneProps) {
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

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const dispatch = useDispatch();
  const getNewRecipeScene = ({ idx }: { idx: number }) => {
    switch (idx) {
      case 0:
        return (
          <TitleDescriptionScene
            index={idx}
            sceneName={SceneName.TitleDescription}
            onClickNext={handleClickNext}
            onDismiss={handleClickCancel}
            editMode={props.editMode}
            recipeContextId={
              props.editMode && props.recipeEditContextId
                ? props.recipeEditContextId
                : undefined
            }
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
            editMode={props.editMode}
          />
        );
    }
  };

  type TRecipeCreationProcessData = {
    sceneName: string;
    recipeTitle?: string;
    recipeDescription?: string;
    cookTime?: number;
    prepTime?: number;
    photoUrl?: string;
    ingredientsList?: Array<TRecipeIngredient>;
    directionsList?: Array<TRecipeStep>;
  };
  const handleClickNext = (data: TRecipeCreationProcessData) => {
    if (data) {
      if (data.sceneName === SceneName.TitleDescription) {
        setRecipeTitle(data.recipeTitle!);
        setRecipeDescription(data.recipeDescription!);
        RecipeStorageIO.writeDataToStorage({
          key: "name",
          data: data.recipeTitle,
        });
        RecipeStorageIO.writeDataToStorage({
          key: "description",
          data: data.recipeDescription,
        });
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.CookPrepTime) {
        setCookTime(data.cookTime!);
        setPrepTime(data.prepTime!);
        RecipeStorageIO.writeDataToStorage({
          key: "cookTimeMinutes",
          data: data.cookTime,
        });
        RecipeStorageIO.writeDataToStorage({
          key: "prepTimeMinutes",
          data: data.prepTime,
        });
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.Photo) {
        setPhotoUrl(data.photoUrl!);
        RecipeStorageIO.writeDataToStorage({
          key: "imageUrl",
          data: { url: data.photoUrl },
        });
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.Ingredients) {
        setIngredientsList(data.ingredientsList!);
        RecipeStorageIO.writeDataToStorage({
          key: "ingredients",
          data: data.ingredientsList,
        });
        setCurrentStageIndex(() => currentStageIndex + 1);
      } else if (data.sceneName === SceneName.Directions) {
        setRecipeSteps(data.directionsList!);
        RecipeStorageIO.writeDataToStorage({
          key: "directions",
          data: data.directionsList,
        });
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
    setRecipeSteps([]);
    RecipeStorageIO.clearAllData();
  };

  const handleClickCancel = () => {
    setCurrentStageIndex(0);
    clearAllData();
    props.onDismiss();
    RecipeStorageIO.clearAllData();
  };

  const getIngredientsListWithoutId = (): TRecipeIngredient[] => {
    if (ingredientsList && ingredientsList.length > 0) {
      return ingredientsList.map((ingredient) => {
        return {
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity,
        };
      });
    }
    return [];
  };

  const getRecipeStepsWithoutId = (): TRecipeStep[] => {
    if (recipeSteps && recipeSteps.length > 0) {
      return recipeSteps.map((step) => {
        return {
          description: step.description,
        };
      });
    }
    return [];
  };

  const handleSubmit = async () => {
    const directionsNoId = getRecipeStepsWithoutId();
    const ingredientsNoId = getIngredientsListWithoutId();
    if (!props.editMode) {
      dispatch(
        postNewRecipeAsync({
          name: recipeTitle!,
          description: recipeDescription!,
          cookTimeMinutes: cookTime!,
          prepTimeMinutes: prepTime!,
          directions: directionsNoId,
          ingredients: ingredientsNoId,
          imageUrl: photoUrl!,
          onSuccess: handleSuccessfulSubmit,
          onError: (message: string) => {
            setHasError(true);
            setErrorText(message);
          },
        })
      );
    } else {
      await patchRecipe({
        recipeId: props.recipeEditContextId!,
        payload: {
          name: recipeTitle!,
          description: recipeDescription!,
          cookTimeMinutes: cookTime!,
          prepTimeMinutes: prepTime!,
          directions: directionsNoId,
          ingredients: ingredientsNoId,
          imageUrl: photoUrl!,
          onSuccess: handleSuccessfulSubmit,
          onError: (message: string) => {
            setHasError(true);
            setErrorText(message);
          },
        },
      });
    }
  };

  const handleSuccessfulSubmit = () => {
    RecipeStorageIO.clearAllData();
    props.onSubmitSuccess && props.onSubmitSuccess();
  };

  return (
    <div
      className={`NewRecipe__main response-new-recipe-modal responsive-new-recipe-top-margin ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <Banner titleText={props.titleText} />
      <div className="NewRecipe__main__Stage__main">
        {getNewRecipeScene({ idx: currentStageIndex })}
      </div>
      {hasError && errorText && <ErrorMessage text={errorText} />}
    </div>
  );
}

export default RecipeEditor;
