import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type ObjectIdString = string; // Fields that hold ids in their string format

declare global {

  type RecipeId = ObjectIdString;

  export interface Recipe {
    name:         string;
    description:  string;
    ingredients:  string[];
    directions:   string[];
    createdAt:    Date;
    owner:        ObjectId;
    _id:          ObjectId;
    image?:       string;
  }

  export interface RecipeDocument extends Recipe, Document {}

  export interface RecipeResponse {
    name:           string;
    description:    string;
    ingredients:    string[];
    directions:     string[];
    createdAt:      number;
    ownerId:        ObjectIdString;
    id:             ObjectIdString;
    image?:          string;
  }

  export interface NewRecipeRequest {
    name:         string;
    description:  string;
    ingredients:  string[];
    directions:   string[];
  }

  export interface UpdateRecipeRequest extends NewRecipeRequest {
    id: ObjectIdString;
  }

  export interface NewRecipe {
    recipe:   NewRecipeRequest;
    owner:  ObjectId;
  }

  export interface NewRecipeResponse {
    id: ObjectIdString;
  }

}


