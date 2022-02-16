import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseTimeForResponse, parseTimeFromRequest } from '../../src/utils/db-dates';

describe('db-dates utility', () => {
  it('should be able to convert a data to a db string and back again', () => {
    const date = Date.now();

    expect(parseTimeForResponse(parseTimeFromRequest(date))).to.eq(date);
  });
});
