
type RecipeId = string;

interface Recipe {
  name: string,
  ownerId: string,
  ownerName: string,
  description: string,
  ingredients: Ingredient[],
  directions: string[],
  createdAt: Date,
  recipeId: RecipeId,
}

interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

interface NewRecipe {
  name: string,
  description: string,
  ingredients: Ingredient[],
  directions: string[],
}
