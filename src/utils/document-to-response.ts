export const recipeDocumentToResponse = (recipeDocument: RecipeDocument): RecipeResponse => ({
  name: recipeDocument.name,
  ownerId: recipeDocument.owner.toHexString(),
  description: recipeDocument.description,
  ingredients: recipeDocument.ingredients,
  directions: recipeDocument.directions,
  createdAt: recipeDocument.createdAt?.getTime() ?? (new Date()).getTime(),
  id: recipeDocument.id,
  image: recipeDocument?.image,
});
