import "./banner.css";

interface IBannerProps {
  customClassNames?: string;
  textClassNames?: string;
  titleText: string;
  hasImage?: {
    bannerImageUrl: string;
    imageContainerClassNames?: string;
    imageClassNames?: string;
  };
}
function Banner(props: IBannerProps) {
  return (
    <div
      className={`Banner__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div
        className={`Banner__main__titleText ${
          props.textClassNames ? props.textClassNames : ""
        }`}
      >
        {props.titleText}
      </div>
      {props.hasImage && (
        <div
          className={`Banner__main__bannerImage ${
            props.hasImage.imageContainerClassNames || ""
          }`}
        >
          <img
            className={`Banner__main__bannerImage__image ${
              props.hasImage.imageClassNames || ""
            }`}
            src={props.hasImage.bannerImageUrl}
            alt="banner"
          />
        </div>
      )}
    </div>
  );
}

export default Banner;
