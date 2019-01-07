'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _graphql = require('graphql');
var _graphqlRelay = require('graphql-relay');

var _db = require('../../db');var _db2 = _interopRequireDefault(_db);
var _validate = require('./validate');var _validate2 = _interopRequireDefault(_validate);
var _CommentType = require('./CommentType');var _CommentType2 = _interopRequireDefault(_CommentType);
var _errors = require('../../errors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                     * Copyright © 2016-present Kriasoft.
                                                                                                                                     *
                                                                                                                                     * This source code is licensed under the MIT license found in the
                                                                                                                                     * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                     */const inputFields = { storyId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },

  parentId: {
    type: _graphql.GraphQLID },

  text: {
    type: _graphql.GraphQLString } };



const outputFields = {
  story: {
    type: _CommentType2.default } };



const createComment = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'CreateComment',
  inputFields,
  outputFields,
  async mutateAndGetPayload(input, context) {
    const { t, user, commentById } = context;
    const { data, errors } = (0, _validate2.default)(input, context);

    if (errors.length) {
      throw new _errors.ValidationError(errors);
    }

    const { type: storyType, id: storyId } = (0, _graphqlRelay.fromGlobalId)(input.storyId);

    if (storyType !== 'Story') {
      throw new Error(t('The story ID is invalid.'));
    }

    if (typeof input.parentId !== 'undefined' && input.parentId !== '') {
      const { type: commentType, id: parentId } = (0, _graphqlRelay.fromGlobalId)(input.parentId);
      if (commentType !== 'Comment') {
        throw new Error(t('The parent comment ID is invalid.'));
      }
      data.parent_id = parentId;
    }

    data.story_id = storyId;
    data.author_id = user.id;
    const rows = await _db2.default.
    table('comments').
    insert(data).
    returning('id');
    return commentById.load(rows[0]).then(comment => ({ comment }));
  } });


const updateComment = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'UpdateComment',
  inputFields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },

    text: {
      type: _graphql.GraphQLID } },


  outputFields,
  async mutateAndGetPayload(input, ctx) {
    const { t, user } = ctx;
    const { type, id } = (0, _graphqlRelay.fromGlobalId)(input.id);

    if (type !== 'Comment') {
      throw new Error(t('The comment ID is invalid.'));
    }

    const { data, errors } = (0, _validate2.default)(input, ctx);
    const comment = await _db2.default.
    table('comments').
    where('id', '=', id).
    first('*');

    if (!comment) {
      errors.push({
        key: '',
        message: 'Failed to save the comment. Please make sure that it exists.' });

    } else if (comment.author_id !== user.id) {
      errors.push({ key: '', message: 'You can only edit your own comments.' });
    }

    if (errors.length) {
      throw new _errors.ValidationError(errors);
    }

    data.updated_at = _db2.default.raw('CURRENT_TIMESTAMP');

    await _db2.default.
    table('comments').
    where('id', '=', id).
    update(data);
    return ctx.commentById.load(id).then(x => ({ comment: x }));
  } });exports.default =


{
  createComment,
  updateComment };
//# sourceMappingURL=mutations.js.map
