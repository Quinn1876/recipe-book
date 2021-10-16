import { config as dotEnvConfig } from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';
import { db as knex } from '../../src/db';
import buildApp from '../../src';

chai.use(chaiHttp);
dotEnvConfig();

describe('Recipe Api Endpoints', () => {
  let server;
  before('migrate database', async function () {
    this.timeout(10000); // Give it time to migrate, docker can be slow :(
    await knex.migrate.rollback();
    return knex.migrate.latest();
  });

  before('build server', async function () {
    server = await buildApp();
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
    it('should return 403 if the user is not logged in', async () => {
      const res = await chai
        .request(server)
        .get('/api/recipes');

      expect(res).to.have.status(403);
    });
  });

  describe('GET /api/recipes/:id', () => {
    it('should return a 403 if the user is not logged', async () => {
      const res = await chai
        .request(server)
        .get('/api/recipes/1');

      expect(res).to.have.status(403);
    });
  });

  describe('POST /api/recipes', () => {
    it('should return 403 if the user is not logged in', async () => {
      const res = await chai
        .request(server)
        .post('/api/recipes')
        .send({});

      expect(res).to.have.status(403);
    });
  });

  describe('PATCH /api/recipes/:id', () => {
    it('should return 403 if the user is not logged in', async () => {
      const res = await chai
        .request(server)
        .patch('/api/recipes')
        .send({});

      expect(res).to.have.status(403);
    });
  });

  describe('DELETE /api/recipes/:id', async () => {
    it('should return 403 if the user is not logged in', async () => {
      const res = await chai
        .request(server)
        .del('/api/recipes/1');

      expect(res).to.have.status(403);
    });
  });
});
