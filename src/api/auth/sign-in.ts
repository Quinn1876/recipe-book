import { AuthResponse } from 'auth';
import { RequestHandler } from 'express';
import db from '../../db';
import hashPassword from '../../utils/hash-password';
import { isUserAuthSignInRequest, isGoogleAuthSignInRequest } from '../../utils/request-validators';
import setAuthCookie from '../../utils/set-auth-cookie';

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
          message: 'Unknown Error occurred during attempt at user authentication'
        } as AuthResponse.AuthFailure);
      });
  } else if (isGoogleAuthSignInRequest(body)) {
    const {
      idToken
    } = body;
    client
      .verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        const {
          sub: googleId,
          email,
          family_name: familyName,
          given_name: givenName,
          email_verified: emailVerified,
        } = payload;

        if (!emailVerified) {
          res.status(403);
          res.send({
            authenticated: false,
            message: 'Google Email is not Verified',
          } as AuthResponse.AuthFailure);
          return;
        }

        // Check if the user's googleId exists
        db.auth.getUserByGoogleId(googleId)
          .then((row) => {
            if (row) {
              // User exists
              req.session.userId = row.user_id;
              res.status(200);
              res.send({
                userId: row.user_id,
                authenticated: true,
              } as AuthResponse.AuthSuccess);
            } else {
              // User does not exist
              db.auth.createNewGoogleUser(googleId, givenName)
                .then((userId) => {
                  if (userId) {
                    res.status(200);
                    res.send({
                      userId: row.user_id,
                      authenticated: true,
                    } as AuthResponse.AuthSuccess);
                  } else {
                    res.status(500);
                    res.send({
                      authenticated: false,
                      message: 'Issue Creating New Google User'
                    } as AuthResponse.AuthFailure);
                  }
                });
            }
          });

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
