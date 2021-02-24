import { config } from 'dotenv';
config();
import express from 'express';
import http from 'http';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';
import cors from 'cors';
import api from './api';
import './db'; // Connects to mongo

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const sessionStore = connectSqlite3(session);
// saveUninitialized: true allows us to save the session before auth
const sessionConfig = {
  secret: process.env.SESSION_SECRET || '',
  resave: true,
  saveUninitialized: true,
  store: sessionStore(),
};

// Middle Ware
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(useragent.express());

//Routes
app.use('/api', api);

// Bootstrap
server.listen(port, (): void => {
  console.log(`Server listening on port: ${port}`);
  console.log(`Server environment: ${process.env.NODE_ENV}`);
});
