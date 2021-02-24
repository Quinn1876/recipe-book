import { RequestHandler } from 'express';
import db from '../../db';
import hashPassword from '../../utils/hash-password';
import setAuthCookie from '../../utils/set-auth-cookie';

const signIn: RequestHandler = (req, res, next) => {
  const { userName, password: unHashed, remember }: SignInBody = req.body;
  const password = hashPassword(unHashed);
  db.auth.getUserAuthDocument({ userName, hashedPassword: password})
    .then((authDocument) => {
      if (authDocument) {
        if (remember) {
          setAuthCookie(authDocument.userId, res)
            .then(() => {
              req.session.userId = authDocument.userId.toHexString();
              res.status(200);
              res.send({
                userId: authDocument.userId.toHexString(),
                auth: true,
              } as AuthResponse);
            });
        } else {
          req.session.userId = authDocument.userId.toHexString();
          res.status(200);
          res.send({
            auth: true,
            userId: authDocument.userId.toHexString()
          } as AuthResponse);
        }
      } else {
        res.status(400);
        next('Invalid username or password');
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

export default signIn;
