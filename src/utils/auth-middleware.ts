import {Request, Response, NextFunction} from 'express';

export const API_REGEX = /\/api.*/;
export const API_AUTH_REGEX = /\/api\/auth\/(sign-in|sign-up)\/?/;

/// Check that the route is an api route
/// If the route matches API_AUTH_REGEX,
/// then it does not need to be validated because the user uses
/// these routes to log in or make an account
export const pathNeedsUserToBeLoggedIn = (path: string): boolean => {
  const routeIsApiMatch: RegExpMatchArray | null = path.match(API_REGEX);
  const routeIsApiAuthMatch: RegExpMatchArray | null = path.match(API_AUTH_REGEX);

  return routeIsApiMatch !== null && routeIsApiAuthMatch === null;
};

const checkUserLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  // console.log('Checking that user is logged in');
  const {
    path,
    session: { userId }
  } = req;

  if (pathNeedsUserToBeLoggedIn(path)) {
    if (userId) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    next();
  }
};

export const authMiddleware = {
  checkUserLoggedIn
};
