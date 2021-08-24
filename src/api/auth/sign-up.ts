import { RequestHandler } from 'express';
import db from '../../db';
import hashPassword from '../../utils/hash-password';

const signUp: RequestHandler = (req, res, next) => {
  const { userName, password: unHashed, name }: SignUpBody = req.body;
  db
    .auth
    .doesUserNameExist(userName)
    .then((exists) => {
      if (exists) {
        res.status(400);
        res.send('Username Already Exists');
        next();
      }
      return db
        .user
        .addUser({ name });
    })
    .then((user) => {
      console.log(user);
      const hashedPassword = hashPassword(unHashed);
      return db
        .auth
        .createUserAuth({
          userName,
          userId: user.id,
          hashedPassword
        });
    })
    .then((userAuthDocument) => {
      req.session.userId = userAuthDocument.userId;
      res.status(200);
      res.send({
        auth: true,
        userId: userAuthDocument.userId,
      } as AuthResponse);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export default signUp;
