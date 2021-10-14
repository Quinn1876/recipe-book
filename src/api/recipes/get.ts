import { RequestHandler } from 'express';
import { recipeDocumentToResponse } from '../../utils/document-to-response';
import db from '../../db';

const get: RequestHandler = (req, res, next) => {
  const { recipeId } = req.params;
  if (recipeId) {
    db
      .recipe
      .getRecipeById(parseInt(recipeId, 10))
      .then((recipe) => {
        if (recipe) {
          res.status(200);
          // console.log(recipes);
          res.send(recipeDocumentToResponse(recipe));
        } else {
          res.sendStatus(400);
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
};

export default get;
