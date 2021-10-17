import { RequestHandler } from 'express';
import db from '../../db';
import { isNewRecipeRequest } from '../../utils/request-validators';

const add: RequestHandler = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.sendStatus(500);
    return;
  }
  const { body }: { body: unknown } = req;
  if (isNewRecipeRequest(body)) {
    db.recipe
      .addRecipe(userId, body)
      .then((newRecipeResponse) => {
        res.status(200);
        res.send(newRecipeResponse);
        console.log(newRecipeResponse);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
};

export default add;
