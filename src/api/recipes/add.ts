import { RequestHandler } from 'express';
import db from '../../db';
import { isNewRecipeRequest } from '../../utils/request-validators';

const add: RequestHandler = (req, res) => {
  const { userId } = req.session;
  const { body }: { body: NewRecipeRequest } = req;
  if (isNewRecipeRequest(body)) {
    const newRecipe: NewRecipe = {
      recipe: body,
      owner: userId,
    };

    db.recipe
      .addRecipe(newRecipe)
      .then((recipeDocument) => {
        const response: NewRecipeResponse = {
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
