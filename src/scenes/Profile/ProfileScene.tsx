import "../../components/CommonStyles/scene-style.css";
interface IProfileSceneProps {
  customClassNames?: string;
  onDismiss?: () => void;
}
function ProfileScene(props: IProfileSceneProps) {
  return (
    <div
      className={`Profile Scene__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    ></div>
  );
}

export default ProfileScene;
