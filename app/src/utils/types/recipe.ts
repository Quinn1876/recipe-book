export const isRecipe = (object: any): object is Recipe => (
  'name' in object
  && 'ownerId' in object
  && 'ownerName' in object
  && 'description' in object
  && 'ingredients' in object
  && 'directions' in object
  && 'createdAt' in object
  && 'recipeId' in object
);
