import { useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import TextField from "../../../components/TextField";
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
    props.onClickNext &&
      props.onClickNext({
        currentIndex: props.index,
        sceneName: props.sceneName,
        recipeTitle: recipeNameText,
        recipeDescription: recipeDescriptionText,
      });
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
          />
        </div>
      </div>
    </div>
  );
}

export default TitleDescriptionScene;
