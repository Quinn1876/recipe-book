import crypto from 'crypto';

const hashPassword = (unhashed: string): string => crypto.createHash('sha256')
  .update(unhashed)
  .digest()
  .toString();

export default hashPassword;
