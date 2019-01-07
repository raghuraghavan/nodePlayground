'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /**
                                                                                                                                                                                                                                                                                                                                    * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                    */



var _graphql = require('graphql');

var _queries = require('./user/queries');var _queries2 = _interopRequireDefault(_queries);
var _queries3 = require('./story/queries');var _queries4 = _interopRequireDefault(_queries3);
var _mutations = require('./story/mutations');var _mutations2 = _interopRequireDefault(_mutations);
var _mutations3 = require('./comment/mutations');var _mutations4 = _interopRequireDefault(_mutations3);
var _node = require('./node');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: _extends({
      node: _node.nodeField,
      nodes: _node.nodesField }, _queries2.default, _queries4.default) }),




  mutation: new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: _extends({}, _mutations2.default, _mutations4.default) }) });
//# sourceMappingURL=index.js.map
