
interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

interface Recipe {
  name: string,
  ownerId: string,
  ownerName: string,
  description: string,
  ingredients: Ingredient[],
  directions: string[],
  createdAt: Date,
  recipeId: string,
}

interface NewRecipe {
  name: string,
  description: string,
  ingredients: Ingredient[],
  directions: string[],
}
