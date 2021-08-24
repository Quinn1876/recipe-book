export const recipeDocumentToResponse = (recipeDocument: RecipeRow): RecipeResponse => ({
  name: recipeDocument.name,
  ownerId: recipeDocument.owner,
  description: recipeDocument.description,
  ingredients: recipeDocument.ingredients,
  directions: recipeDocument.directions,
  createdAt: recipeDocument.created_at?.getTime() ?? (new Date()).getTime(),
  id: recipeDocument.id,
  image: recipeDocument?.image,
});
