import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import NumberField from "../../../components/NumberField";
import { RecipeStorageIO } from "../../../utils/recipe-submission/recipe-storage-writer";
import { cookTimePrepTimeValidator } from "../../../utils/validators";
import "../recipe-editor-style.css";
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
  const [cookTimeValue, setCookTimeValue] = useState<number>(1);
  const [prepTimeValue, setPrepTimeValue] = useState<number>(1);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

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
    clearErrors();
    cookTimePrepTimeValidator({
      cookTime: cookTimeValue,
      prepTime: prepTimeValue,
      onError: (message: string) => {
        setHasError(true);
        setErrorText(message);
      },
      onSuccess: () => {
        props.onClickNext &&
          props.onClickNext({
            currentIndex: props.index,
            sceneName: props.sceneName,
            cookTime: cookTimeValue,
            prepTime: prepTimeValue,
          });
      },
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

  const clearErrors = () => {
    setHasError(false);
    setErrorText(null);
  };

  useEffect(() => {
    const ppCookTimeMinutes = RecipeStorageIO.getDataByKey("cookTimeMinutes");
    const ppPrepTimeMinutes = RecipeStorageIO.getDataByKey("prepTimeMinutes");

    if (ppCookTimeMinutes) {
      setCookTimeValue(ppCookTimeMinutes as number);
    }
    if (ppPrepTimeMinutes) {
      setPrepTimeValue(ppPrepTimeMinutes as number);
    }
  }, []);

  return (
    <div
      className={`NewRecipe__title-description-scene__main white-background buffer-padding fade-in-animation${
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
            numericalRangeLimit={{ min: 1 }}
            onChange={handleCookTimeValueChange}
            inputClassName=""
            value={cookTimeValue}
          />
          <NumberField
            label="Prep Time (minutes)"
            name="prep_time_minutes"
            numericalRangeLimit={{ min: 1 }}
            onChange={handlePrepTimeValueChange}
            inputClassName=""
            value={prepTimeValue}
          />
        </div>
        {hasError && errorText && <ErrorMessage text={errorText} />}
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

export default CookPrepTimeScene;
