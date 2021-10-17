import { config as dotEnvConfig } from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';
// import http from 'http';
import { db as knex, default as db } from '../../src/db';
import buildApp from '../../src';
import sinon from 'sinon';
import { authMiddleware } from '../../src/utils/auth-middleware';
import { RecipeQuery } from 'recipes';

// const server = http.createServer(app);
chai.use(chaiHttp);
dotEnvConfig();

// eslint-disable-next-line no-var
const sandbox = sinon.createSandbox();

describe('Recipe Api Endpoints', () => {
  let server;
  before('migrate database', async function () {
    this.timeout(10000); // Give it time to migrate, docker can be slow :(
    await knex.migrate.rollback();
    return knex.migrate.latest();
  });

  before('Stub and Build Server', async function () {
    this.timeout(10000);
    sandbox.stub(authMiddleware, 'checkUserLoggedIn').callsFake(async (req, res, next) => {
      const userId = 1;
      req.session.userId = userId;
      next();
    });
    server = await buildApp();
  });

  beforeEach('seed', async function () {
    this.timeout(5000);
    await knex.seed.run();
  });


  after('rollback', async function () {
    this.timeout(10000); // Give it time to migrate, docker can be slow :(
    await knex.migrate.rollback();
  });

  after('sinon teardown', function () {
    console.log('Restoring Stub');
    sandbox.restore();
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
  });

  describe('GET /api/recipes/:id', () => {
    it('should return a recipe if the user is logged in and the recipe exists', async () => {
      const [recipe] = await db.recipe.getRecipesByUserId(1);
      const res = await chai
        .request(server)
        .get(`/api/recipes/${recipe.id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.keys([
        'id',
        'ownerId',
        'name',
        'description',
        'ingredients',
        'directions',
        'createdAt',
      ]);
      res.body.ingredients.forEach((ingredient) => {
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

    it('should return a 404 if the user is logged in and the recipe does not exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/recipes/1000');

      expect(res).to.have.status(404);
    });
  });

  describe('POST /api/recipes', () => {
    it('should add a recipe when the input is well formed and the user is logged in', async () => {
      const res = await chai
        .request(server)
        .post('/api/recipes')
        .send({
          description: 'This is the description of a new recipe',
          name: 'Post Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unit: {
                id: 1,
                name: 'Cups',
              }
            }
          ],
        } as RecipeQuery.NewRecipeRequest);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');

      let recipeExists = true;
      await db.recipe.getRecipeById(res.body.id).catch(() => { recipeExists = false; });
      expect(recipeExists).to.be.true;

    });

    it('should add a recipe when the input is well formed, an image is supplied, and the user is logged in', async () => {
      const res = await chai
        .request(server)
        .post('/api/recipes')
        .send({
          description: 'This is the description of a new recipe',
          name: 'Post Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unit: {
                id: 1,
                name: 'Cups',
              },
            }
          ],
          image: 'cats.png'
        } as RecipeQuery.NewRecipeRequest);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');

      let recipeExists = true;
      await db.recipe.getRecipeById(res.body.id).catch(() => { recipeExists = false; });
      expect(recipeExists).to.be.true;
    });

    it('should return 400 if the user is logged in, but the input is invalid', async () => {
      const res = await chai
        .request(server)
        .post('/api/recipes')
        .send({
          description: 'This is the description of a new recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
        });

      expect(res).to.have.status(400);
    });
  });

  describe('PATCH /api/recipes/:id', () => {
    it('should update the recipe if the user is logged in and is the owner of the recipe', async () => {
      const res = await chai
        .request(server)
        .patch('/api/recipes')
        .send({
          id: 1,
          description: 'This is the description of a updated recipe',
          name: 'Patch Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unit: {
                id: 1,
                name: 'Cups',
              },
            }
          ],
          ownerId: 1,
        } as RecipeQuery.UpdateRecipeRequest);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('description', 'This is the description of a updated recipe');
      expect(res.body).to.have.property('name', 'Patch Test recipe');
      expect(res.body).to.have.property('directions');
      expect(res.body.directions).to.have.length(1);
      expect(res.body.directions[0]).to.have.property('direction', 'Say Hello');
      expect(res.body.directions[0]).to.have.property('directionNumber', 1);
      expect(res.body.directions[0]).to.have.property('id');
      expect(res.body.ingredients).to.have.length(1);
      expect(res.body.ingredients[0]).to.have.property('name', 'carrots');
      expect(res.body.ingredients[0]).to.have.property('amount', 7);
      expect(res.body.ingredients[0]).to.have.property('unit');
      expect(res.body.ingredients[0].unit).to.have.property('id');
      expect(res.body.ingredients[0].unit).to.have.property('name');
      expect(res.body.ingredients[0]).to.have.property('id');

    });

    it('should return 404 if the user is logged in and does not own the recipe', async () => {
      const res = await chai
        .request(server)
        .patch('/api/recipes')
        .send({
          id: 4,
          description: 'This is the description of a updated recipe',
          name: 'Patch Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unit: {
                id: 1,
                name: 'Cups',
              }
            }
          ],
          ownerId: 1
        } as RecipeQuery.UpdateRecipeRequest);

      expect(res).to.have.status(404);
    });

    it('should return 400 if the user is logged in, but the body is not properly formed', async () => {
      const res = await chai
        .request(server)
        .patch('/api/recipes')
        .send({
          id: 4,
          description: 'This is the description of a updated recipe',
          name: 'Patch Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unitId: 1
            }
          ],
          pineapple: 7,
        });

      expect(res).to.have.status(400);
    });

    it('should return 400 if the user is logged in, but the recipe id is invalid', async () => {
      const res = await chai
        .request(server)
        .patch('/api/recipes')
        .send({
          id: 400,
          description: 'This is the description of a updated recipe',
          name: 'Patch Test recipe',
          directions: [
            {
              direction: 'Say Hello',
              directionNumber: 1,
            },
          ],
          ingredients: [
            {
              name: 'carrots',
              amount: 7,
              unit: {
                id: 1,
                name: 'Cups',
              },
            }
          ],
          ownerId: 1,
        } as RecipeQuery.UpdateRecipeRequest);

      expect(res).to.have.status(400);
    });
  });

  describe('DELETE /api/recipes/:id', async () => {
    it('should remove the recipe with the specified id if the user is logged in and owns the recipe', async () => {
      const res = await chai
        .request(server)
        .delete('/api/recipes/1');

      expect(res).to.have.status(200);
      const [{ count: recipeCount }] = await knex('recipes').where({id: 1}).count();
      expect(parseInt(recipeCount as string, 10)).to.be.eq(0);
    });

    it('should return 404 if the user is logged in and does not own the recipe', async () => {
      const res = await chai
        .request(server)
        .delete('/api/recipes/4');

      expect(res).to.have.status(404);
      const [{ count: recipeCount}] = await knex('recipes').where({id: 4}).count();
      expect(parseInt(recipeCount as string, 10)).to.be.eq(1);
    });

    it('should return 400 if the user is logged in, but the id does not exist', async () => {
      const res = await chai
        .request(server)
        .delete('/api/recipes/11');

      expect(res).to.have.status(400);
    });
  });
});
