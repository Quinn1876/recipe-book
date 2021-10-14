import { config as dotEnvConfig } from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';
import { db as knex } from '../../src/db';
import server from '../../src';
import sinon from 'sinon';
import * as authMiddleWare from '../../src/utils/check-user-logged-in';

chai.use(chaiHttp);
dotEnvConfig();

sinon.stub(authMiddleWare, 'checkUserLoggedIn').callsFake(async (req, res, next) => {
  const { userId } = await knex('users').select('id as userId').first();
  req.session.userId = userId;
  next();
});

// const cookie = mockSession()

describe('Recipe Api Endpoints', () => {

  before('migrate database', async function () {
    this.timeout(10000); // Give it time to migrate, docker can be slow :(
    await knex.migrate.rollback();
    return knex.migrate.latest();
  });

  beforeEach('seed', async function () {
    this.timeout(1000);
    await knex.seed.run();
  });

  after('rollback', async function () {
    this.timeout(10000); // Give it time to migrate, docker can be slow :(
    await knex.migrate.rollback();
  });

  describe('GET /api/recipes', () => {

    it('should return a list of recipes for a user', async () => {
      const res = await chai
        .request(server)
        .get('/api/recipes');

      expect(res).to.have.status(200);
      res.body.forEach((recipe) => {
        expect(recipe).to.have.keys([
          'id',
          'ownerId',
          'name',
          'description',
          'ingredients',
          'directions',
          'createdAt',
        ]);
        recipe.ingredients.forEach((ingredient) => {
          expect(ingredient).to.have.keys([
            'id',
            'name',
            'amount',
            'unit'
          ]);
          expect(ingredient.unit).to.have.keys([
            'id',
            'name',
          ]);
        });
      });
    });

    // it('should return 403 if the user is not logged in', async () => {

    // });
  });

  describe('GET /api/recipes/:id', () => {
    it('should return a recipe if the user is logged in and the recipe exists', async () => {

    });

    it('should return a 403 if the user is not logged', async () => {

    });

    it('should return a 404 if the user is logged in and the recipe exists', async () => {

    });
  });

  describe('POST /api/recipes', () => {
    it('should add a recipe when the input is well formed and the user is logged in', async () => {

    });

    it('should return 403 if the user is not logged in', async () => {

    });

    it('should return 400 if the user is logged in, but the input is invalid', async () => {

    });
  });

  describe('PATCH /api/recipes/:id', () => {
    it('should update the recipe if the user is logged in and is the owner of the recipe', async () => {

    });

    it('should return 404 if the user is logged in and does not own the recipe', async () => {

    });

    it('should return 403 if the user is not logged in', async () => {

    });

    it('should return 400 if the user is logged in, but the body is not properly formed', async () => {

    });

    it('should return 400 if the user is logged in, but the recipe id is invalid', async () => {

    });
  });

  describe('DELETE /api/recipes/:id', async () => {
    it('should remove the recipe with the specified id if the user is logged in and owns the recipe', async () => {

    });

    it('should return 403 if the user is not logged in', () => {

    });

    it('should return 404 if the user is logged in and does not own the recipe', async () => {

    });

    it('should return 400 if the user is logged in, but the id does not exist', async () => {

    });
  });
});
