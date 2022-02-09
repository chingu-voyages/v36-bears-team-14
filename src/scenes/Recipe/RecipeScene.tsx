import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import { selectCurrentRecipeContext } from "../../reducers/recipe-slice";
import { EAppScene } from "../../services/app/app.types";
import { getUserById } from "../../services/user/user.service";
import { formatDate } from "../../utils/date-helpers/format-date";
import { isURLValid } from "../../utils/string-helpers/validate-url";
import GenericRecipeImage from "../../components/RecipeCard/sample-pasta.jpeg";
import "../../components/CommonStyles/scene-style.css";
import "./recipe-scene-style.css";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";

interface IRecipeSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
}

function RecipeScene(props: IRecipeSceneProps) {
  const recipeContext = useSelector(selectCurrentRecipeContext, shallowEqual);
  const [recipeUserInformation, setRecipeUserInformation] = useState<
    string | null
  >(null);

  const recipeHasImage = () =>
    !!recipeContext &&
    recipeContext.images &&
    recipeContext.images.length > 0 &&
    isURLValid(recipeContext.images[0].url);

  useEffect(() => {
    const getRecipeSubtitleText1 = async () => {
      if (recipeContext) {
        try {
          const userData = await getUserById({ id: recipeContext.postedBy });
          setRecipeUserInformation(
            `Posted by ${userData.firstName} ${
              userData.lastName
            } on ${formatDate(recipeContext.createdAt.toString())}`
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRecipeSubtitleText1();
  }, [recipeContext]);
  return (
    <div
      className={`Recipe Scene__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <Button
        type={EButtonType.Back}
        onClick={() => props.onDismiss && props.onDismiss()}
      />
      <Banner
        customClassNames="bottom-margin-buffer"
        titleText={
          recipeContext && recipeContext.name && recipeContext.name
            ? recipeContext.name
            : "Unknown Recipe"
        }
        hasImage={{
          bannerImageUrl: recipeHasImage()
            ? recipeContext?.images[0].url!
            : GenericRecipeImage,
          imageClassNames: "responsive-image-recipe",
          imageContainerClassNames: "recipe-responsive-image-container",
        }}
        hasSubtitle={{
          subtitleText1:
            recipeContext && recipeUserInformation
              ? recipeUserInformation
              : "Unknown recipe",
          subtitleText2:
            recipeContext && recipeContext.likes
              ? `${Object.keys(recipeContext.likes).length.toString()} ♥`
              : "",
          customSubtitleClassNames: "green-background-white-text-smaller",
          hasLink: { type: EAppScene.Profile, userId: recipeContext?.postedBy },
        }}
      />
      <div className="Recipe Scene__body top-margin-padding">
        <div className="Recipe Scene__like-button-section"></div>
        <div className="Recipe Scene__body__header">
          <div className="Recipe Scene__body__header__description-text">
            {recipeContext && recipeContext.description}
          </div>
        </div>
        <div className="Recipe Scene__body__middle flex-responsive-middle">
          <ul className="Recipe Scene__body__ingredients-list__main green-background white-text centered-text no-list-bullets box-padding no-margin">
            {recipeContext &&
              recipeContext.ingredients &&
              recipeContext.ingredients.map((ingredient) => (
                <li className="Recipe Scene_list-item centered-text">
                  {`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                </li>
              ))}
          </ul>
          <div className="Recipe Scene__body__prep-time-cook-time__main green-background white-text centered-text box-padding">
            <div className="Recipe Scene__body__prep-time">
              {`${recipeContext && recipeContext.prepTimeMinutes} min prep`}
            </div>
            <div className="Recipe Scene__body__cook-time">
              {`${recipeContext && recipeContext.cookTimeMinutes} min cook`}
            </div>
          </div>
        </div>
        <div className="Recipe Scene__body__footer">
          <ul className="Recipe Scene__body__directionsList no-list-bullets box-padding">
            {recipeContext &&
              recipeContext.directions &&
              recipeContext.directions.length > 0 &&
              recipeContext.directions.map((directionStep) => (
                <li className="centered-text">{directionStep.description}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeScene;
