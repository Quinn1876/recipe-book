import { RequestHandler } from 'express';
import db from '../../db';

const getAll: RequestHandler = (req, res) => {
  const { userId } = req.session;
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
};

export default getAll;
