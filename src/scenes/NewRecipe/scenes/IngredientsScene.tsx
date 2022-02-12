import { useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import IngredientsForm from "../../../components/IngredientsForm";
import { TRecipeIngredient } from "../../../services/recipe/recipe.types";
import "../new-recipe-style.css";
import { SceneName } from "../scene.types";
import { v4 as uuidv4 } from "uuid";
import ErrorMessage from "../../../components/ErrorMessage";
import { ingredientsValidator } from "../../../utils/validators";

export type TRecipeIngredientsCallBackData = ({
  currentIndex,
  sceneName,
  ingredientsList,
}: {
  currentIndex: number;
  sceneName: SceneName;
  ingredientsList: TRecipeListItem[];
}) => void;

interface IIngredientsSceneProps {
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onDismiss?: () => void;
  onClickNext?: TRecipeIngredientsCallBackData;
  onClickBack?: TRecipeIngredientsCallBackData;
}

interface IIngredientItemProps {
  onClickDelete: (id: string) => void;
  customClassNames?: string;
  customLiClassNames?: string;
  recipeListItemData: TRecipeListItem;
}

type TRecipeListItem = TRecipeIngredient & {
  id: string; // unique id we can use to delete things from the array
};

function IngredientItem(props: IIngredientItemProps) {
  const handleIngredientItemClick = () => {
    props.onClickDelete(props.recipeListItemData.id);
  };
  return (
    <div
      className={`IngredientItem__parent_div ${
        props.customClassNames ? props.customClassNames : ""
      } flex light-border`}
    >
      <li
        key={props.recipeListItemData.id}
        className={`IngredientItem__li ${
          props.customLiClassNames ? props.customLiClassNames : ""
        } responsive-buffer-padding`}
      >
        {`${props.recipeListItemData.name} ${props.recipeListItemData.quantity} ${props.recipeListItemData.unit}`}
      </li>
      <Button
        type={EButtonType.Normal}
        text="delete"
        onClick={handleIngredientItemClick}
        customTextClassNames="color-crimson-red"
        customClassNames="slight-left-margin"
      />
    </div>
  );
}

function IngredientsScene(props: IIngredientsSceneProps) {
  const [ingredientsList, setIngredientsList] = useState<TRecipeListItem[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleGoToNext = () => {
    clearErrors();
    ingredientsValidator({
      onError: (message: string) => {
        setHasError(true);
        setErrorText(message);
      },
      onSuccess: () => {
        props.onClickNext &&
          props.onClickNext({
            currentIndex: props.index,
            sceneName: props.sceneName,
            ingredientsList,
          });
      },
      ingredientsList,
    });
  };

  const clearErrors = () => {
    setHasError(false);
    setErrorText(null);
  };

  const handleAddRecipeIngredient = (data: TRecipeIngredient) => {
    const ingredientWithAppendedId = {
      ...data,
      id: uuidv4(),
    };
    setIngredientsList(() => [...ingredientsList, ingredientWithAppendedId]);
  };

  const handleGoBack = () => {
    props.onClickBack &&
      props.onClickBack({
        currentIndex: props.index,
        sceneName: props.sceneName,
        ingredientsList,
      });
  };

  const handleDeleteRecipeIngredient = (id: string) => {
    const filteredItems = [...ingredientsList].filter((item) => item.id !== id);
    setIngredientsList(filteredItems);
  };

  return (
    <div
      className={`NewRecipe__title-description-scene__main white-background buffer-padding ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`NewRecipe__title-description-scene__main__body__main input-flex-margins`}
      >
        <div className="NewRecipe__title-description-scene__data-input-enclosure">
          <div className="Recipe__ingredients__list__Enclosure">
            <div className="Recipe__ingredients__list__header bold-header">
              Ingredients
            </div>
            <ul className="Recipe__ingredients__list__ul no-list-bullets">
              {ingredientsList &&
                ingredientsList.length > 0 &&
                ingredientsList.map((item) => (
                  <IngredientItem
                    onClickDelete={handleDeleteRecipeIngredient}
                    recipeListItemData={item}
                  />
                ))}
              {ingredientsList.length === 0 && (
                <div className="Recipe__ingredients__list__footer-empty-list__text faded-italic-text">
                  Empty. Add to the list.
                </div>
              )}
            </ul>
          </div>
          <div className="Recipe__ingredients__controls">
            <IngredientsForm
              customClassNames="slight-bottom-margin"
              customSubmitButtonClassNames="black-thin-border round green-fill white-text buffer-padding-5px"
              onSubmit={handleAddRecipeIngredient}
            />
          </div>
        </div>
        {hasError && errorText && <ErrorMessage text={errorText} />}
        <div className="NewRecipe__title-description-scene__main__controls__main flex flex-right navigation-controls-buffer-margin">
          <Button
            text="Next"
            onClick={handleGoToNext}
            type={EButtonType.Normal}
            customClassNames="slight-right-margin"
          />
          <Button
            text="Back"
            onClick={handleGoBack}
            type={EButtonType.Normal}
            customClassNames="slight-right-margin"
          />
          <Button
            text="Cancel"
            onClick={handleOnDismissWindow}
            type={EButtonType.Normal}
            customTextClassNames="color-crimson-red"
          />
        </div>
      </div>
    </div>
  );
}

export default IngredientsScene;
