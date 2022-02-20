import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import { TRecipeStep } from "../../../services/recipe/recipe.types";
import "../new-recipe-style.css";
import { SceneName } from "../scene.types";
import { v4 as uuidv4 } from "uuid";
import DirectionsForm from "../../../components/DirectionsForm";
import ErrorMessage from "../../../components/ErrorMessage";
import { directionsValidator } from "../../../utils/validators";
import { RecipeStorageIO } from "../../../utils/recipe-submission/recipe-storage-writer";

export type TRecipeDirectionsCallBackData = ({
  currentIndex,
  sceneName,
  directionsList,
}: {
  currentIndex: number;
  sceneName: SceneName;
  directionsList: TRecipeStep[];
}) => void;

interface IDirectionsSceneProps {
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onDismiss?: () => void;
  onClickNext?: TRecipeDirectionsCallBackData;
  onClickBack?: TRecipeDirectionsCallBackData;
}

interface IDirectionItemProps {
  onClickDelete: (id: string) => void;
  customClassNames?: string;
  customLiClassNames?: string;
  recipeDirectionItemData: TRecipeStepItem;
}

type TRecipeStepItem = TRecipeStep & {
  id: string; // unique id we can use to delete things from the array
};

function DirectionItem(props: IDirectionItemProps) {
  const handleDirectionItemClick = () => {
    props.onClickDelete(props.recipeDirectionItemData.id);
  };
  return (
    <div
      className={`Direction__parent_div ${
        props.customClassNames ? props.customClassNames : ""
      } flex light-border`}
    >
      <li
        key={props.recipeDirectionItemData.id}
        className={`DirectionItem__li ${
          props.customLiClassNames ? props.customLiClassNames : ""
        } responsive-buffer-padding`}
      >
        {`${props.recipeDirectionItemData.description}`}
      </li>
      <Button
        type={EButtonType.Normal}
        text="delete"
        onClick={handleDirectionItemClick}
        customTextClassNames="color-crimson-red"
        customClassNames="slight-left-margin"
      />
    </div>
  );
}

function DirectionsScene(props: IDirectionsSceneProps) {
  const [recipeStepList, setRecipeStepList] = useState<TRecipeStepItem[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleGoToNext = () => {
    clearErrors();
    directionsValidator({
      directionsList: recipeStepList,
      onError: (message: string) => {
        setHasError(true);
        setErrorText(message);
      },
      onSuccess: () => {
        props.onClickNext &&
          props.onClickNext({
            currentIndex: props.index,
            sceneName: props.sceneName,
            directionsList: recipeStepList,
          });
      },
    });
  };

  const clearErrors = () => {
    setHasError(false);
    setErrorText(null);
  };
  const handleAddRecipeStep = (data: TRecipeStep) => {
    const stepWithAppendedId = {
      ...data,
      id: uuidv4(),
    };
    setRecipeStepList(() => [...recipeStepList, stepWithAppendedId]);
  };

  const handleGoBack = () => {
    props.onClickBack &&
      props.onClickBack({
        currentIndex: props.index,
        sceneName: props.sceneName,
        directionsList: recipeStepList,
      });
  };

  const handleDeleteRecipeStep = (id: string) => {
    const filteredItems = [...recipeStepList].filter((item) => item.id !== id);
    setRecipeStepList(filteredItems);
  };

  useEffect(() => {
    const ppDirections = RecipeStorageIO.getDataByKey("directions");
    if (ppDirections) {
      setRecipeStepList(ppDirections as any);
    }
  }, []);

  return (
    <div
      className={`NewRecipe__directions-scene__main white-background buffer-padding fade-in-animation ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`NewRecipe__directions-scene__main__body__main input-flex-margins`}
      >
        <div className="NewRecipe__directions-scene__data-input-enclosure">
          <div className="Recipe__directions_list__Enclosure">
            <div className="Recipe__directions_list__header bold-header">
              Directions
            </div>
            <ul className="Recipe__directions_list__ul no-list-bullets">
              {recipeStepList &&
                recipeStepList.length > 0 &&
                recipeStepList.map((item) => (
                  <DirectionItem
                    onClickDelete={handleDeleteRecipeStep}
                    recipeDirectionItemData={item}
                  />
                ))}
              {recipeStepList.length === 0 && (
                <div className="Recipe__directions_list__footer-empty-list__text faded-italic-text">
                  Empty. Add recipe instructions
                </div>
              )}
            </ul>
          </div>
          <div className="Recipe__directions__controls">
            <DirectionsForm
              customClassNames="slight-bottom-margin"
              customSubmitButtonClassNames="black-thin-border round green-fill white-text buffer-padding-5px"
              onSubmit={handleAddRecipeStep}
            />
          </div>
          {hasError && errorText && <ErrorMessage text={errorText} />}
        </div>
        <div className="NewRecipe__title-description-scene__main__controls__main flex flex-right navigation-controls-buffer-margin">
          <Button
            text="Next"
            onClick={handleGoToNext}
            type={EButtonType.Normal}
            customClassNames="slight-right-margin round green-text white-fill standard-button-padding"
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

export default DirectionsScene;
