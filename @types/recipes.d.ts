type ObjectIdString = string; // Fields that hold ids in their string format
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
      amount: string; // Decimal is returned as a number. We will parse it into a float before returning it
      unit_id: number;
      recipe_id: number;
    }

    export interface IngredientRowWithUnit extends IngredientRow {
      unit_name: string;
    }
  }

  export namespace RecipeQuery {

    export type NewIngredient = Omit<RecipeResponse.Ingredient, 'id'>

    export type UpdatedIngredient = RecipeResponse.Ingredient;

    export type NewDirection = Omit<RecipeResponse.Direction, 'id'>

    export type UpdatedDirection = RecipeResponse.Direction;
    export interface NewRecipeRequest {
      name:         string;
      description:  string;
      ingredients:  NewIngredient[];
      directions:   NewDirection[];
      image?:       string;
    }

    export interface UpdateRecipeRequest {
      id:           number;
      name:         string;
      ownerId:        number;
      description:  string;
      image?:       string;
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


