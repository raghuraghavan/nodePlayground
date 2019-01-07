'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =














validate;var _validator = require('validator');var _validator2 = _interopRequireDefault(_validator);var _errors = require('../../errors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                         * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                         * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                         * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                         */function validate(input, ctx) {const errors = [];const data = {};const { t, user } = ctx;if (!user) {
    throw new _errors.ValidationError([
    { key: '', message: t('Only authenticated users can create stories.') }]);

  }

  if (typeof input.title === 'undefined' || input.title.trim() === '') {
    errors.push({
      key: 'title',
      message: t('The title field cannot be empty.') });

  } else if (!_validator2.default.isLength(input.title, { min: 3, max: 80 })) {
    errors.push({
      key: 'title',
      message: t('The title field must be between 3 and 80 characters long.') });

  } else {
    data.title = input.title;
  }

  if (typeof input.url !== 'undefined' && input.url.trim() !== '') {
    if (!_validator2.default.isLength(input.url, { max: 200 })) {
      errors.push({
        key: 'url',
        message: t('The URL field cannot be longer than 200 characters long.') });

    } else if (!_validator2.default.isURL(input.url)) {
      errors.push({ key: 'url', message: t('The URL is invalid.') });
    } else {
      data.url = input.url;
    }
  }

  if (typeof input.text !== 'undefined' && input.text.trim() !== '') {
    if (!_validator2.default.isLength(input.text, { min: 20, max: 2000 })) {
      errors.push({
        key: 'text',
        message: t(
        'The text field must be between 20 and 2000 characters long.') });


    } else {
      data.text = input.text;
    }
  }

  if (data.url && data.text) {
    errors.push({
      key: '',
      message: t('Please fill either the URL or the text field but not both.') });

  } else if (!input.url && !input.text) {
    errors.push({
      key: '',
      message: t('Please fill either the URL or the text field.') });

  }

  data.author_id = user.id;
  return { data, errors };
}
//# sourceMappingURL=validate.js.map
