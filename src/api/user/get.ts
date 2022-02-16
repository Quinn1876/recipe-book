import { RequestHandler } from 'express';
import db from '../../db';

const get: RequestHandler = async (req, res) => {
  const {
    session: {
      userId
    }
  } = req;

  if (!userId) {
    res.status(404);
    res.send({
      message: 'User Unavailable',
    });
    return;
  }
  try {
    const user = await db.user.getUserById(userId);
    if (!user) {
      res.status(404);
      res.send({
        message: 'User Unavailable',
      });
      return;
    }
    res.status(200);
    res.send(user);
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
};

export default get;
