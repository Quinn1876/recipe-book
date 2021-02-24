import { Response } from 'express';
import mongoose from 'mongoose';
import db from '../db';
import crypto from 'crypto';

const setAuthCookie = async (userId: mongoose.Types.ObjectId, res: Response): Promise<boolean> => {
  const selector = crypto
    .randomBytes(12)
    .toString();
  const validator = crypto.randomBytes(64).toString();
  const hashedValidator = crypto.createHash('sha256').update(validator).digest().toString();

  const cookieAuthDocument = await db
    .auth
    .createCookieAuthDocumentForUserId({
      hashedValidator,
      selector,
      userId
    });

  if (cookieAuthDocument) {
    res.cookie('token', `${selector}:${validator}`, { httpOnly: true });
    return true;
  }
  return false;
};

export default setAuthCookie;
