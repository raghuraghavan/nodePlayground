'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _graphql = require('graphql');






var _graphqlRelay = require('graphql-relay');

var _node = require('../node');
var _StoryType = require('../story/StoryType');var _StoryType2 = _interopRequireDefault(_StoryType);
var _UserType = require('../user/UserType');var _UserType2 = _interopRequireDefault(_UserType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const CommentType = new _graphql.GraphQLObjectType({
  name: 'Comment',
  interfaces: [_node.nodeInterface],

  fields: () => ({
    id: (0, _graphqlRelay.globalIdField)(),

    story: {
      type: new _graphql.GraphQLNonNull(_StoryType2.default),
      resolve(parent, args, ctx) {
        return ctx.storyById.load(parent.story_id);
      } },


    parent: {
      type: CommentType,
      resolve(parent, args, ctx) {
        return parent.parent_id && ctx.commentById.load(parent.parent_id);
      } },


    author: {
      type: new _graphql.GraphQLNonNull(_UserType2.default),
      resolve(parent, args, ctx) {
        return ctx.userById.load(parent.author_id);
      } },


    comments: {
      type: new _graphql.GraphQLList(CommentType),
      resolve(parent, args, ctx) {
        return ctx.commentsByParentId.load(parent.id);
      } },


    text: {
      type: _graphql.GraphQLString },


    pointsCount: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve(parent, args, ctx) {
        return ctx.commentPointsCount.load(parent.id);
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
      } } }) }); /**
                  * Copyright © 2016-present Kriasoft.
                  *
                  * This source code is licensed under the MIT license found in the
                  * LICENSE.txt file in the root directory of this source tree.
                  */exports.default = CommentType;
//# sourceMappingURL=CommentType.js.map
