import { RequestHandler } from 'express';
import db from '../../db';
import { isUpdateRecipeRequest } from '../../utils/request-validators';

const update: RequestHandler = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.sendStatus(403);
  } else {
    const { body: updatedRecipe }: { body: unknown } = req;
    if (!isUpdateRecipeRequest(updatedRecipe)){
      res.sendStatus(400);
    } else if (userId !== updatedRecipe.owner){
      res.sendStatus(404);
    } else {
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
    }
  }
};


export default update;
