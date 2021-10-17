import { AuthResponse } from 'auth';
import { RequestHandler } from 'express';
import db from '../../db';
import hashPassword from '../../utils/hash-password';
import { isUserAuthSignInRequest } from '../../utils/request-validators';
import setAuthCookie from '../../utils/set-auth-cookie';

const signIn: RequestHandler = (req, res) => {
  const { body }: { body: unknown } = req;
  if (isUserAuthSignInRequest(body)) {
    const { userName, password: unHashed, remember } = body;
    const password = hashPassword(unHashed);
    db.auth.getUserAuthDocument(userName, password)
      .then((authRow) => {
        if (authRow) {
          // console.log(authRow);
          if (remember) {
            setAuthCookie(authRow.user_id, res)
              .then(() => {
                req.session.userId = authRow.user_id;
                res.status(200);
                res.send({
                  userId: authRow.user_id,
                  authenticated: true,
                } as AuthResponse.AuthSuccess);
              });
          } else {
            req.session.userId = authRow.user_id;
            res.status(200);
            res.send({
              authenticated: true,
              userId: authRow.user_id
            } as AuthResponse.AuthSuccess);
          }
        } else {
          res.status(400);
          res.send({
            authenticated: false,
            message: 'Invalid Username or password',
          } as AuthResponse.AuthFailure);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.send({
          authenticated: false,
          message: 'Unknown Error occurred during attempt at authentication'
        } as AuthResponse.AuthFailure);
      });
  } else {
    res.status(404);
    res.send({
      authenticated: false,
      message: 'Invalid Body',
    } as AuthResponse.AuthFailure);
  }
};

export default signIn;
