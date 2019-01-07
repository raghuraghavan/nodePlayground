'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /**
                                                                                                                                                                                                                                                                                                                                    * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                    */


/* eslint-disable no-param-reassign, no-underscore-dangle, max-len */

var _passport = require('passport');var _passport2 = _interopRequireDefault(_passport);
var _passportGoogleOauth = require('passport-google-oauth20');
var _passportFacebook = require('passport-facebook');
var _passportTwitter = require('passport-twitter');

var _db = require('./db');var _db2 = _interopRequireDefault(_db);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_passport2.default.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    displayName: user.displayName,
    imageUrl: user.imageUrl });

});

_passport2.default.deserializeUser((user, done) => {
  done(null, user);
});

// Creates or updates the external login credentials
// and returns the currently authenticated user.
async function login(req, provider, profile, tokens) {
  let user;

  if (req.user) {
    user = await _db2.default.
    table('users').
    where({ id: req.user.id }).
    first();
  }

  if (!user) {
    user = await _db2.default.
    table('logins').
    innerJoin('users', 'users.id', 'logins.user_id').
    where({ 'logins.provider': provider, 'logins.id': profile.id }).
    first('users.*');
    if (
    !user &&
    profile.emails &&
    profile.emails.length &&
    profile.emails[0].verified === true)
    {
      user = await _db2.default.
      table('users').
      innerJoin('emails', 'emails.user_id', 'users.id').
      where({
        'emails.email': profile.emails[0].value,
        'emails.verified': true }).

      first('users.*');
    }
  }

  if (!user) {
    [user] = await _db2.default.
    table('users').
    insert({
      display_name: profile.displayName,
      image_url:
      profile.photos && profile.photos.length ?
      profile.photos[0].value :
      null }).

    returning('*');

    if (profile.emails && profile.emails.length) {
      await _db2.default.table('emails').insert(
      profile.emails.map(x => ({
        user_id: user && user.id,
        email: x.value,
        verified: x.verified || false })));


    }
  }

  const loginKeys = { user_id: user.id, provider, id: profile.id };
  const { count } = await _db2.default.
  table('logins').
  where(loginKeys).
  count('id').
  first();

  if (count === '0') {
    await _db2.default.table('logins').insert(_extends({},
    loginKeys, {
      username: profile.username,
      tokens: JSON.stringify(tokens),
      profile: JSON.stringify(profile._json) }));

  } else {
    await _db2.default.
    table('logins').
    where(loginKeys).
    update({
      username: profile.username,
      tokens: JSON.stringify(tokens),
      profile: JSON.stringify(profile._json),
      updated_at: _db2.default.raw('CURRENT_TIMESTAMP') });

  }

  return {
    id: user.id,
    displayName: user.display_name,
    imageUrl: user.image_url };

}

// https://github.com/jaredhanson/passport-google-oauth2
_passport2.default.use(
new _passportGoogleOauth.Strategy(
{
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/login/google/return',
  passReqToCallback: true },

async (req, accessToken, refreshToken, profile, done) => {
  try {
    const user = await login(req, 'google', profile, {
      accessToken,
      refreshToken });

    done(null, user);
  } catch (err) {
    done(err);
  }
}));



// https://github.com/jaredhanson/passport-facebook
// https://developers.facebook.com/docs/facebook-login/permissions/
_passport2.default.use(
new _passportFacebook.Strategy(
{
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: [
  'id',
  'cover',
  'name',
  'age_range',
  'link',
  'gender',
  'locale',
  'picture',
  'timezone',
  'updated_time',
  'verified',
  'email'],

  callbackURL: '/login/facebook/return',
  passReqToCallback: true },

async (req, accessToken, refreshToken, profile, done) => {
  try {
    if (profile.emails.length)
    profile.emails[0].verified = !!profile._json.verified;
    profile.displayName =
    profile.displayName ||
    `${profile.name.givenName} ${profile.name.familyName}`;
    const user = await login(req, 'facebook', profile, {
      accessToken,
      refreshToken });

    done(null, user);
  } catch (err) {
    done(err);
  }
}));



// https://github.com/jaredhanson/passport-twitter
_passport2.default.use(
new _passportTwitter.Strategy(
{
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: '/login/twitter/return',
  includeEmail: true,
  includeStatus: false,
  passReqToCallback: true },

async (req, token, tokenSecret, profile, done) => {
  try {
    if (profile.emails && profile.emails.length)
    profile.emails[0].verified = true;
    const user = await login(req, 'twitter', profile, {
      token,
      tokenSecret });

    done(null, user);
  } catch (err) {
    done(err);
  }
}));exports.default = _passport2.default;
//# sourceMappingURL=passport.js.map
