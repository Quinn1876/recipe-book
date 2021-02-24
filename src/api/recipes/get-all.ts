import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { recipeDocumentToResponse } from '../../utils/document-to-response';
import db from '../../db';

const getAll: RequestHandler = (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    db
      .recipe
      .getRecipesByUserId(new ObjectId(userId))
      .then((recipes) => {
        res.status(200);
        res.send(recipes.map(recipeDocumentToResponse));
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
    next();
  }
};

export default getAll;
