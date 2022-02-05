import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCurrentScene } from "../../reducers/app-slice";
import { setCurrentRecipeContextByIdAsync } from "../../reducers/recipe-slice";
import LoginScene from "../../scenes/Login";
import ProfileScene from "../../scenes/Profile";
import RecipeScene from "../../scenes/Recipe";
import RegistrationScene from "../../scenes/UserRegistration/UserRegistration";
import { EAppScene } from "../../services/app/app.types";
import "./stage-style.css";
// Here is where we load different screens, either modal or "full page under the nav bar"
// We can use a global redux store to keep track of which scene is active at a given time
// We may need to make this into a stack data structure but keep it simple for now

function renderCurrentScene(scene: EAppScene) {
  switch (scene) {
    case EAppScene.Login:
      return <LoginScene />;
    case EAppScene.Register:
      return <RegistrationScene />;
    case EAppScene.RecipeView:
      return <RecipeScene />;
    case EAppScene.Profile:
      return <ProfileScene />;
    default:
      throw new Error(
        "Define your scene in the EAppScene enum and add it to the case"
      );
  }
}
function Stage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setCurrentRecipeContextByIdAsync({ id: "61ea10a5c77c6c737b3e959c" })
    );
  }, []);
  const currentScene = useSelector(selectCurrentScene, shallowEqual);
  return (
    <div className="Stage__main">
      {currentScene && renderCurrentScene(currentScene)}
    </div>
  );
}

export default Stage;
