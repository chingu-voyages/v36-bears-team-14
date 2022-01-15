import "./recipe-card.css";
import GenericRecipeImage from "./generic-recipe-image.png";
import { getTruncatedString } from "../../utils/string-helpers/get-truncated-string";
import { MAX_RECIPE_BODY_TEXT_LENGTH } from "./definitions";
interface IRecipeCardProps {
  id: string;
  imageUrl: string;
  customBodyClassNames?: string;
  customImageClassNames?: string;
  onCardClicked?: (id: string) => void;
  isGenericImage: boolean;
  title?: {
    headerText?: string;
    bodyText?: string;
    customBodyClassNames?: string;
    customTitleHeaderClassNames?: string;
    customTitleBodyClassNames?: string;
  };
}
function RecipeCard(props: IRecipeCardProps) {
  const cardTitleStyles =
    props.title &&
    props.title.bodyText &&
    props.title.bodyText.length > MAX_RECIPE_BODY_TEXT_LENGTH
      ? "Card__main__title__overflow"
      : "";

  const bodyTextStyles =
    props.title &&
    props.title.bodyText &&
    props.title.bodyText.length > MAX_RECIPE_BODY_TEXT_LENGTH
      ? "Card__main__body-text__overflow"
      : "";

  const truncatedTextBody =
    props.title &&
    props.title.bodyText &&
    props.title.bodyText.length &&
    getTruncatedString({
      text: props.title.bodyText,
      maxLength: MAX_RECIPE_BODY_TEXT_LENGTH,
    });

  return (
    <div
      className={`Card__main ${props.customBodyClassNames || ""} roboto`}
      onClick={() => props.onCardClicked && props.onCardClicked(props.id)}
    >
      <img
        src={props.isGenericImage ? GenericRecipeImage : props.imageUrl}
        alt="card type"
        className={`Card__main__image ${props.customImageClassNames || ""}`}
      ></img>
      {props.title && (
        <div
          className={`Card__main__title__main ${
            props.customBodyClassNames || ""
          } ${cardTitleStyles}`}
        >
          {props.title.headerText && (
            <div
              className={`Card__main__header-text ${
                props.title.customTitleHeaderClassNames || ""
              }`}
            >
              {props.title.headerText}
            </div>
          )}
          {props.title.bodyText && (
            <div
              className={`Card__main__body-text ${
                props.title.customTitleBodyClassNames || ""
              } ${bodyTextStyles}`}
            >
              {truncatedTextBody}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
