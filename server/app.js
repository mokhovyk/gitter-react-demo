const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid/v4');
const routes = require('./routes');

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  name: 'connect.sid',
  secret: 'yoursecret',
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 24,
    httpOnly : false,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/')));
app.use(routes);

module.exports = app;