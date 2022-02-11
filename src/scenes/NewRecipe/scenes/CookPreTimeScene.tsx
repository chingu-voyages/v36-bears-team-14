import { useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import NumberField from "../../../components/NumberField";
import "../new-recipe-style.css";
import { SceneName } from "../scene.types";

export type TRecipeCookPrepTimeCallBackData = ({
  currentIndex,
  sceneName,
  cookTime,
  prepTime,
}: {
  currentIndex: number;
  sceneName: SceneName;
  cookTime: number;
  prepTime: number;
}) => void;

interface ICookPrepTimeSceneProps {
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onDismiss?: () => void;
  onClickNext?: TRecipeCookPrepTimeCallBackData;
  onClickBack?: TRecipeCookPrepTimeCallBackData;
}

function CookPrepTimeScene(props: ICookPrepTimeSceneProps) {
  const [cookTimeValue, setCookTimeValue] = useState<number>(0);
  const [prepTimeValue, setPrepTimeValue] = useState<number>(0);

  const handleCookTimeValueChange = ({ value }: { value: number }) => {
    setCookTimeValue(value);
  };
  const handlePrepTimeValueChange = ({ value }: { value: number }) => {
    setPrepTimeValue(value);
  };

  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleGoToNext = () => {
    props.onClickNext &&
      props.onClickNext({
        currentIndex: props.index,
        sceneName: props.sceneName,
        cookTime: cookTimeValue,
        prepTime: prepTimeValue,
      });
  };

  const handleGoBack = () => {
    props.onClickBack &&
      props.onClickBack({
        currentIndex: props.index,
        sceneName: props.sceneName,
        cookTime: cookTimeValue,
        prepTime: prepTimeValue,
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
          <NumberField
            label="Cook Time (minutes)"
            name="cook_time_minutes"
            numericalRangeLimit={{ min: 0 }}
            onChange={handleCookTimeValueChange}
            inputClassName=""
          />
          <NumberField
            label="Prep Time (minutes)"
            name="prep_time_minutes"
            numericalRangeLimit={{ min: 0 }}
            onChange={handlePrepTimeValueChange}
            inputClassName=""
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
            text="Back"
            onClick={handleGoBack}
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

export default CookPrepTimeScene;
