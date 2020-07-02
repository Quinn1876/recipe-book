
type RecipeId = string;

function isRecipe(object: any): object is Recipe {
  return (
    'name' in object
    && 'ownerId' in object
    && 'ownerName' in object
    && 'description' in object
    && 'ingredients' in object
    && 'directions' in object
    && 'createdAt' in object
    && 'recipeId' in object
  );
}

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
