import { RequestHandler } from 'express';
import db from '../db';
import crypto from 'crypto';

const checkAuthCookie: RequestHandler = (req, res, next) => {
  // Check if user is logged in
  try {
    if (req.session.userId) {
      const userId = req.session.userId;
      // update or create auth cookie
    } else {
      const { token } = req.cookies;
      if (token) {
        const [selector, validator] = token.split(':');
        db
          .auth
          .getAuthDocumentBySelector(selector)
          .then((authDocument) => {
            // Validate validator
            const hashedReqValidator = crypto.createHash('sha256').update(validator).digest();
            if (hashedReqValidator.toString() === authDocument.hashedValidator
            && authDocument.expires.getTime() > Date.now()) {
              // auth complete
              // TODO Update expiration date
              req.session.userId = authDocument.userId.toHexString();
              next();
            }
          });
      }
    }
  } catch (e) {
    const err = 'No Auth';
    res.statusCode = 401;
    next(err);
  }
};


export default checkAuthCookie;
