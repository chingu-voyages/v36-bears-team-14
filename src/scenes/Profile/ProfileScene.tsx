import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import "../../components/CommonStyles/scene-style.css";
import RecipeCard from "../../components/RecipeCard";
import { selectAuthenticatedUser } from "../../reducers/app-slice";
import {
  selectCurrentUserContext,
  selectCurrentUserContextRecipes,
  setCurrentUserContextRecipes,
} from "../../reducers/user-slice";
import { isURLValid } from "../../utils/string-helpers/validate-url";

import GenericRacoon from "./generic-racoon.svg";
// import GenericCat from "./grumpy-cat.svg";
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
  const [isBioEditMode, setIsBioEditMode] = useState<boolean>(false);

  const userHasImage = () => {
    return !!(
      userContext &&
      userContext.photoUrl &&
      isURLValid(userContext.photoUrl)
    );
  };

  useEffect(() => {
    if (userContext) {
      dispatch(setCurrentUserContextRecipes({ user: userContext }));
    }
  }, []);

  const handleRecipeCardClicked = (recipeId: string) => {
    // do something
    console.log(`Recipe with id ${recipeId} clicked`);
  };
  return (
    <div
      className={`Profile Scene__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div className="Profile Scene__back">{`< Back`}</div>
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
      <div className="Profile Scene__body top-margin-padding">
        <div className="Profile Scene__body__header">
          {!isBioEditMode ? (
            <div className="Profile Scene__body__header__bio-text">
              {userContext && userContext.bio ? userContext.bio : ""}
            </div>
          ) : (
            // {/* We want to have an edit button if user is viewing own profile */}
            <div className="Profile Scene__body__header__bio-text-edit">
              {/* Editable text area field */}
            </div>
          )}
        </div>
        <div className="Profile Scene__body__middle flex-responsive-middle">
          <div className="Profile Scene__body__favorite-foods-title">
            Favorite Foods
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
        <div className="Profile Scene__body__footer">
          <div className="Profile Scene__body__footer__top-four-recipe-container flex-container">
            {userContextRecipes &&
              userContextRecipes.length > 0 &&
              userContextRecipes.slice(0, 3).map((recipeItem) => (
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
        </div>
      </div>
    </div>
  );
}

export default ProfileScene;
