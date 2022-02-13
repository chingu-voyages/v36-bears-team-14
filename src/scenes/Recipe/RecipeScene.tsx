import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import {
  selectCurrentRecipeContext,
  toggleLikeRecipeAsync,
} from "../../reducers/recipe-slice";
import { EAppScene } from "../../services/app/app.types";
import { getUserById } from "../../services/user/user.service";
import { formatDate } from "../../utils/date-helpers/format-date";
import { isURLValid } from "../../utils/string-helpers/validate-url";
import GenericRecipeImage from "../../components/RecipeCard/sample-pasta.jpeg";
import "../../components/CommonStyles/scene-style.css";
import "./recipe-scene-style.css";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import { selectAuthenticatedUser } from "../../reducers/app-slice";
import ProfileScene from "../Profile";
import { setCurrentUserContextByIdAsync } from "../../reducers/user-slice";

interface IRecipeSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
}

type TRecipeCreatorDetails = {
  createdById: string | null;
  firstName: string | null;
  lastName: string | null;
  createdAt: string | null;
};
enum EModalType {
  RecipeContextProfile = "recipeContextProfile",
}

function RecipeScene(props: IRecipeSceneProps) {
  const recipeContext = useSelector(selectCurrentRecipeContext, shallowEqual);
  const authenticatedUserContext = useSelector(
    selectAuthenticatedUser,
    shallowEqual
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);

  const [recipeCreatorData, setRecipeCreatorData] =
    useState<TRecipeCreatorDetails>({
      createdById: null,
      firstName: null,
      lastName: null,
      createdAt: null,
    });

  const dispatch = useDispatch();

  const recipeHasImage = () =>
    !!recipeContext &&
    recipeContext.images &&
    recipeContext.images.length > 0 &&
    isURLValid(recipeContext.images[0].url);

  useEffect(() => {
    const getRecipeDetails = async () => {
      if (recipeContext) {
        try {
          const userData = await getUserById({ id: recipeContext.postedBy });
          setRecipeCreatorData({
            createdById: userData._id.toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdAt: formatDate(recipeContext.createdAt.toString()),
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRecipeDetails();
  }, [recipeContext]);

  const isAuthenticatedUserRecipeMatch = (): boolean => {
    if (authenticatedUserContext && recipeCreatorData) {
      if (authenticatedUserContext._id === recipeCreatorData.createdById) {
        return true;
      }
    }
    return false;
  };

  const isRecipeLikedByAuthenticatedUser = (): boolean => {
    if (
      authenticatedUserContext &&
      recipeCreatorData &&
      recipeContext &&
      recipeContext.likes
    ) {
      const recipeLikes = Object.keys(recipeContext.likes);
      if (recipeLikes.length === 0) return false;
      if (recipeLikes.includes(authenticatedUserContext._id)) return true;
    }
    return false;
  };

  const handleToggleLikeRecipe = () => {
    if (recipeContext) {
      dispatch(toggleLikeRecipeAsync({ id: recipeContext._id }));
    }
  };

  const showRecipeCreatorContext = () => {
    if (recipeContext) {
      dispatch(setCurrentUserContextByIdAsync({ id: recipeContext._id }));
      setModalType(EModalType.RecipeContextProfile);
      setIsModalOpen(true);
    }
  };

  const handleCloseProfileContextView = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

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
          subtitleText2:
            recipeContext && recipeContext.likes
              ? `${Object.keys(recipeContext.likes).length.toString()} ♥`
              : "",
          customSubtitleClassNames: "green-background-white-text-smaller",
          hasLink: { type: EAppScene.Profile, userId: recipeContext?.postedBy },
        }}
      />
      <div className="Recipe Scene__body top-margin-padding">
        <div className="Recipe Scene__recipe-info-section flex slight-percent-margin-left">
          <div
            className="Recipe Scene__recipe-info-section__createdBy pointer-cursor recipe-user-font"
            onClick={showRecipeCreatorContext}
          >
            {isAuthenticatedUserRecipeMatch() ? (
              <>{`Created by You`}</>
            ) : (
              <>
                {`Created by ${recipeCreatorData.firstName} ${recipeCreatorData.lastName}`}
              </>
            )}
          </div>
          <div className="Recipe Scene__recipe-info-section__createDate recipe-user-font even-slighter-left-margin">
            {`on ${recipeCreatorData.createdAt}`}
          </div>
        </div>
        <div className="Recipe Scene__like-button-section slight-percent-margin-left">
          {!isAuthenticatedUserRecipeMatch() && (
            <div className="Recipe Scene__like-button-section__enclosure flex">
              <Button
                onClick={handleToggleLikeRecipe}
                type={EButtonType.Like}
                likeButtonClassNames="small-like-heart-size"
                likeButtonState={{ liked: isRecipeLikedByAuthenticatedUser() }}
              />
              <div className="Recipe Scene__like-button-section__like-caption-text even-slighter-left-margin recipe-user-font">
                {isRecipeLikedByAuthenticatedUser()
                  ? `You like this`
                  : `Like this`}
              </div>
            </div>
          )}
        </div>
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
          <div className="Recipe Scene__body__footer__controls white-background">
            <Button
              type={EButtonType.Normal}
              onClick={() => props.onDismiss && props.onDismiss()}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal__main">
          {modalType === EModalType.RecipeContextProfile && (
            <ProfileScene
              onDismiss={handleCloseProfileContextView}
              customClassNames="responsive-margining modal-top-margining"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeScene;
