import { describe, it, before, after, beforeEach } from 'mocha';
import { expect } from 'chai';
import { pathNeedsUserToBeLoggedIn } from '../../src/utils/auth-middleware';

describe('pathNeedsUserToBeLoggedIn', () => {
  it('should return true for /api/recipes', () => {
    const result = pathNeedsUserToBeLoggedIn('/api/recipes');
    expect(result).to.be.true;
  });

  it('should return false for non-api routes', () => {
    const paths = [
      '/sign-in',
      'recipes',
      '/',
      'sign-up',
      '/profile',
    ];
    const result = paths.reduce((accumulator, path) => accumulator || pathNeedsUserToBeLoggedIn(path), false);
    expect(result).to.be.false;
  });
});
