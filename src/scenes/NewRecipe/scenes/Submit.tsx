import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import { SceneName } from "../scene.types";
import "../new-recipe-style.css";
interface INewRecipeSubmitData {
  onSubmit: () => void;
  onDismiss?: () => void;
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onClickBack?: ({
    currentIndex,
    sceneName,
  }: {
    currentIndex: number;
    sceneName: string;
  }) => void;
}
function CreateRecipeSubmitScene(props: INewRecipeSubmitData) {
  const handleGoBack = () => {
    props.onClickBack &&
      props.onClickBack({
        currentIndex: props.index,
        sceneName: props.sceneName,
      });
  };
  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleSubmit = () => {
    props.onSubmit();
  };
  return (
    <div
      className={`RecipeSubmitScene__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div className="RecipeSubmitScene__main__controlsEnclosure responsive-margin">
        <div className="RecipeSubmitScene__header submit-responsive-padding">
          Do you want to submit this recipe?
        </div>
        <div className="RecipeSubmitScene__flexControls flex-container bottom-padding ">
          <Button
            text="Back"
            onClick={handleGoBack}
            type={EButtonType.Normal}
            customClassNames="slight-right-margin"
          />
          <Button
            text="Submit Recipe"
            onClick={handleSubmit}
            type={EButtonType.Normal}
            customClassNames="green-fill white-text round standard-button-padding green-fill white-text"
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

export default CreateRecipeSubmitScene;
