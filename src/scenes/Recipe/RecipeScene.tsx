import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import { EAppScene } from "../../services/app/app.types";
import { getUserById } from "../../services/user/user.service";
import { isURLValid } from "../../utils/string-helpers/validate-url";
import GenericRecipeImage from "../../components/RecipeCard/sample-pasta.jpeg";
import "../../components/CommonStyles/scene-style.css";
import "./recipe-scene-style.css";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import { selectAuthenticatedUser } from "../../reducers/app-slice";
import ProfileScene from "../Profile";
import { TSecureUser } from "../../services/user/user.types";
import { IRecipe } from "../../services/recipe/recipe.types";
import {
  getRecipeById,
  toggleLikeRecipe,
} from "../../services/recipe/recipe.service";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import RecipeEditor from "../RecipeEditor";
import { formatDate } from "../../utils/date-helpers/format-date";
import { RecipeStorageIO } from "../../utils/recipe-submission/recipe-storage-writer";
import { EModalPopType } from "../../components/ModalPop/types";
import ModalPop from "../../components/ModalPop/ModalPop";
import { getAllRecipesAsync } from "../../reducers/recipe-slice";

interface IRecipeSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
  recipeContextId: string;
}

enum EModalType {
  RecipeContextProfile = "recipeContextProfile",
  RecipeContextEdit = "recipeContextEdit",
  ModalPop = "modalPop",
}

function RecipeScene(props: IRecipeSceneProps) {
  const [recipeContext, setRecipeContext] = useState<IRecipe | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalPopText, setModalPopText] = useState<string | null>(null);
  const [modalPopType, setModalPopType] = useState<EModalPopType | null>(null);
  const authenticatedUserContext = useSelector(
    selectAuthenticatedUser,
    shallowEqual
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);

  const [recipeCreatorData, setRecipeCreatorData] =
    useState<TSecureUser | null>(null);

  const recipeHasImage = () =>
    !!recipeContext &&
    recipeContext.images &&
    recipeContext.images.length > 0 &&
    isURLValid(recipeContext.images[0].url);
  const dispatch = useDispatch();
  useEffect(() => {
    const getRecipeCreatorDetails = async () => {
      if (recipeContext) {
        try {
          setIsLoading(true);
          const userData = await getUserById({ id: recipeContext.postedBy });
          setRecipeCreatorData(userData);
          setIsLoading(false);
        } catch (error) {
          setErrorText(`Error: we're not able to retrieve recipe details`);
          setIsLoading(false);
        }
      }
    };
    getRecipeCreatorDetails();
  }, [recipeContext]);

  const getRecipeContext = async () => {
    if (props.recipeContextId) {
      try {
        setIsLoading(true);
        const recipe = await getRecipeById({ id: props.recipeContextId });
        RecipeStorageIO.writeRecipeData(recipe);
        setRecipeContext(recipe);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorText(`Error: Unable to retrieve recipe data`);
        setIsLoading(false);
        setHasError(true);
      }
    }
  };

  useEffect(() => {
    // const getRecipeContext = async () => {
    //   if (props.recipeContextId) {
    //     try {
    //       setIsLoading(true);
    //       const recipe = await getRecipeById({ id: props.recipeContextId });
    //       RecipeStorageIO.writeRecipeData(recipe);
    //       setRecipeContext(recipe);
    //       setIsLoading(false);
    //     } catch (error) {
    //       console.log(error)
    //       setErrorText(`Error: Unable to retrieve recipe data`);
    //       setIsLoading(false);
    //       setHasError(true);
    //     }
    //   }
    // };
    getRecipeContext();
  }, []);

  const isAuthenticatedUserRecipeMatch = (): boolean => {
    if (authenticatedUserContext && recipeCreatorData) {
      if (authenticatedUserContext._id === recipeCreatorData._id) {
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

  const handleToggleLikeRecipe = async () => {
    if (recipeContext) {
      const result = await toggleLikeRecipe({ id: recipeContext?._id });
      setRecipeContext(result.updatedRecipeDocument);
    }
  };

  const showRecipeCreatorContext = () => {
    if (recipeContext) {
      setModalType(EModalType.RecipeContextProfile);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalPopText(null);
    setModalPopType(null);
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleShowRecipeEdit = async () => {
    if (recipeContext) {
      RecipeStorageIO.writeRecipeData(recipeContext);
      setModalType(EModalType.RecipeContextEdit);
      setIsModalOpen(true);
    }
  };

  const handleOnSuccessfulRecipeUpdate = () => {
    setModalType(EModalType.ModalPop);
    setModalPopText("Recipe updated successfully");
    setModalPopType(EModalPopType.Success);
    setIsModalOpen(true);
    dispatch(getAllRecipesAsync({}));
    getRecipeContext();
  };

  const handleModalPopClose = () => {
    closeModal();
  };
  return (
    <div
      className={`Recipe Scene__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      {isLoading && <Spinner />}
      {hasError && errorText && <ErrorMessage text={errorText} />}
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
              <>{`Created by You.`}</>
            ) : (
              <>
                {` ${
                  recipeCreatorData && recipeCreatorData.firstName
                    ? `Created by ${recipeCreatorData.firstName}`
                    : ""
                } ${
                  recipeCreatorData && recipeCreatorData.lastName
                    ? recipeCreatorData.lastName
                    : ""
                }`}
              </>
            )}
          </div>
          <div className="Recipe Scene__recipe-info-section__createDate recipe-user-font even-slighter-left-margin">
            {recipeCreatorData &&
              recipeCreatorData.createdAt &&
              `Last updated on ${formatDate(
                recipeCreatorData?.updatedAt.toString()
              )}`}
          </div>
          {isAuthenticatedUserRecipeMatch() && (
            <Button
              type={EButtonType.Normal}
              text="Edit this recipe"
              onClick={handleShowRecipeEdit}
              customClassNames="slight-left-margin"
              customTextClassNames="recipe-user-font underline-text color-dark-blue-green"
            />
          )}
        </div>
        <div className="Recipe Scene__like-button-section slight-percent-margin-left">
          {!isAuthenticatedUserRecipeMatch() &&
            authenticatedUserContext &&
            !hasError && (
              <div className="Recipe Scene__like-button-section__enclosure flex">
                <Button
                  onClick={handleToggleLikeRecipe}
                  type={EButtonType.Like}
                  likeButtonClassNames="small-like-heart-size"
                  likeButtonState={{
                    liked: isRecipeLikedByAuthenticatedUser(),
                  }}
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
          {modalType === EModalType.RecipeContextProfile &&
            recipeCreatorData && (
              <ProfileScene
                onDismiss={closeModal}
                customClassNames="responsive-margining modal-top-margining fade-in-animation"
                userId={recipeCreatorData._id}
              />
            )}
          {modalType === EModalType.RecipeContextEdit && (
            <RecipeEditor
              editMode={isAuthenticatedUserRecipeMatch()}
              titleText="Edit Recipe"
              onDismiss={closeModal}
              recipeEditContextId={props.recipeContextId}
              onSubmitSuccess={handleOnSuccessfulRecipeUpdate}
            />
          )}
          {modalType === EModalType.ModalPop &&
            modalPopType &&
            modalPopText && (
              <ModalPop
                text={modalPopText ? modalPopText : ""}
                customClassNames="pop-text-responsive-padding fade-in-animation"
                type={modalPopType}
                onDismiss={handleModalPopClose}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default RecipeScene;
