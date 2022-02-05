import { shallowEqual, useSelector } from "react-redux";
import Banner from "../../components/Banner";
import "../../components/CommonStyles/scene-style.css";
import { selectCurrentUserContext } from "../../reducers/user-slice";
import { isURLValid } from "../../utils/string-helpers/validate-url";

import GenericRacoon from "./generic-racoon.svg";
import GenericCat from "./grumpy-cat.svg";
interface IProfileSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
}
function ProfileScene(props: IProfileSceneProps) {
  const userContext = useSelector(selectCurrentUserContext, shallowEqual);
  const userHasImage = () => {
    return !!(
      userContext &&
      userContext.photoUrl &&
      isURLValid(userContext.photoUrl)
    );
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
    </div>
  );
}

export default ProfileScene;
