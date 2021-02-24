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
      .getCookieAuthDocumentBySelector(selector)
      .then((authDocument) => {
        if (authDocument) {
          // Validate validator
          const hashedReqValidator = crypto.createHash('sha256').update(validator).digest();
          if (hashedReqValidator.toString() === authDocument.hashedValidator) {
            if (authDocument.expires.getTime() > Date.now()) {
              // auth complete
              req.session.userId = authDocument.userId.toHexString();
              res.status(200);
              res.send({
                auth: true,
                userId: authDocument.userId.toHexString()
              });
              next();
              return;
            }
            // expired cookie, user should re auth
            db.auth.deleteCookieAuthDocumentByDocumentId(authDocument.id);
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
