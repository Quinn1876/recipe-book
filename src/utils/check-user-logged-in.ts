import {Request, Response, NextFunction} from 'express';

export const API_REGEX = /\/api*/;
export const API_AUTH_REGEX = /\/api\/auth\/(sign-in|sign-up)*/;

/// Check that the route is an api route
/// If the route matches API_AUTH_REGEX,
/// then it does not need to be validated because the user uses
/// these routes to log in or make an account
const pathNeedsValidation = (path: string): boolean => path.match(API_REGEX).length > 0 && path.match(API_AUTH_REGEX).length === 0;

export const checkUserLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  const {
    path,
    session: { userId }
  } = req;
  if (pathNeedsValidation(path)) {
    if (userId) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    next();
  }
};
