const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const linkedRouter = require('./routes/linked');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/linked', linkedRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
} else {
  const dotenv = require('dotenv').config();
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', (req, res) => res.send('Currently in development mode'));
}

module.exports = app;
