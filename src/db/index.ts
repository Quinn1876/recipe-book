import mongoose from 'mongoose';
import controller from './controller';

const mongoURI = process.env.NODE_ENV === 'development'
  ? process.env.MONGO_BASE_URI_DEV
  : process.env.MONGO_BASE_URI;

mongoose.connect(mongoURI || '', {useNewUrlParser: true, useUnifiedTopology: true});

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default controller;
