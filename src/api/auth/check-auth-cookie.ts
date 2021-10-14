import { RequestHandler } from 'express';
import db from '../../db';
import crypto from 'crypto';

const checkAuthCookie: RequestHandler = (req, res, next) => {
  // Check if user is logged in
  const { token } = req.cookies;
  if (token && token !== '') {
    const [selector, validator] = token.split(':');
    db
      .auth
      .getCookieAuthBySelector(selector)
      .then((authDocument) => {
        if (authDocument) {
          // Validate validator
          const hashedReqValidator = crypto.createHash('sha256').update(validator).digest();
          if (hashedReqValidator.toString() === authDocument.hashed_validator) {
            if (new Date(authDocument.expires).getTime() > Date.now()) {
              // auth complete
              req.session.userId = authDocument.user_id;
              res.status(200);
              res.send({
                auth: true,
                userId: authDocument.user_id
              });
              next();
              return;
            }
            // expired cookie, user should re auth
            db.auth.deleteCookieAuthById(authDocument.id);
            throw new Error('Token expired, please log in again');
          } else {
            console.log('Invalide validator');
            throw new Error('No Auth');
          }
        } else {
          console.log('No Auth Document');
          throw new Error('No Auth');
        }
      })
      .catch((e) => {
        res.statusCode = 401;
        res.cookie('token', '', { httpOnly: true, });
        next(e.toString());
      });
  } else {
    res.statusCode = 401;
    next('No Auth');
  }
  return;
};


export default checkAuthCookie;
