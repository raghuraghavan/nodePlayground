'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _graphql = require('graphql');






var _graphqlRelay = require('graphql-relay');

var _UserType = require('../user/UserType');var _UserType2 = _interopRequireDefault(_UserType);
var _CommentType = require('../comment/CommentType');var _CommentType2 = _interopRequireDefault(_CommentType);
var _node = require('../node');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =


new _graphql.GraphQLObjectType({
  name: 'Story',
  interfaces: [_node.nodeInterface],

  fields: {
    id: (0, _graphqlRelay.globalIdField)(),

    author: {
      type: new _graphql.GraphQLNonNull(_UserType2.default),
      resolve(parent, args, ctx) {
        return ctx.userById.load(parent.author_id);
      } },


    title: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },


    url: {
      type: _graphql.GraphQLString },


    text: {
      type: _graphql.GraphQLString },


    comments: {
      type: new _graphql.GraphQLList(_CommentType2.default),
      resolve(parent, args, ctx) {
        return ctx.commentsByStoryId.load(parent.id);
      } },


    pointsCount: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve(parent, args, ctx) {
        return ctx.storyPointsCount.load(parent.id);
      } },


    commentsCount: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve(parent, args, ctx) {
        return ctx.storyCommentsCount.load(parent.id);
      } },


    createdAt: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve(parent) {
        return parent.created_at;
      } },


    updatedAt: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve(parent) {
        return parent.updated_at;
      } } } }); /**
                 * Copyright © 2016-present Kriasoft.
                 *
                 * This source code is licensed under the MIT license found in the
                 * LICENSE.txt file in the root directory of this source tree.
                 */
//# sourceMappingURL=StoryType.js.map
