import { RequestHandler } from 'express';
import db from '../../db';

const del: RequestHandler = async (req, res) => {
  const { id: stringId } = req.params;
  const recipeId = parseInt(stringId, 10);
  const { session: { userId } } = req;
  try {
    const { owner } = await db.recipe.getRecipeOwner(recipeId);
    console.log('owner: ', owner);
    console.log('userID', userId);
    if (owner !== userId) {
      res.sendStatus(404); // User does not own recipe
    } else {
      db
        .recipe
        .deleteRecipeWithId(recipeId)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

export default del;
