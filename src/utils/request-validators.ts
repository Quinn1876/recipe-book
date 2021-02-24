export function isNewRecipeRequest(object: object): object is NewRecipeRequest {
  return (
    'name' in object
    && 'description' in object
    && 'ingredients' in object
    && 'directions' in object
  );
}
