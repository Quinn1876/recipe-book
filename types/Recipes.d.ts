type RecipeId = string;

interface Recipe {
  name: string;
  owner: User;
  description: string;
  ingredients: string[];
  directions: string[];
  createdAt: Date;
  recipeId: RecipeId;
}

interface NewRecipe {
  name: string;
  description: string;
  ingredients: string[];
  directions: string[];
}
