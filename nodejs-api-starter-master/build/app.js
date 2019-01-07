'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _cors = require('cors');var _cors2 = _interopRequireDefault(_cors);
var _compression = require('compression');var _compression2 = _interopRequireDefault(_compression);
var _cookieParser = require('cookie-parser');var _cookieParser2 = _interopRequireDefault(_cookieParser);
var _bodyParser = require('body-parser');var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _expressSession = require('express-session');var _expressSession2 = _interopRequireDefault(_expressSession);
var _connectRedis = require('connect-redis');var _connectRedis2 = _interopRequireDefault(_connectRedis);
var _expressFlash = require('express-flash');var _expressFlash2 = _interopRequireDefault(_expressFlash);
var _i18next = require('i18next');var _i18next2 = _interopRequireDefault(_i18next);
var _i18nextExpressMiddleware = require('i18next-express-middleware');var _i18nextExpressMiddleware2 = _interopRequireDefault(_i18nextExpressMiddleware);


var _i18nextNodeFsBackend = require('i18next-node-fs-backend');var _i18nextNodeFsBackend2 = _interopRequireDefault(_i18nextNodeFsBackend);
var _expressGraphql = require('express-graphql');var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
var _prettyError = require('pretty-error');var _prettyError2 = _interopRequireDefault(_prettyError);
var _graphql = require('graphql');

var _email = require('./email');var _email2 = _interopRequireDefault(_email);
var _redis = require('./redis');var _redis2 = _interopRequireDefault(_redis);
var _passport = require('./passport');var _passport2 = _interopRequireDefault(_passport);
var _account = require('./routes/account');var _account2 = _interopRequireDefault(_account);
var _schema = require('./schema');var _schema2 = _interopRequireDefault(_schema);
var _Context = require('./Context');var _Context2 = _interopRequireDefault(_Context);
var _errors = require('./errors');var _errors2 = _interopRequireDefault(_errors);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                *
                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                */_i18next2.default.use(_i18nextExpressMiddleware.LanguageDetector).use(_i18nextNodeFsBackend2.default).init({
  preload: ['en', 'de'],
  ns: ['common', 'email'],
  fallbackNS: 'common',
  detection: {
    lookupCookie: 'lng' },

  backend: {
    loadPath: _path2.default.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    addPath: _path2.default.resolve(
    __dirname,
    '../locales/{{lng}}/{{ns}}.missing.json') } });




const app = (0, _express2.default)();

app.set('trust proxy', 'loopback');

app.use(
(0, _cors2.default)({
  origin(origin, cb) {
    const whitelist = process.env.CORS_ORIGIN ?
    process.env.CORS_ORIGIN.split(',') :
    [];
    cb(null, whitelist.includes(origin));
  },
  credentials: true }));



app.use((0, _compression2.default)());
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use(
(0, _expressSession2.default)({
  store: new ((0, _connectRedis2.default)(_expressSession2.default))({ client: _redis2.default }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET }));


app.use(_i18nextExpressMiddleware2.default.handle(_i18next2.default));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _expressFlash2.default)());

app.use(_account2.default);

// The following routes are intended to be used in development mode only
if (process.env.NODE_ENV !== 'production') {
  // A route for testing email templates
  app.get('/:email(email|emails)/:template', (req, res) => {
    const message = _email2.default.render(req.params.template, { t: req.t, v: 123 });
    res.send(message.html);
  });

  // A route for testing authentication/authorization
  app.get('/', (req, res) => {
    if (req.user) {
      res.send(
      `<p>${req.t('Welcome, {{user}}!', {
        user: req.user.displayName })
      } (<a href="javascript:fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(() => window.location = '/')">${req.t(
      'log out')
      }</a>)</p>`);

    } else {
      res.send(
      `<p>${req.t('Welcome, guest!')} (<a href="/login/facebook">${req.t(
      'sign in')
      }</a>)</p>`);

    }
  });
}

app.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send((0, _graphql.printSchema)(_schema2.default));
});

app.use(
'/graphql',
(0, _expressGraphql2.default)(req => ({
  schema: _schema2.default,
  context: new _Context2.default(req),
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',
  formatError: error => {
    _errors2.default.report(error.originalError || error);
    return {
      message: error.message,
      code: error.originalError && error.originalError.code,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path };

  } })));



const pe = new _prettyError2.default();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  process.stderr.write(pe.render(err));
  next();
});exports.default =

app;
//# sourceMappingURL=app.js.map
