const express = require('express');
const path = require('path');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const gitter = require('./gitter');

const router = express.Router();

const gitterHost = 'https://gitter.im';
const clientId = process.env.GITTER_KEY ? process.env.GITTER_KEY.trim() : 'af93f30de7ce8d102d264b63c7601d18f0ad36d9';
const clientSecret  = process.env.GITTER_SECRET ? process.env.GITTER_SECRET.trim() : '05a45c2a65acc2c9e1b318e1f9d707ec137cf530';

passport.use(new OAuth2Strategy({
    authorizationURL: gitterHost + '/login/oauth/authorize',
    tokenURL: gitterHost + '/login/oauth/token',
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: '/login/callback',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log('login2');
    
    req.session.token = accessToken;
    gitter.fetchCurrentUser(accessToken, function(err, user) {
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
     successRedirect: '/',
     failureRedirect: '/'
   })
);

module.exports = router;