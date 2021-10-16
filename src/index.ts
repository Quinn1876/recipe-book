import { config } from 'dotenv';
config();
import path from 'path';
import express from 'express';
import http from 'http';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';
import cors from 'cors';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';
import api from './api';
import knexConfig from '../knexfile';
import { db as knex } from './db';
import { authMiddleware } from './utils/auth-middleware';

const port = process.env.PORT || 4000;
const buildApp = async (): Promise<express.Express> => {
  const app = express();

  // This needs to be run to completion before connecting the session middleware which depends on
  // the session table being available
  await knex.migrate.latest();


  const sessionConnectionString: string = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : knexConfig[process.env.NODE_ENV].connection;

  const pgPool = new pg.Pool({
    connectionString: sessionConnectionString
  });
  const pgSession = connectPgSimple(session);

  // saveUninitialized: true allows us to save the session before auth
  const sessionConfig: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: pgPool,
      tableName: 'user_sessions'
    }),
    name: 'user_session',
  };

  // Middle Ware
  app.use(session(sessionConfig));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(useragent.express());

  app.use(authMiddleware.checkUserLoggedIn);

  // Api Routes
  app.use('/api', api);

  // Frontend routes
  app.use(express.static(path.join(__dirname, '..', 'app', 'build')));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../app/build') });
  });
  return app;
};

// Bootstrap
buildApp().then((app) => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log(`Server listening on port: ${port}`);
    console.log(`Server environment: ${process.env.NODE_ENV}`);
  }
});

export default buildApp;
