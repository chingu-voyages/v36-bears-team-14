import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import "../../components/CommonStyles/scene-style.css";
import ErrorMessage from "../../components/ErrorMessage";
import ImageUploader from "../../components/ImageUploader";
import RecipeCard from "../../components/RecipeCard";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import { selectAuthenticatedUser } from "../../reducers/app-slice";
import { getAllRecipesAsync } from "../../reducers/recipe-slice";
import { IRecipe } from "../../services/recipe/recipe.types";
import {
  getAllRecipesForUserId,
  getUserById,
  patchUserProfileDataByUserId,
} from "../../services/user/user.service";
import { TSecureUser } from "../../services/user/user.types";
import { isURLValid } from "../../utils/string-helpers/validate-url";
import RecipeScene from "../Recipe";

import GenericRacoon from "./generic-racoon.svg";
import MoreProfileSettingsModal from "./MoreProfileSettings";
import UserRecipesList from "./UserRecipesList";
import { isOwnProfile } from "./utils";
enum EModalType {
  FullRecipeView = "fullRecipeView",
  MoreRecipesList = "moreRecipesList",
  MoreProfileSettings = "moreProfileSettings",
}
interface IProfileSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
  userId: string;
}
function ProfileScene(props: IProfileSceneProps) {
  const [profileContextRecipeId, setProfileContextRecipeId] = useState<
    string | null
  >(null);
  const [userContextRecipes, setUserContextRecipes] = useState<IRecipe[]>([]);
  const [userContext, setUserContext] = useState<TSecureUser | null>(null);
  const authenticatedUser = useSelector(selectAuthenticatedUser, shallowEqual);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);
  const [isBioEditMode, setIsBioEditMode] = useState<boolean>(false);
  const [editedBioText, setEditedBioText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [isFavoriteFoodsEditMode, setFavoriteFoodsEditMode] =
    useState<boolean>(false);
  const [commaSeparatedFavoriteFoods, setCommaSeparatedFavoriteFoods] =
    useState<string>("");

  const dispatch = useDispatch();
  const userHasImage = () => {
    return !!(userContext && isURLValid(userContext.photoUrl!));
  };

  const handleBioTextChange = ({ value }: { value: string }) => {
    setEditedBioText(value);
  };

  const handleCancelBioEdit = () => {
    setIsBioEditMode(false);
    if (userContext && userContext.bio) {
      setEditedBioText(userContext.bio);
    }
  };

  const handleCancelFavoriteFoodsEdit = () => {
    setFavoriteFoodsEditMode(false);
    if (userContext && userContext.favoriteFoods) {
      setCommaSeparatedFavoriteFoods(userContext.favoriteFoods.join(","));
    }
  };
  const handleSetBioEditMode = () => {
    setIsBioEditMode(true);
    if (userContext) {
      setEditedBioText(userContext.bio);
    }
  };

  const handleSetFavoriteFoodsEditMode = () => {
    setFavoriteFoodsEditMode(true);
    if (userContext) {
      setCommaSeparatedFavoriteFoods(userContext.favoriteFoods.join(","));
    }
  };

  const handlePatchBio = async (action: "update" | "delete") => {
    setIsBioEditMode(false);
    if (userContext && userContext._id) {
      const result = await patchUserProfileDataByUserId({
        id: userContext._id,
        bio: { action, data: editedBioText },
      });
      setUserContext(result.user);
    }
  };

  const handlePatchFavoriteFoods = async (action: "update" | "delete") => {
    setFavoriteFoodsEditMode(false);
    if (userContext && userContext._id) {
      const result = await patchUserProfileDataByUserId({
        id: userContext._id,
        favoriteFoods: { action, data: commaSeparatedFavoriteFoods.split(",") },
      });
      setUserContext(result.user);
    }
  };

  const handleCommaSeparatedFavoriteFoodsChange = ({
    value,
  }: {
    value: string;
  }) => {
    setCommaSeparatedFavoriteFoods(value);
  };

  useEffect(() => {
    if (userContext) {
      setEditedBioText(userContext.bio);
      if (Array.isArray(userContext.favoriteFoods)) {
        setCommaSeparatedFavoriteFoods(userContext.favoriteFoods.join(","));
      }
    }
  }, [userContext]);
  useEffect(() => {
    const getUserContext = async () => {
      try {
        setIsLoading(true);
        const user = await getUserById({ id: props.userId });
        setUserContext(user);
        setIsLoading(false);
      } catch (exception) {
        setIsLoading(false);
        setHasError(true);
        setErrorText("Unable to retrieve user data for this context");
      }
    };
    getUserContext();
  }, []);

  const handleRecipeCardClicked = (recipeId: string) => {
    setProfileContextRecipeId(recipeId);
    setModalType(EModalType.FullRecipeView);
    setIsModalOpen(true);
  };

  const handleCloseFullRecipeView = () => {
    closeModal();
  };

  const handleUpdateProfilePhoto = async (url: string) => {
    if (userContext && userContext._id && url) {
      const result = await patchUserProfileDataByUserId({
        id: userContext._id,
        photoUrl: {
          action: "update",
          data: url,
        },
        onError: ({ message }) => handleProfilePhotoUpdateError({ message }),
      });
      setUserContext(result.user);
    }
  };

  const handleProfilePhotoUpdateError = ({ message }: { message: string }) => {
    setErrorText(message);
    setHasError(true);
  };

  const handleShowMoreRecipes = () => {
    setModalType(EModalType.MoreRecipesList);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  const handleRefreshDeletedItems = async () => {
    dispatch(getAllRecipesAsync({}));
    try {
      if (userContext) {
        setIsLoading(true);
        const recipes = await getAllRecipesForUserId({
          userId: userContext._id,
        });
        if (recipes) {
          setUserContextRecipes(recipes);
        }
        setIsLoading(false);
      }
    } catch (exception) {
      setErrorText("There was an error retrieving information for this user");
      setHasError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getRecipesByUser = async () => {
      try {
        if (userContext) {
          setIsLoading(true);
          const recipes = await getAllRecipesForUserId({
            userId: userContext._id,
          });
          if (recipes) {
            setUserContextRecipes(recipes);
          }
          setIsLoading(false);
        }
      } catch (exception) {
        setErrorText("There was an error retrieving information for this user");
        setHasError(true);
        setIsLoading(false);
      }
    };
    getRecipesByUser();
  }, [userContext]);

  const handleOpenMoreSettings = () => {
    // Do something
    setModalType(EModalType.MoreProfileSettings);
    setIsModalOpen(true);
  };
  return (
    <div
      className={`Profile Scene__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      {isLoading && <Spinner customClassNames="color-crimson-red" />}

      <Button
        type={EButtonType.Back}
        onClick={() => props.onDismiss && props.onDismiss()}
      />
      {hasError && errorText && <ErrorMessage text={errorText} />}
      <Banner
        customClassNames="bottom-margin-buffer"
        titleText={`${
          userContext && userContext.firstName ? userContext.firstName : ""
        } ${userContext && userContext.lastName ? userContext.lastName : ""}`}
        hasImage={{
          bannerImageUrl: userHasImage()
            ? userContext!.photoUrl!
            : GenericRacoon,
          imageClassNames: "responsive-image",
        }}
      />
      <div className="Profile Scene__body top-margin-padding responsive-margining">
        {isOwnProfile({ userContext, authenticatedUser }) && (
          <div className="Profile Scene__body__admin flex flex-right">
            <Button
              type={EButtonType.Normal}
              text="More settings..."
              customTextClassNames="underline-text smaller-font color-dark-blue-green"
              onClick={handleOpenMoreSettings}
            />
          </div>
        )}
        {isOwnProfile({ userContext, authenticatedUser }) && (
          <div className="Profile Scene__body__image-edit-controls__enclosure slight-bottom-margin flex">
            <div className="Profile Scene__body__image-edit-controls__prompt smaller-font">
              Edit profile photo
            </div>
            <ImageUploader
              customClassNames="even-slighter-left-margin"
              onUploadSuccess={handleUpdateProfilePhoto}
            />
          </div>
        )}
        <div className="Profile Scene__body__header">
          {!isBioEditMode ? (
            <div className="Profile Scene__body__bio__readonly">
              <div className="Profile Scene__body__bio__readonly__header-group profile-flex-flow">
                <div className="Profile Scene__body__bio__header-text section-header padding-center-text">
                  Bio
                </div>
                {isOwnProfile({ userContext, authenticatedUser }) && (
                  <Button
                    type={EButtonType.Edit}
                    editButtonClassNames="smaller-edit-button-icon slim-padding-right"
                    onClick={handleSetBioEditMode}
                  />
                )}
              </div>
              <div className="Profile Scene__body__bio__text">
                {/* {userContext && userContext.bio ? userContext.bio : ""} */}
                {userContext && userContext.bio ? userContext.bio : ""}
              </div>
            </div>
          ) : (
            <div className="Profile Scene__body__header__bio-text-edit">
              <div className="Profile Scene__body__header__bio-text-edit__controls-container flex slight-bottom-margin">
                <Button
                  type={EButtonType.Normal}
                  text="Save"
                  customClassNames="smaller-edit-button-icon slim-padding-right"
                  onClick={() => handlePatchBio("update")}
                />
                <Button
                  type={EButtonType.Normal}
                  text="Cancel"
                  customClassNames="smaller-edit-button-icon slim-padding-right slight-margin-left"
                  customTextClassNames="color-crimson-red"
                  onClick={handleCancelBioEdit}
                />
                <Button
                  type={EButtonType.Normal}
                  text="Delete"
                  customClassNames="smaller-edit-button-icon slim-padding-right slight-margin-left"
                  customTextClassNames="color-crimson-red"
                  onClick={() => handlePatchBio("delete")}
                />
              </div>
              <TextField
                type="text"
                name="bio_text"
                multiLine={true}
                value={editedBioText}
                onChange={handleBioTextChange}
                inputClassNames="responsive-bio-text"
              />
            </div>
          )}
        </div>
        <div className="Profile Scene__body__middle">
          {!isFavoriteFoodsEditMode ? (
            <div className="Profile Scene__body__favorite-foods__readonly">
              <div className="Profile Scene__body__favorite-foods__readonly__header-group profile-flex-flow">
                <div className="Profile Scene__body__favorite-foods__header-text section-header padding-center-text">
                  Favorite Foods
                </div>
                {userContext &&
                  authenticatedUser &&
                  userContext._id === authenticatedUser._id && (
                    <Button
                      type={EButtonType.Edit}
                      editButtonClassNames="smaller-edit-button-icon slim-padding-right"
                      onClick={handleSetFavoriteFoodsEditMode}
                    />
                  )}
              </div>
              <ul className="Profile Scene__body__favorite-foods-list no-list-bullets box-padding no-margin">
                {userContext &&
                  userContext.favoriteFoods &&
                  userContext.favoriteFoods.length > 0 &&
                  userContext.favoriteFoods.map((foodItem) => (
                    <li className="Profile Scene_list-item-favorite-food centered-text">
                      {foodItem}
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="Profile Scene__body__header__favorite-foods-edit">
              <div className="Profile Scene__body__header__favorite-foods-edit__instructions top-bottom-buffer">
                <p>Enter a comma separated list of foods, then click Save </p>
                <p>Tap Delete to clear all foods.</p>
                <p>Tap Cancel to abort</p>
              </div>
              <div className="Profile Scene__body__header__favorite-foods-edit__controls-container flex slight-bottom-margin">
                <Button
                  type={EButtonType.Normal}
                  text="Save"
                  customClassNames="smaller-edit-button-icon slim-padding-right"
                  onClick={() => handlePatchFavoriteFoods("update")}
                />
                <Button
                  type={EButtonType.Normal}
                  text="Cancel"
                  customClassNames="smaller-edit-button-icon slim-padding-right slight-margin-left"
                  customTextClassNames="color-crimson-red"
                  onClick={handleCancelFavoriteFoodsEdit}
                />
                <Button
                  type={EButtonType.Normal}
                  text="Delete"
                  customClassNames="smaller-edit-button-icon slim-padding-right slight-margin-left"
                  customTextClassNames="color-crimson-red"
                  onClick={() => handlePatchFavoriteFoods("delete")}
                />
              </div>
              <TextField
                type="text"
                name="favorite_foods_comma_separated"
                value={commaSeparatedFavoriteFoods}
                onChange={handleCommaSeparatedFavoriteFoodsChange}
              />
            </div>
          )}
        </div>
        <div className="Profile Scene__body__footer">
          <div className="Profile Scene__body__recipes-top__header-text section-header padding-center-text slight-bottom-margin">
            Recipes
          </div>
          <div className="Profile Scene__body__footer__top-four-recipe-container flex-container flex-wrap">
            {userContextRecipes &&
              userContextRecipes.length > 0 &&
              userContextRecipes.slice(0, 4).map((recipeItem) => (
                <RecipeCard
                  id={recipeItem._id}
                  imageUrl={
                    recipeItem.images && recipeItem.images[0]
                      ? recipeItem.images[0].url
                      : ""
                  }
                  isGenericImage={!recipeItem.images || !recipeItem.images[0]}
                  onCardClicked={handleRecipeCardClicked}
                  title={{
                    headerText: `${recipeItem.prepTimeMinutes} min prep | ${recipeItem.cookTimeMinutes} min cook`,
                    bodyText: `${recipeItem.name}`,
                  }}
                />
              ))}
          </div>
          {userContextRecipes && (
            <div className="Profile Scene__body__footer__more-recipes-button bottom-buffer-padding">
              <Button
                type={EButtonType.Normal}
                text="All Recipes..."
                customClassNames="center-on-screen"
                onClick={handleShowMoreRecipes}
              />
            </div>
          )}
        </div>
      </div>
      {isModalOpen &&
        modalType === EModalType.FullRecipeView &&
        userContext &&
        profileContextRecipeId && (
          <div className="modal__main">
            <RecipeScene
              onDismiss={handleCloseFullRecipeView}
              customClassNames="responsive-margining top-margin-padding-px fade-in-animation"
              recipeContextId={profileContextRecipeId}
            />
          </div>
        )}
      {isModalOpen && modalType === EModalType.MoreRecipesList && userContext && (
        <div className="modal__main">
          <UserRecipesList
            onDismiss={() => closeModal()}
            customClassNames="responsive-margining recipe-list-modal-padding top-margin-padding-px fade-in-animation"
            userContext={userContext}
            onItemsDelete={handleRefreshDeletedItems}
          />
        </div>
      )}
      {isModalOpen &&
        modalType === EModalType.MoreProfileSettings &&
        userContext && (
          <div className="modal__main">
            <MoreProfileSettingsModal userContext={userContext} />
          </div>
        )}
    </div>
  );
}

export default ProfileScene;
