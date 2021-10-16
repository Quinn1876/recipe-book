import { RequestHandler } from 'express';
import db from '../../db';
import { isUpdateRecipeRequest } from '../../utils/request-validators';

const update: RequestHandler = async (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.sendStatus(403);
  } else {
    const { body: updatedRecipe }: { body: unknown } = req;
    if (!isUpdateRecipeRequest(updatedRecipe)){
      res.sendStatus(400);
    } else {
      try {
        const { owner: ownerId} = await db.recipe.getRecipeOwner(updatedRecipe.id);
        console.log(ownerId);
        if (ownerId !== userId) {
          res.sendStatus(404);
          return;
        }
        db
          .recipe
          .updateRecipe(updatedRecipe)
          .then((response) => {
            res.status(200);
            res.send(response);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
      } catch (err) {
        console.log('Recipe with id', updatedRecipe.id, 'not found');
        res.sendStatus(400);
      }
    }
  }
};


export default update;
