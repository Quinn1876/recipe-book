import { RequestHandler } from 'express';
import { RecipeResponse } from 'recipes';
import db from '../../db';
import { isNewRecipeRequest } from '../../utils/request-validators';

const add: RequestHandler = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.sendStatus(403);
    return;
  }
  const { body }: { body: unknown } = req;
  if (isNewRecipeRequest(body)) {
    db.recipe
      .addRecipe(userId, body)
      .then((recipeDocument) => {
        const response: RecipeResponse.NewRecipeResponse = {
          id: recipeDocument.id,
        };
        res.status(200);
        res.send(response);
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
