import express from 'express';
import get from './get';

const user = express.Router();

user.get('/', get);

export default user;
