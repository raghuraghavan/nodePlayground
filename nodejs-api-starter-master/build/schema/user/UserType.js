'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _graphql = require('graphql');
var _graphqlRelay = require('graphql-relay');

var _EmailType = require('./EmailType');var _EmailType2 = _interopRequireDefault(_EmailType);
var _node = require('../node');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                              * Copyright © 2016-present Kriasoft.
                                                                                                                              *
                                                                                                                              * This source code is licensed under the MIT license found in the
                                                                                                                              * LICENSE.txt file in the root directory of this source tree.
                                                                                                                              */exports.default = new _graphql.GraphQLObjectType({ name: 'User', interfaces: [_node.nodeInterface],

  fields: {
    id: (0, _graphqlRelay.globalIdField)(),

    displayName: {
      type: _graphql.GraphQLString,
      resolve(parent) {
        return parent.display_name;
      } },


    imageUrl: {
      type: _graphql.GraphQLString,
      resolve(parent) {
        return parent.image_url;
      } },


    emails: {
      type: new _graphql.GraphQLList(_EmailType2.default),
      resolve(parent, args, ctx) {
        return parent.id === ctx.user.id ?
        ctx.emailsByUserId.load(parent.id) :
        null;
      } } } });
//# sourceMappingURL=UserType.js.map
