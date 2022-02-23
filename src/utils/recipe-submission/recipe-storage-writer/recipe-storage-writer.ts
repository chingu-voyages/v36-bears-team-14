import { IRecipe } from "../../../services/recipe/recipe.types";

export class RecipeStorageIO {
  public static readonly sessionKey = "recipeData";
  private static writeDataWithKeyData = ({ data }: { data: any }): void => {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(data));
  };

  public static writeDataToStorage = ({
    key,
    data,
  }: {
    key: string;
    data: any;
  }) => {
    const recipeInfo = this.getDataFromStorage()!;
    if (!recipeInfo) {
      const recipeKeyValueData = {
        [key]: data,
      };
      this.writeDataWithKeyData({ data: recipeKeyValueData });
    } else {
      const recipeKeyValueData = {
        ...recipeInfo,
        [key]: data,
      };
      this.writeDataWithKeyData({ data: recipeKeyValueData });
    }
  };
  private static getDataFromStorage() {
    try {
      const data = JSON.parse(window.sessionStorage.getItem(this.sessionKey)!);
      return data;
    } catch (exception) {
      console.log("getDataFromStorage:", exception);
      return null;
    }
  }

  public static clearAllData() {
    window.sessionStorage.removeItem(this.sessionKey);
  }

  public static clearDataByKey(key: string) {
    const data = this.getDataFromStorage()!;
    if (data) {
      const updatedData = {
        ...data,
      };
      delete updatedData[key];
      this.writeDataWithKeyData({ data: updatedData });
    }
  }
  public static getDataByKey(key: string): string | object | number | null {
    const recipeInfo = this.getDataFromStorage();
    if (recipeInfo) {
      return recipeInfo[key];
    }
    return null;
  }

  public static writeRecipeData(recipeData: IRecipe) {
    this.writeDataToStorage({ key: "name", data: recipeData.name });
    this.writeDataToStorage({
      key: "description",
      data: recipeData.description,
    });
    this.writeDataToStorage({ key: "_id", data: recipeData._id });
    this.writeDataToStorage({
      key: "cookTimeMinutes",
      data: recipeData.cookTimeMinutes,
    });
    this.writeDataToStorage({
      key: "prepTimeMinutes",
      data: recipeData.prepTimeMinutes,
    });
    this.writeDataToStorage({
      key: "imageUrl",
      data:
        recipeData.images && recipeData.images[0]
          ? recipeData.images[0]
          : { url: "" },
    });
    this.writeDataToStorage({
      key: "ingredients",
      data: recipeData.ingredients,
    });
    this.writeDataToStorage({ key: "directions", data: recipeData.directions });
  }
}
