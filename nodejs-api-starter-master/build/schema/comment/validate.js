'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =














validate;var _validator = require('validator');var _validator2 = _interopRequireDefault(_validator);var _errors = require('../../errors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                         * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                         * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                         * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                         */function validate(input, ctx) {const errors = [];const data = {};const { t, user } = ctx;if (!user) {
    throw new _errors.ValidationError([
    { key: '', message: t('Only authenticated users can add comments.') }]);

  }

  if (typeof input.text === 'undefined' || input.text.trim() !== '') {
    errors.push({
      key: 'text',
      message: t('The comment field cannot be empty.') });

  } else if (!_validator2.default.isLength(input.text, { min: 20, max: 2000 })) {
    errors.push({
      key: 'text',
      message: t('The comment must be between 20 and 2000 characters long.') });

  } else {
    data.text = input.text;
  }

  return { data, errors };
}
//# sourceMappingURL=validate.js.map
