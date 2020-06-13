
export interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

export interface Recipe {
 name: string,
 ownerId: string,
 ownerName: string,
 description: string,
 ingredients: Ingredient[],
 directions: string[],
 createdAt: Date,
 recipeId: string,
}

export interface NewRecipe {
  name: string,
  description: string,
  ingredients: Ingredient[],
  directions: string[],
}
