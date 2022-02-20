import { useSelector, shallowEqual } from "react-redux";
import Button from "../../components/Button";
import { EButtonType } from "../../components/Button/Button";
import "../../components/CommonStyles/scene-style.css";
import "./user-recipes-list-style.css";
import { selectAuthenticatedUser } from "../../reducers/app-slice";

import { IRecipe } from "../../services/recipe/recipe.types";
import { formatDate } from "../../utils/date-helpers/format-date";
import { useEffect, useState } from "react";
import { TSecureUser } from "../../services/user/user.types";
import { getAllRecipesForUserId } from "../../services/user/user.service";
import { deleteRecipesByArrayOfIds } from "../../services/recipe/recipe.service";
import ErrorMessage from "../../components/ErrorMessage";

interface IUserRecipesListProps {
  customClassNames?: string;
  onDismiss: () => void;
  userContext: TSecureUser;
  onItemsDelete?: () => void;
}

interface IRecipeTableProps {
  customClassNames?: string;
  editable: boolean;
}

interface IRecipeTableRowProps {
  customClassNames?: string;
  editable: boolean;
  onDeleteClicked?: ({ recipeId }: { recipeId: string }) => void;
  checked?: boolean;
  recipeData: IRecipe;
}

interface IRecipeTableHeaderProps {
  customClassNames?: string;
  editable: boolean;
}

function RecipeItemRow(props: IRecipeTableRowProps) {
  const handleDeleteClicked = () => {
    props.onDeleteClicked &&
      props.onDeleteClicked({ recipeId: props.recipeData._id });
  };
  return (
    <tr>
      <td>
        {props.editable && (
          <Button
            type={EButtonType.Normal}
            onClick={handleDeleteClicked}
            customTextClassNames="color-crimson-red"
            text="Delete"
          />
        )}
      </td>
      <td className="td-recipe-name">{props.recipeData.name}</td>
      <td className="td-recipe-createdAt flex-font-size">
        {formatDate(props.recipeData.createdAt.toString())}
      </td>
      <td>
        {props.recipeData.likes
          ? Object.keys(props.recipeData.likes).length.toString()
          : 0}
      </td>
    </tr>
  );
}

function RecipeTableHeader(props: IRecipeTableHeaderProps) {
  return (
    <tr>
      <th></th>
      <th>Recipe Name</th>
      <th>Created at</th>
      <th>Likes</th>
    </tr>
  );
}

function UserRecipesList(props: IUserRecipesListProps) {
  const [userContextRecipes, setUserContextRecipes] = useState<IRecipe[]>([]);
  const authenticatedUser = useSelector(selectAuthenticatedUser, shallowEqual);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const handleDeleteRecipes = async ({ recipeId }: { recipeId: string }) => {
    try {
      const result = await deleteRecipesByArrayOfIds({ recipeIds: [recipeId] });
      if (result) {
        setUserContextRecipes(result);
        props.onItemsDelete && props.onItemsDelete();
      }
    } catch (exception) {
      console.log("Unable to delete recipe by Id");
    }
  };

  const isEditable = () => {
    if (props.userContext && authenticatedUser) {
      if (props.userContext._id === authenticatedUser._id) return true;
    }
    return false;
  };

  useEffect(() => {
    const getUserContextRecipes = async () => {
      try {
        if (props.userContext) {
          const recipes = await getAllRecipesForUserId({
            userId: props.userContext._id,
          });
          setUserContextRecipes(recipes);
        }
      } catch (exception) {
        setHasError(true);
        setErrorText(
          `Unable to fetch complete list of recipes for user id ${exception}`
        );
      }
    };
    getUserContextRecipes();
  }, []);

  function RecipeTable(tableProps: IRecipeTableProps) {
    return (
      <>
        {hasError && errorText && <ErrorMessage text={errorText} />}
        <table
          className={`Profile__MoreRecipes__main__body__table ${
            tableProps.customClassNames ? tableProps.customClassNames : ""
          }`}
        >
          <RecipeTableHeader editable={tableProps.editable} />
          {userContextRecipes &&
            userContextRecipes.length > 0 &&
            userContextRecipes.map((recipeItem) => (
              <RecipeItemRow
                recipeData={recipeItem}
                editable={tableProps.editable}
                onDeleteClicked={handleDeleteRecipes}
              />
            ))}
        </table>
      </>
    );
  }

  return (
    <div
      className={`Profile__MoreRecipes__main white-background ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <Button
        type={EButtonType.Back}
        onClick={() => props.onDismiss && props.onDismiss()}
      />
      <div className="Profile__MoreRecipes__main__body__main">
        <div className="Profile__MoreRecipes__main__body__recipeCount">
          {userContextRecipes && `${userContextRecipes.length} recipes found`}
        </div>
        <div className="Profile__MoreRecipes__main__body__TableContainer">
          <RecipeTable
            editable={isEditable()}
            customClassNames="table-border customized-table"
          />
        </div>
      </div>
    </div>
  );
}

export default UserRecipesList;
