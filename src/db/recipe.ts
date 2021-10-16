/* eslint-disable @typescript-eslint/camelcase */
import { Knex } from 'knex';
import { RecipeDatabase, RecipeQuery, RecipeResponse } from 'recipes';

const toDirection = (row: RecipeDatabase.DirectionRow): RecipeResponse.Direction => ({
  id: row.id,
  direction: row.direction,
  directionNumber: row.direction_number
});

const toIngredient = (ingredientRow: RecipeDatabase.IngredientRowWithUnit): RecipeResponse.Ingredient => ({
  id: ingredientRow.id,
  amount: parseFloat(ingredientRow.amount),
  name: ingredientRow.name,
  unit: {
    name: ingredientRow.unit_name,
    id: ingredientRow.unit_id
  },
});

const toGetRecipeResponse = (
  recipeRow: RecipeDatabase.RecipeRow,
  ingredientRows: RecipeDatabase.IngredientRowWithUnit[],
  directionRows: RecipeDatabase.DirectionRow[],
): RecipeResponse.GetRecipeResponse => ({
  id: recipeRow.id,
  ownerId: recipeRow.owner,
  createdAt: recipeRow.created_at,
  description: recipeRow.description,
  directions: directionRows.map(toDirection),
  ingredients: ingredientRows.map(toIngredient),
  name: recipeRow.name,
});

const getRecipesByUserId = (db: Knex) => async (userId: number): Promise<RecipeResponse.GetRecipeResponse[]> => {
  const recipeRows: RecipeDatabase.RecipeRow[] = await db('recipes')
    .where({
      owner: userId,
    });

  return Promise.all(recipeRows.map(async (recipeRow) => {
    const ingredientRows: RecipeDatabase.IngredientRowWithUnit[] = await db('ingredients').join('units', 'ingredients.unit_id', '=', 'units.id').select('ingredients.id as id', 'ingredients.name as name', 'ingredients.amount as amount', 'ingredients.unit_id as unit_id', 'units.name as unit_name').where({ recipe_id: recipeRow.id });
    const directionRows: RecipeDatabase.DirectionRow[] = await db('directions').select('direction').where({ recipe_id: recipeRow.id });
    return toGetRecipeResponse(recipeRow, ingredientRows, directionRows);
  }));
};

const getRecipeById = (db: Knex) => async (recipeId: number): Promise<RecipeResponse.GetRecipeResponse | null> => {
  const recipeRow: RecipeDatabase.RecipeRow = await db('recipes')
    .where({
      id: recipeId,
    })
    .first();
  if (recipeRow) {
    const ingredientRows: RecipeDatabase.IngredientRowWithUnit[] = await db('ingredients').join('units', 'ingredients.unit_id', '=', 'units.id').select('ingredients.id as id', 'ingredients.name as name', 'ingredients.amount as amount', 'ingredients.unit_id as unit_id', 'units.name as unit_name').where({ recipe_id: recipeRow.id });
    const directionRows: RecipeDatabase.DirectionRow[] = await db('directions').where({ recipe_id: recipeRow.id });

    return toGetRecipeResponse(recipeRow, ingredientRows, directionRows);
  }
  return null;
};

const addRecipe = (db: Knex) => async (owner: number, recipe: RecipeQuery.NewRecipeRequest): Promise<RecipeResponse.NewRecipeResponse> => {
  const {
    description,
    directions,
    ingredients,
    name,
  } = recipe;
  const trx = await db.transaction();
  try {
    const [ newRecipeId ] = await trx('recipes').insert({ name, owner, description }).returning('id');
    await trx('ingredients').insert(ingredients.map(
      ({ amount, name, unitId }) => ({ name, amount, recipe_id: newRecipeId, unit_id: unitId,  })
    ));
    await trx('directions').insert(directions.map(
      ({ direction, directionNumber }) => ({ direction, recipe_id: newRecipeId, direction_number: directionNumber })
    ));
    await trx.commit();
    return { id: newRecipeId };
  } catch (err) {
    await trx.rollback();
    console.error('Error Adding Recipe');
    throw err;
  }
};

const updateRecipe = (db: Knex) => async (updatedRecipe: RecipeQuery.UpdateRecipeRequest): Promise<RecipeResponse.UpdateRecipeResponse> => {
  const {
    id,
    directions,
    ingredients,
    description,
    name,
    ownerId,
  } = updatedRecipe;

  const [newIngredients, updatedIngredients]: [RecipeQuery.NewIngredient[], RecipeQuery.UpdatedIngredient[]] = ingredients.reduce((acc, cur) => {
    if ('id' in cur) {
      acc[1].push(cur);
    } else {
      acc[0].push(cur);
    }
    return acc;
  }, [[],[]]);

  const [newDirections, updatedDirections]: [RecipeQuery.NewDirection[], RecipeQuery.UpdatedDirection[]] = directions.reduce((acc, cur) => {
    if ('id' in cur) {
      acc[1].push(cur);
    } else {
      acc[0].push(cur);
    }
    return acc;
  }, [[],[]]);


  const trx = await db.transaction();
  try {
    // Remove Old Ingredients
    const oldIngredients: {id: number}[] = await trx('ingredients').select('id');
    if (oldIngredients.length > 0) {
      const ingredientsToRemove = oldIngredients.map(({ id }) => id).filter((id) => !updatedIngredients.map(({id}) => id).includes(id));
      if (ingredientsToRemove.length > 0) {
        await trx('ingredients').delete().whereIn('id', ingredientsToRemove);
      }
    }

    // Add new Ingredients
    await trx('ingredients').insert(newIngredients.map(
      ({name, unitId, amount }) => ({ name, amount, unit_id: unitId, recipe_id: id})
    ));

    // Update Old Ingredients that didn't get removed
    await Promise.all(updatedIngredients.map(
      ({ amount, id, unitId, name }) => trx('ingredients').where({ id }).update({ amount, name, unit_id: unitId })
    ));

    // Remove Old Directions
    const oldDirections: { id: number }[] = await trx('directions').select('id');
    if (oldDirections.length > 0) {
      const directionsToRemove = oldDirections.map(({ id }) => id).filter((id) => !updatedDirections.map(({id}) => id).includes(id));
      if (directionsToRemove.length > 0){
        await trx('directions').delete().whereIn('id', directionsToRemove);
      }
    }

    // Add new directions
    await trx('directions').insert(newDirections.map(
      ({ direction, directionNumber }) => ({ direction, direction_number: directionNumber, recipe_id: id})
    ));

    // Update Directions that didn't get removed
    await Promise.all(updatedDirections.map(
      ({ id, direction, directionNumber  }) => trx('directions').where({ id }).update({ direction_number: directionNumber, direction })
    ));

    await trx('recipes').where({ id }).update({ description, name, owner: ownerId });

    await trx.commit();
    return getRecipeById(db)(id);
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

const getRecipeOwner = (db: Knex) => async (recipeId: number): Promise<{owner: number}> => db('recipes').select('owner').where({ id: recipeId }).first();

const deleteRecipeWithId = (db: Knex) => async (recipeId: number): Promise<void> => db('recipes').where({ id: recipeId }).del();

export default (db: Knex) => ({
  getRecipesByUserId: getRecipesByUserId(db),
  getRecipeById: getRecipeById(db),
  addRecipe: addRecipe(db),
  updateRecipe: updateRecipe(db),
  getRecipeOwner: getRecipeOwner(db),
  deleteRecipeWithId: deleteRecipeWithId(db),
});
