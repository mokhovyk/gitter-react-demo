const express = require('express');
const passport = require('passport');
const path = require('path');
const OAuth2Strategy = require('passport-oauth2');
const gitter = require('./gitter');
const session = require('express-session');
const uuid = require('uuid/v4');

const router = express.Router();

const gitterHost = 'https://gitter.im';
const clientId = process.env.GITTER_KEY ? process.env.GITTER_KEY.trim() : 'af93f30de7ce8d102d264b63c7601d18f0ad36d9';
const clientSecret  = process.env.GITTER_SECRET ? process.env.GITTER_SECRET.trim() : '05a45c2a65acc2c9e1b318e1f9d707ec137cf530';

// router.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true },
//   genid: (req) => {
//     console.log('router middleware');
//     console.log(req.sessionID);
//     return uuid() // use UUIDs for session IDs
//   },
// }));

passport.use(new OAuth2Strategy({
    authorizationURL: gitterHost + '/login/oauth/authorize',
    tokenURL: gitterHost + '/login/oauth/token',
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: '/login/callback',
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    request.session.accessToken = accessToken;

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

router.get('/logout', function(req, res) {
  req.session.destroy();
  req.redirect('/');
});

router.get('/user', function(req, res) {
  gitter.fetchCurrentUser(req.session.accessToken, (err, user) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(user);
    }
  });
});

router.get('/rooms', function(req, res) {
  const userId = req.query.user;

  gitter.fetchRooms(userId, req.session.accessToken, (err, rooms) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(rooms);
    }
  });
});


router.get('/chat/:id', function(req, res) {
  const roomId = req.params.id;

  gitter.fetchChatMessages(roomId, req.session.accessToken, (err, messages) => {
    console.log('messages', messages);

    if (err) {
      return res.sendStatus(500);
    } else {
      res.json(messages);
    }
  });
});

router.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/', 'index.html'))
});

module.exports = router;