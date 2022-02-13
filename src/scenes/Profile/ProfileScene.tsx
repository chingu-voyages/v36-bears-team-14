import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import "../../components/CommonStyles/scene-style.css";
import ImageUploader from "../../components/ImageUploader";
import RecipeCard from "../../components/RecipeCard";
import TextField from "../../components/TextField";
import { selectAuthenticatedUser } from "../../reducers/app-slice";
import { setCurrentRecipeContextByIdAsync } from "../../reducers/recipe-slice";
import {
  patchUserProfileDataAsync,
  selectCurrentUserContext,
  selectCurrentUserContextRecipes,
  setCurrentUserContextRecipes,
} from "../../reducers/user-slice";
import { isURLValid } from "../../utils/string-helpers/validate-url";
import RecipeScene from "../Recipe";

import GenericRacoon from "./generic-racoon.svg";
enum EModalType {
  FullRecipeView = "fullRecipeView",
  MoreRecipesList = "moreRecipesList",
}
interface IProfileSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
}
function ProfileScene(props: IProfileSceneProps) {
  const userContext = useSelector(selectCurrentUserContext, shallowEqual);
  const dispatch = useDispatch();
  const userContextRecipes = useSelector(
    selectCurrentUserContextRecipes,
    shallowEqual
  );
  const authenticatedUser = useSelector(selectAuthenticatedUser, shallowEqual);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);
  const [isBioEditMode, setIsBioEditMode] = useState<boolean>(false);
  const [editedBioText, setEditedBioText] = useState<string>("");

  const [isFavoriteFoodsEditMode, setFavoriteFoodsEditMode] =
    useState<boolean>(false);
  const [commaSeparatedFavoriteFoods, setCommaSeparatedFavoriteFoods] =
    useState<string>("");

  const userHasImage = () => {
    return !!(
      userContext &&
      userContext.photoUrl &&
      isURLValid(userContext.photoUrl)
    );
  };

  const handleBioTextChange = ({ value }: { value: string }) => {
    setEditedBioText(value);
  };

  const handleCancelBioEdit = () => {
    setIsBioEditMode(false);
    if (userContext && userContext.bio) {
      setEditedBioText(userContext?.bio);
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
      // Set some mode
      setCommaSeparatedFavoriteFoods(userContext.favoriteFoods.join(","));
    }
  };

  const handlePatchBio = (action: "update" | "delete") => {
    setIsBioEditMode(false);
    if (userContext && userContext._id) {
      dispatch(
        patchUserProfileDataAsync({
          id: userContext._id,
          bio: { action, data: editedBioText },
        })
      );
    }
  };

  const handlePatchFavoriteFoods = (action: "update" | "delete") => {
    setFavoriteFoodsEditMode(false);
    if (userContext && userContext._id) {
      dispatch(
        patchUserProfileDataAsync({
          id: userContext._id,
          favoriteFoods: {
            action,
            data: commaSeparatedFavoriteFoods.split(","),
          },
        })
      );
    }
  };

  const isOwnProfile = (): boolean => {
    if (
      userContext &&
      authenticatedUser &&
      userContext._id === authenticatedUser._id
    )
      return true;
    return false;
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
      dispatch(setCurrentUserContextRecipes({ user: userContext }));
      setEditedBioText(userContext.bio);
      if (Array.isArray(userContext.favoriteFoods)) {
        setCommaSeparatedFavoriteFoods(userContext.favoriteFoods.join(","));
      }
    }
  }, [userContext]);

  const handleRecipeCardClicked = (recipeId: string) => {
    dispatch(setCurrentRecipeContextByIdAsync({ id: recipeId }));
    setModalType(EModalType.FullRecipeView);
    setIsModalOpen(true);
  };

  const handleCloseFullRecipeView = () => {
    setModalType(null);
    setIsModalOpen(false);

    // Do we want to clear recipe context?
  };

  const handleUpdateProfilePhoto = (url: string) => {
    if (userContext && userContext._id && url) {
      dispatch(
        patchUserProfileDataAsync({
          id: userContext._id,
          photoUrl: {
            action: "update",
            data: url,
          },
        })
      );
    }
  };
  return (
    <div
      className={`Profile Scene__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <Button
        type={EButtonType.Back}
        onClick={() => props.onDismiss && props.onDismiss()}
      />
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
        {isOwnProfile() && (
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
                {isOwnProfile() && (
                  <Button
                    type={EButtonType.Edit}
                    editButtonClassNames="smaller-edit-button-icon slim-padding-right"
                    onClick={handleSetBioEditMode}
                  />
                )}
              </div>
              <div className="Profile Scene__body__bio__text">
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
          {userContextRecipes && userContextRecipes.length > 4 && (
            <div className="Profile Scene__body__footer__more-recipes-button bottom-buffer-padding">
              <Button
                type={EButtonType.Normal}
                text="More Recipes..."
                customClassNames="center-on-screen"
              />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal__main">
          <RecipeScene
            onDismiss={handleCloseFullRecipeView}
            customClassNames="responsive-margining"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileScene;
