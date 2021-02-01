import { RequestHandler } from 'express';

const getAll: RequestHandler = (req, res, next) => {
  const body = req.body;

  res.sendStatus(200);
};

export default getAll;
