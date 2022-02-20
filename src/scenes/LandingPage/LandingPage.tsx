import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RecipeCard from "../../components/RecipeCard";
import {
  getAllRecipesAsync,
  selectRecipes,
  selectRecipeStateStatus,
} from "../../reducers/recipe-slice";
import RecipeScene from "../Recipe";

import "./landing-page-style.css";
import "../../components/CommonStyles/scene-style.css";
import { EStatus } from "../../definitions";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

enum EModalType {
  FullRecipeView = "fullRecipeView",
  CreateRecipeModal = "createRecipeModal",
}
function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EModalType | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const allRecipes = useSelector(selectRecipes, shallowEqual);
  const recipeStateStatus = useSelector(selectRecipeStateStatus, shallowEqual);

  const dispatch = useDispatch();

  const handleRecipeCardClicked = (id: string) => {
    setSelectedRecipeId(id);
    setModalType(EModalType.FullRecipeView);
    setIsModalOpen(true);
  };

  const handleCloseFullRecipeView = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  useEffect(() => {
    dispatch(getAllRecipesAsync({}));
  }, []);
  return (
    <div className="LandingPage__main landing-page-slight-top-bottom-margin">
      {recipeStateStatus && recipeStateStatus.status === EStatus.Loading && (
        <Spinner />
      )}
      {recipeStateStatus && recipeStateStatus.status === EStatus.Error && (
        <ErrorMessage
          text={recipeStateStatus.message || "Error processing this request"}
        />
      )}
      <div className="LandingPage__recipe-card recipe-list-responsive-flex">
        {allRecipes &&
          allRecipes.map((recipeItem) => (
            <RecipeCard
              id={recipeItem._id}
              imageUrl={
                recipeItem.images && recipeItem.images[0]
                  ? recipeItem.images[0].url
                  : ""
              }
              isGenericImage={!recipeItem.images || !recipeItem.images[0]}
              onCardClicked={handleRecipeCardClicked}
              customBodyClassNames={"hover-shake"}
              title={{
                headerText: `${recipeItem.prepTimeMinutes} min prep | ${recipeItem.cookTimeMinutes} min cook`,
                bodyText: `${recipeItem.name}`,
              }}
            />
          ))}
      </div>
      {isModalOpen && (
        <div className="modal__main">
          {modalType === EModalType.FullRecipeView && (
            <RecipeScene
              onDismiss={handleCloseFullRecipeView}
              customClassNames="responsive-margining modal-top-margining fade-in-animation"
              recipeContextId={selectedRecipeId!}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
