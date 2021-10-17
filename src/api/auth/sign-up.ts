import { AuthResponse } from 'auth';
import { RequestHandler } from 'express';
import db from '../../db';
import hashPassword from '../../utils/hash-password';
import { isUserAuthSignUpRequest } from '../../utils/request-validators';

const signUp: RequestHandler = async (req, res) => {
  const { body }: { body: unknown } = req;
  if (isUserAuthSignUpRequest(body)) {
    const { userName, password: unHashed, name } = body;
    try {
      const userNameExists = await db
        .auth
        .doesUserNameExist(userName);
      if (userNameExists) {
        res.status(400);
        res.send({ message: 'Username Already Exists', accountCreated: false } as AuthResponse.AuthSignUpFailure);
      } else {
        const user = await db
          .user
          .addUser({ name });
        console.log('user', user);
        const hashedPassword = hashPassword(unHashed);
        const userAuthRow = await db
          .auth
          .createUserAuth(
            user.id,
            userName,
            hashedPassword
          );
        req.session.userId = userAuthRow.user_id;
        res.status(200);
        res.send({
          accountCreated: true,
          userId: userAuthRow.user_id,
        } as AuthResponse.UserAuthSignUpSuccess);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({ accountCreated: false, message: 'An Unknown Error Occurred '} as AuthResponse.AuthSignUpFailure);
    }
  } else {
    res.status(404);
    res.send({ accountCreated: false, message: 'Invalid Body' } as AuthResponse.AuthSignUpFailure);
  }
};

export default signUp;
