/* eslint-disable @typescript-eslint/camelcase */
import { Knex } from 'knex';
import { RecipeDatabase, RecipeQuery, RecipeResponse } from 'recipes';

const toDirection = (row: RecipeDatabase.DirectionRow): RecipeResponse.Direction => ({
  id: row.id,
  direction: row.direction,
  directionNumber: row.direction_number
});

const toIngredient = (unitRows: RecipeDatabase.UnitRow[]) => (ingredientRow: RecipeDatabase.IngredientRow): RecipeResponse.Ingredient => ({
  id: ingredientRow.id,
  amount: ingredientRow.amount,
  name: ingredientRow.name,
  unit: unitRows.find((unitRow) => ingredientRow.unit_id === unitRow.id ),
});

const toGetRecipeResponse = (
  recipeRow: RecipeDatabase.RecipeRow,
  ingredientRows: RecipeDatabase.IngredientRow[],
  directionRows: RecipeDatabase.DirectionRow[],
  units: RecipeDatabase.UnitRow[]
): RecipeResponse.GetRecipeResponse => ({
  id: recipeRow.id,
  ownerId: recipeRow.owner,
  createdAt: recipeRow.created_at,
  description: recipeRow.description,
  directions: directionRows.map(toDirection),
  ingredients: ingredientRows.map(toIngredient(units)),
  name: recipeRow.name,
});

const getRecipesByUserId = (db: Knex) => async (userId: number): Promise<RecipeResponse.GetRecipeResponse[]> => {
  const recipeRows: RecipeDatabase.RecipeRow[] = await db('recipes')
    .where({
      owner: userId,
    });

  const units = await db('units');
  return await Promise.all(recipeRows.map(async (recipeRow) => {
    const ingredientRows: RecipeDatabase.IngredientRow[] = await db('ingredients').where({ recipe_id: recipeRow.id });
    const directionRows: RecipeDatabase.DirectionRow[] = await db('directions').select('direction').where({ recipe_id: recipeRow.id });
    return toGetRecipeResponse(recipeRow, ingredientRows, directionRows, units);
  }));
};

const getRecipeById = (db: Knex) => async (recipeId: number): Promise<RecipeResponse.GetRecipeResponse> => {
  const recipeRow: RecipeDatabase.RecipeRow = await db('recipes')
    .where({
      id: recipeId,
    })
    .first();
  const ingredientRows: RecipeDatabase.IngredientRow[] = await db('ingredients').where({ recipe_id: recipeRow.id });
  const directionRows: RecipeDatabase.DirectionRow[] = await db('directions').where({ recipe_id: recipeRow.id });
  const units: RecipeDatabase.UnitRow[] = await db('units');

  return toGetRecipeResponse(recipeRow, ingredientRows, directionRows, units);
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
    const { id: newRecipeId } = await trx('recipe').insert({ name, owner, description }).returning('id');
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
    owner,
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
    await db('ingredients').insert(newIngredients.map(
      ({name, unitId, amount, recipeId }) => ({ name, amount, unit_id: unitId, recipe_id: recipeId})
    ));
    await Promise.all(updatedIngredients.map(
      ({ amount, id, unitId, name }) => db('ingredients').where({ id }).update({ amount, name, unit_id: unitId })
    ));

    await db('directions').insert(newDirections.map(
      ({ direction, directionNumber, recipeId }) => ({ direction, direction_number: directionNumber, recipe_id: recipeId})
    ));
    await Promise.all(updatedDirections.map(
      ({ id, direction, directionNumber  }) => db('ingredients').where({ id }).update({ direction_number: directionNumber, direction })
    ));

    await db('recipes').where({ id }).update({ description, name, owner });

    await trx.commit();
    return getRecipeById(db)(id);
  } catch (err) {
    await trx.rollback();
  }
};

export default (db: Knex) => ({
  getRecipesByUserId: getRecipesByUserId(db),
  getRecipeById: getRecipeById(db),
  addRecipe: addRecipe(db),
  updateRecipe: updateRecipe(db)
});
