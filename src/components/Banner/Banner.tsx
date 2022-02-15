import { EAppScene } from "../../services/app/app.types";
import ImageUploader from "../ImageUploader";
import "./banner.css";

interface IBannerProps {
  customClassNames?: string;
  textClassNames?: string;
  titleText: string;
  hasSubtitle?: {
    customSubtitleClassNames?: string;
    customSubtitleTextClassNames?: string;
    subtitleText1?: string;
    subtitleText2?: string;
    hasLink?: {
      type: EAppScene;
      userId?: string;
      recipeId?: string;
    };
  };
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
        } ${
          props.titleText.length > 0
            ? "long-text-smaller-font-size"
            : "default-font-size"
        }`}
      >
        {props.titleText}
      </div>
      {props.hasSubtitle && (
        <div
          className={`Banner_main__subtitle__main ${
            props.hasSubtitle && props.hasSubtitle.customSubtitleClassNames
              ? props.hasSubtitle.customSubtitleClassNames
              : ""
          }`}
        >
          <div
            className={`Banner_main__subtitle__text1 ${
              props.hasSubtitle && props.hasSubtitle.hasLink
                ? "Banner_main__subtitle__link"
                : ""
            } ${
              props.hasSubtitle.customSubtitleTextClassNames
                ? props.hasSubtitle.customSubtitleTextClassNames
                : ""
            }`}
          >
            {props.hasSubtitle.subtitleText1}
          </div>
          {props.hasSubtitle.subtitleText2 && (
            <div
              className={`Banner_main__subtitle__text2 ${
                props.hasSubtitle.customSubtitleTextClassNames
                  ? props.hasSubtitle.customSubtitleTextClassNames
                  : ""
              }`}
            >
              {props.hasSubtitle.subtitleText2}
            </div>
          )}
        </div>
      )}
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
