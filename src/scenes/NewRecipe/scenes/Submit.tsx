import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import { SceneName } from "../scene.types";

interface INewRecipeSubmitData {
  onSubmit: () => void;
  onDismiss?: () => void;
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onClickBack?: () => void;
}
function CreateRecipeSubmitScene(props: INewRecipeSubmitData) {
  const handleGoBack = () => {
    props.onClickBack && props.onClickBack();
  };
  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleSubmit = () => {
    props.onSubmit();
  };
  return (
    <div
      className={`RecipeSubmitScene__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div className="RecipeSubmitScene__main__controlsEnclosure responsive-margin">
        <div className="RecipeSubmitScene__header">
          Do you want to submit this recipe?
        </div>
        <div className="RecipeSubmitScene__flexControls">
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

export default CreateRecipeSubmitScene;
