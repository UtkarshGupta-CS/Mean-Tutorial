var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user')
var session = require('express-session')
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function (app, passport) {

      app.use(passport.initialize());
      app.use(passport.session());
      app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                  secure: false
            }
      }))

      passport.serializeUser(function (user, done) {
            token = jwt.sign({
                  username: user.username,
                  email: user.email
            }, secret, {
                  expiresIn: '24h'
            })
            done(null, user.id);
      });

      passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                  done(err, user);
            });
      });

      passport.use(new FacebookStrategy({
                  clientID: '239087226561496',
                  clientSecret: '8663b1d67b5927dada1d85eda3a171c4',
                  callbackURL: "http://localhost:8082/auth/facebook/callback",
                  profileFields: ['id', 'displayName', 'photos', 'email']

            },
            function (accessToken, refreshToken, profile, done) {
                  console.log(profile._json.email)
                  User.findOne({
                        email: profile._json.email
                  }).select('username password email').exec(function (err, user) {
                        if (err) done(err)
                        if (user && user != null) {
                              done(null, user)
                        } else done(err)
                  })
            }
      ));

      passport.use(new TwitterStrategy({
                  consumerKey: "3WQbGkTNUoyk0FbTuzms6ARfh",
                  consumerSecret: "XfbQStFIXjvdDXwcg1TCn8KPkdO2Dq2Kwvjq74fKqDF7YdHCaT",
                  callbackURL: "http://localhost:8082/auth/twitter/callback",
                  userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
            },
            function (token, tokenSecret, profile, done) {
                  console.log(profile.emails[0].value)
                  User.findOne({
                        email: profile.emails[0].value
                  }).select('username password email').exec(function (err, user) {
                        if (err) done(err)
                        if (user && user != null) {
                              done(null, user)
                        } else done(err)
                  })
            }
      ));

      passport.use(new GoogleStrategy({
                  clientID: "409219723235-8u0ioh9k6tnm7ael4hr36kie0kfose8k.apps.googleusercontent.com",
                  clientSecret: "3Jsuv2NgLQgcN_IMoX22MTp8",
                  callbackURL: "http://localhost:8082/auth/google/callback"
            },
            function (accessToken, refreshToken, profile, done) {
                  console.log(profile.emails[0].value)
                  User.findOne({
                        email: profile.emails[0].value
                  }).select('username password email').exec(function (err, user) {
                        if (err) done(err)
                        if (user && user != null) {
                              done(null, user)
                        } else done(err)
                  })
            }
      ));

      app.get('/auth/twitter', passport.authenticate('twitter'));

      app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                  failureRedirect: '/twittererror'
            }),
            function (req, res) {
                  res.redirect('/twitter/' + token)
            });

      app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                  failureRedirect: '/facebookerror'
            }),
            function (req, res) {
                  res.redirect('/facebook/' + token)
            });

      app.get('/auth/facebook',
            passport.authenticate('facebook', {
                  scope: 'email'
            })
      );
      app.get('/auth/google',
            passport.authenticate('google', {
                  scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']
            }));

      app.get('/auth/google/callback',
            passport.authenticate('google', {
                  failureRedirect: '/googleerror'
            }),
            function (req, res) {
                  res.redirect('/google/'+token);
            });
      return passport
}