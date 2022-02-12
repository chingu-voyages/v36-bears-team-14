import { useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import TextField from "../../../components/TextField";
import { titleDescriptionValidator } from "../../../utils/validators";
import "../new-recipe-style.css";
import { SceneName } from "../scene.types";

export type TRecipeNameDescriptionCallBackData = ({
  currentIndex,
  sceneName,
  recipeTitle,
  recipeDescription,
}: {
  currentIndex: number;
  sceneName: SceneName;
  recipeTitle: string;
  recipeDescription: string;
}) => void;

interface ITitleDescriptionSceneProps {
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onDismiss?: () => void;
  onClickNext?: TRecipeNameDescriptionCallBackData;
  onClickBack?: TRecipeNameDescriptionCallBackData;
}

function TitleDescriptionScene(props: ITitleDescriptionSceneProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [recipeNameText, setRecipeNameText] = useState<string>("");
  const [recipeDescriptionText, setRecipeDescriptionText] =
    useState<string>("");

  const handleRecipeTitleTextChange = ({ value }: { value: string }) => {
    setRecipeNameText(value);
  };
  const handleRecipeDescriptionTextChange = ({ value }: { value: string }) => {
    setRecipeDescriptionText(value);
  };

  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleGoToNext = () => {
    clearErrors();
    titleDescriptionValidator({
      recipeTitle: recipeNameText,
      recipeDescription: recipeDescriptionText,
      onError: (message: string) => {
        setHasError(true);
        setErrorText(message);
      },
      onSuccess: ({ sanitizedTitle, sanitizedDescription }) => {
        props.onClickNext &&
          props.onClickNext({
            currentIndex: props.index,
            sceneName: props.sceneName,
            recipeTitle: sanitizedTitle,
            recipeDescription: sanitizedDescription,
          });
      },
    });
  };

  const clearErrors = () => {
    setHasError(false);
    setErrorText(null);
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
          <TextField
            label="Title"
            type="text"
            name="recipe_title"
            maxLength={250}
            onChange={handleRecipeTitleTextChange}
            inputClassNames="new-recipe-text-responsive"
          />
          <TextField
            label="Description"
            type="text"
            multiLine={true}
            maxLength={1000}
            name="recipe_description"
            onChange={handleRecipeDescriptionTextChange}
            inputClassNames="new-recipe-text-responsive"
          />
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

export default TitleDescriptionScene;
