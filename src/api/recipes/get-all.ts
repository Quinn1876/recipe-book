import { RequestHandler } from 'express';
import db from '../../db';

const getAll: RequestHandler = (req, res) => {
  const { userId } = req.session;
  if (userId) {
    db
      .recipe
      .getRecipesByUserId(userId)
      .then((recipes) => {
        // console.log(recipes);
        res.status(200);
        res.send(recipes);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
};

export default getAll;
