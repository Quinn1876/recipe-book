type ObjectIdString = string; // Fields that hold ids in their string format
type PgDate = string;
declare module 'recipes' {
  export namespace RecipeDatabase {
    export interface RecipeRow {
      id:           number;
      name:         string;
      owner:        number;
      description:  string;
      image?:       string;
      created_at:   PgDate;
      updated_at:   PgDate;
    }

    export interface DirectionRow {
      id: number;
      direction: string;
      recipe_id: number;
      direction_number: number;
    }

    export interface UnitRow {
      id: number;
      name: string;
    }

    export interface IngredientRow {
      id: number;
      name: string;
      amount: number;
      unit_id: number;
    }
  }

  export namespace RecipeQuery {

    export interface NewIngredient {
      name:   string;
      amount: number;
      unitId: number;
      recipeId: number;
    }

    export interface UpdatedIngredient extends NewIngredient {
      id: number;
    }

    export interface NewDirection {
      direction:        string;
      directionNumber:  number;
      recipeId:         number;
    }

    export interface UpdatedDirection extends NewDirection {
      id: number;
    }
    export interface NewRecipeRequest {
      name:         string;
      description:  string;
      ingredients:  NewIngredient[];
      directions:   NewDirection[];
    }

    export interface UpdateRecipeRequest {
      id:           number;
      name:         string;
      owner:        number;
      description:  string;
      ingredients:  Array<NewIngredient | UpdatedIngredient>;
      directions:   Array<NewDirection | UpdatedDirection>;
    }
  }

  export namespace RecipeResponse {
    export interface Unit {
      id:   number;
      name: string;
    }
    export interface Ingredient {
      id:     number;
      name:   string;
      unit:   Unit;
      amount: number;
    }

    export interface Direction {
      id:               number;
      direction:        string;
      directionNumber:  number;
    }

    export interface GetRecipeResponse {
      id:             number;
      ownerId:        number;
      name:           string;
      description:    string;
      ingredients:    Ingredient[];
      directions:     Direction[];
      createdAt:      string;
      image?:         string;
    }

    export interface NewRecipeResponse {
      id: number;
    }

    export type UpdateRecipeResponse = GetRecipeResponse;
  }
}


