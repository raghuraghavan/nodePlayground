'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _redis = require('redis');var _redis2 = _interopRequireDefault(_redis);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _errors = require('./errors');var _errors2 = _interopRequireDefault(_errors);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype); /**
                                                                         * Copyright © 2016-present Kriasoft.
                                                                         *
                                                                         * This source code is licensed under the MIT license found in the
                                                                         * LICENSE.txt file in the root directory of this source tree.
                                                                         */_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);const client = _redis2.default.createClient(process.env.REDIS_URL);client.on('error', _errors2.default.report); // eslint-disable-line no-console
exports.default =
client;
//# sourceMappingURL=redis.js.map
