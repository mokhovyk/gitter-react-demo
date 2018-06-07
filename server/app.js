const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, '../client/')));

app.use('/', routes);

// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, '../client/', 'index.html'))
// });

module.exports = app;