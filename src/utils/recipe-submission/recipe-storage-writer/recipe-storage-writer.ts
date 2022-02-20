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
    return JSON.parse(window.sessionStorage.getItem(this.sessionKey)!);
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
}
