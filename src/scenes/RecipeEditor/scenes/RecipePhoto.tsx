import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { EButtonType } from "../../../components/Button/Button";
import ImageUploader from "../../../components/ImageUploader";
import { RecipeStorageIO } from "../../../utils/recipe-submission/recipe-storage-writer";
import "../recipe-editor-style.css";
import { SceneName } from "../scene.types";

export type TRecipePhotoUrlCallBackData = ({
  currentIndex,
  sceneName,
  photoUrl,
}: {
  currentIndex: number;
  sceneName: SceneName;
  photoUrl?: string;
}) => void;

interface IRecipePhotoProps {
  customClassNames?: string;
  index: number;
  sceneName: SceneName;
  onDismiss?: () => void;
  onClickNext?: TRecipePhotoUrlCallBackData;
  onClickBack?: TRecipePhotoUrlCallBackData;
}

function RecipePhotoScene(props: IRecipePhotoProps) {
  const [photoUrlValue, setPhotoUrlValue] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState<boolean>(false);

  const handleUploadImageSuccess = (url: string) => {
    setHasImage(true);
    setPhotoUrlValue(url);
  };

  const handleOnDismissWindow = () => {
    props.onDismiss && props.onDismiss();
  };

  const handleGoToNext = () => {
    props.onClickNext &&
      props.onClickNext({
        currentIndex: props.index,
        sceneName: props.sceneName,
        photoUrl: photoUrlValue ?? "",
      });
  };

  const handleGoBack = () => {
    props.onClickBack &&
      props.onClickBack({
        currentIndex: props.index,
        sceneName: props.sceneName,
        photoUrl: photoUrlValue ?? "",
      });
  };

  const handleClearOutPhoto = () => {
    setPhotoUrlValue(null);
    setHasImage(false);
    RecipeStorageIO.clearDataByKey("imageUrl");
  };
  useEffect(() => {
    const ppImageUrl = RecipeStorageIO.getDataByKey("imageUrl");
    if (ppImageUrl && ppImageUrl !== "") {
      setPhotoUrlValue(ppImageUrl as string);
      setHasImage(true);
    }
  }, []);
  return (
    <div
      className={`NewRecipe__title-description-scene__main white-background buffer-padding fade-in-animation ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`NewRecipe__title-description-scene__main__body__main input-flex-margins`}
      >
        <div className="NewRecipe__title__instruction">
          Upload a photo (optional)
        </div>
        <div className="NewRecipe__title-description-scene__data-input-enclosure">
          {hasImage && (
            <div className="NewRecipe__photo__enclosure">
              <img
                className="NewRecipe__photo__Image"
                src={photoUrlValue ?? ""}
                alt="recipe"
              />
              <Button
                type={EButtonType.Normal}
                text="Clear"
                onClick={handleClearOutPhoto}
              />
            </div>
          )}
          <ImageUploader onUploadSuccess={handleUploadImageSuccess} />
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

export default RecipePhotoScene;
