'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};








var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _nodemailer = require('nodemailer');var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _handlebars = require('handlebars');var _handlebars2 = _interopRequireDefault(_handlebars);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                  * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                                                                                  * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                  * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                  */ // TODO: Configure email transport for the production environment
// https://nodemailer.com/smtp/
const _ref = process.env.NODE_ENV === 'production' ? { from: 'no-reply@example.com',
  streamTransport: true } :

{
  from: 'no-reply@example.com',
  streamTransport: true },{ from } = _ref,config = _objectWithoutProperties(_ref, ['from']);


const templates = new Map();
const baseDir = _path2.default.resolve(__dirname, 'emails');
const transporter = _nodemailer2.default.createTransport(config, { from });

// Register i18n translation helper, for example: {{t "Welcome, {{user}}" user="John"}}
_handlebars2.default.registerHelper('t', (key, options) =>
options.data.root.t(key, options.hash));


function loadTemplate(filename) {
  const m = new module.constructor();
  // eslint-disable-next-line no-underscore-dangle
  m._compile(_fs2.default.readFileSync(filename, 'utf8'), filename);
  return _handlebars2.default.template(m.exports);
}

/**
   * Usage example:
   *
   *   const message = await email.render('welcome', { name: 'John' });
   *   await email.send({
   *     to: '...',
   *     from: '...',
   *     ...message,
   *   });
   */exports.default =
{
  /**
   * Renders email message from a template and context variables.
   * @param {string} name The name of a template to render. See `src/emails`.
   * @param {object} context Context variables.
   */
  render(name, context = {}) {
    if (!templates.size) {
      _fs2.default.readdirSync(baseDir).forEach(template => {
        if (_fs2.default.statSync(`${baseDir}/${template}`).isDirectory()) {
          templates.set(template, {
            subject: loadTemplate(`${baseDir}/${template}/subject.js`),
            html: loadTemplate(`${baseDir}/${template}/html.js`) });

        }
      });
    }

    const template = templates.get(name);

    if (!template) {
      throw new Error(`The email template '${name}' is missing.`);
    }

    return {
      subject: template.subject(context),
      html: template.html(context) };

  },
  /**
      * Sends email message via Nodemailer.
      */
  send(message, options) {
    return transporter.sendMail(_extends({},
    message,
    options));

  } };
//# sourceMappingURL=email.js.map
