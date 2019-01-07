'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _knex = require('knex');var _knex2 = _interopRequireDefault(_knex);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const db = (0, _knex2.default)({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'migrations' },

  debug: process.env.DATABASE_DEBUG === 'true' }); /**
                                                    * Copyright © 2016-present Kriasoft.
                                                    *
                                                    * This source code is licensed under the MIT license found in the
                                                    * LICENSE.txt file in the root directory of this source tree.
                                                    */exports.default = db;
//# sourceMappingURL=db.js.map
