'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _UserType = require('./UserType');var _UserType2 = _interopRequireDefault(_UserType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const me = {
  type: _UserType2.default,
  resolve(root, args, ctx) {
    return ctx.user && ctx.userById.load(ctx.user.id);
  } }; /**
        * Copyright © 2016-present Kriasoft.
        *
        * This source code is licensed under the MIT license found in the
        * LICENSE.txt file in the root directory of this source tree.
        */exports.default = { me };
//# sourceMappingURL=queries.js.map
