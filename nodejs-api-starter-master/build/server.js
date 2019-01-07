require('source-map-support').install(); 'use strict';









var _app = require('./app');var _app2 = _interopRequireDefault(_app);
var _db = require('./db');var _db2 = _interopRequireDefault(_db);
var _redis = require('./redis');var _redis2 = _interopRequireDefault(_redis);
var _errors = require('./errors');var _errors2 = _interopRequireDefault(_errors);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                *
                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                */ /* eslint-disable no-console, no-shadow */const port = process.env.PORT || 8080;const host = process.env.HOSTNAME || '0.0.0.0'; // Launch Node.js server
const server = _app2.default.listen(port, host, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}/`);
});

// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, _db2.default.destroy, _redis2.default.quit];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (err) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) _errors2.default.report(err);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
//# sourceMappingURL=server.js.map
