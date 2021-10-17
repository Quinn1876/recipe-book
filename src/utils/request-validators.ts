/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeQuery } from 'recipes';
import { AuthQuery } from 'auth';


export function isNewIngredient(object: any): object is RecipeQuery.NewIngredient {
  return (
    'name' in object
    && 'amount' in object
    && 'unit' in object
  );
}

export function isNewDirection(object: any): object is RecipeQuery.NewDirection {
  return (
    'direction' in object
    && 'directionNumber' in object
  );
}

export function isNewRecipeRequest(object: any): object is RecipeQuery.NewRecipeRequest {
  return (
    'name' in object
    && 'description' in object
    && 'ingredients' in object
    && 'directions' in object
  )&& (
    object.ingredients.reduce((acc: boolean, cur: unknown) => {
      if (isNewIngredient(cur)) {
        return acc && true;
      } else {
        return false;
      }
    }, true)
  ) && (
    object.directions.reduce((acc: boolean, cur: unknown) => {
      if(isNewDirection(cur)) {
        return acc && true;
      } else {
        return false;
      }
    }, true)
  );
}

export function isUpdateRecipeRequest(object: any): object is RecipeQuery.UpdateRecipeRequest {
  return (
    'id' in object
    && 'name' in object
    && 'ownerId' in object
    && 'description' in object
    && 'ingredients' in object
    && 'directions' in object
  ) && (
    object.ingredients.reduce((acc: boolean, cur: unknown) => {
      if (isNewIngredient(cur)) {
        return acc && true;
      } else {
        return false;
      }
    }, true)
  ) && (
    object.directions.reduce((acc: boolean, cur: unknown) => {
      if(isNewDirection(cur)) {
        return acc && true;
      } else {
        return false;
      }
    }, true)
  );
}

export function isUserAuthSignInRequest(object: any): object is AuthQuery.UserAuthSignInRequest {
  return (
    'userName' in object
    && 'password' in object
  );
}

export function isUserAuthSignUpRequest(object: any): object is AuthQuery.UserAuthSignUpRequest {
  return (
    'userName' in object
    && 'password' in object
    && 'name' in object
  );
}

export function isGoogleAuthSignInRequest(object: any): object is AuthQuery.GoogleAuthSignInRequest {
  return (
    'type' in object && object['type'] === 'GOOGLE_AUTH'
  );
}
