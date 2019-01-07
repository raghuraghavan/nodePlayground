'use strict';Object.defineProperty(exports, "__esModule", { value: true });










// TODO: Log the error to Google Stackdriver, Rollbar etc.
function report(error) {
  // eslint-disable-next-line no-console
  console.error(error);
} /**
   * Copyright © 2016-present Kriasoft.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */class ValidationError extends Error {
  constructor(errors) {
    super('The request is invalid.');this.code = 400;
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        Object.defineProperty(result, error.key, {
          value: [error.message],
          enumerable: true });

      }
      return result;
    }, {});
  }}exports.ValidationError = ValidationError;


class UnauthorizedError extends Error {constructor(...args) {var _temp;return _temp = super(...args), this.
    code = 401, this.
    message = this.message || 'Anonymous access is denied.', _temp;}}exports.UnauthorizedError = UnauthorizedError;


class ForbiddenError extends Error {constructor(...args) {var _temp2;return _temp2 = super(...args), this.
    code = 403, this.
    message = this.message || 'Access is denied.', _temp2;}}exports.ForbiddenError = ForbiddenError;exports.default =


{ report };
//# sourceMappingURL=errors.js.map
