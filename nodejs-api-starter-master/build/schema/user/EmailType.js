'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _graphql = require('graphql');





var _graphqlRelay = require('graphql-relay');
var _node = require('../node');exports.default =

new _graphql.GraphQLObjectType({
  name: 'Email',
  interfaces: [_node.nodeInterface],

  fields: {
    id: (0, _graphqlRelay.globalIdField)(),

    email: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },


    verified: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean) },


    primary: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean) } } }); /**
                                                                          * Copyright © 2016-present Kriasoft.
                                                                          *
                                                                          * This source code is licensed under the MIT license found in the
                                                                          * LICENSE.txt file in the root directory of this source tree.
                                                                          */
//# sourceMappingURL=EmailType.js.map
