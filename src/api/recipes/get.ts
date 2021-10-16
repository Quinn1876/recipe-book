import { RequestHandler } from 'express';
import db from '../../db';

const get: RequestHandler = (req, res) => {
  const { recipeId } = req.params;
  if (recipeId) {
    db
      .recipe
      .getRecipeById(parseInt(recipeId, 10))
      .then((recipe) => {
        if (recipe) {
          res.status(200);
          // console.log(recipes);
          res.send(recipe);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
};

export default get;
