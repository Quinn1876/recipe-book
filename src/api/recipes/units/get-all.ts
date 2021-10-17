import db from '../../../db';
import { RequestHandler } from 'express';
import { RecipeResponse } from 'recipes';

const getAll: RequestHandler = async (req, res) => {
  try {
    const units = await db.recipe.getUnits();
    if (units) {
      res.status(200);
      res.send(units as RecipeResponse.Unit[]);
    } else {
      res.status(200);
      res.send([]);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export default getAll;
