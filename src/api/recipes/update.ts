import { RequestHandler } from 'express';
import db from '../../db';

const update: RequestHandler = (req, res, next) => {
  const { userId } = req.session;
  const { body: updatedRecipe } = req;
  if (userId) {
    db
      .recipe
      .updateRecipe(updatedRecipe)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
    next();
  }
};

export default update;
