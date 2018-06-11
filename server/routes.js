const express = require('express');
const passport = require('passport');
const path = require('path');
const OAuth2Strategy = require('passport-oauth2');
const gitter = require('./gitter');

const router = express.Router();

const gitterHost = 'https://gitter.im';
const clientId = process.env.GITTER_KEY ? process.env.GITTER_KEY.trim() : 'c88b840cec71875821b0636d96c43778c7f72bf3';
const clientSecret  = process.env.GITTER_SECRET ? process.env.GITTER_SECRET.trim() : '0e12fdf8ff132a45b57f4c80aa1490eae42c4de8';

passport.use(new OAuth2Strategy({
    authorizationURL: gitterHost + '/login/oauth/authorize',
    tokenURL: gitterHost + '/login/oauth/token',
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: '/login/callback',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, done) {
    req.session.accessToken = accessToken;

    gitter.fetchCurrentUser(accessToken, (err, user) => {
      return (err ? done(err) : done(null, user));
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
  done(null, JSON.parse(user));
});

router.get('/login',
  passport.authenticate('oauth2')
);

router.get('/login/callback',
   passport.authenticate('oauth2', {
     successRedirect: '/account',
     failureRedirect: '/'
   })
);

router.get('/logout', function(req) {
  req.session.destroy();
  req.redirect('/');
});

router.get('/user', function(req, res) {
  gitter.fetchCurrentUser(req.session.accessToken, (err, payload) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(payload);
    }
  });
});

router.get('/rooms', function(req, res) {
  gitter.fetchRooms(req.query.user, req.session.accessToken, (err, payload) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(payload);
    }
  });
});

router.get('/chat/:id', function(req, res) {
  gitter.fetchChatMessages(req.params.id, req.session.accessToken, (err, payload) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(payload);
    }
  });
});

router.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/', 'index.html'))
});

module.exports = router;