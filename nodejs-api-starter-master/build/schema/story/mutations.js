'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /**
                                                                                                                                                                                                                                                                                                                                    * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                    */



var _graphql = require('graphql');
var _graphqlRelay = require('graphql-relay');

var _db = require('../../db');var _db2 = _interopRequireDefault(_db);
var _validate = require('./validate');var _validate2 = _interopRequireDefault(_validate);
var _StoryType = require('./StoryType');var _StoryType2 = _interopRequireDefault(_StoryType);
var _errors = require('../../errors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const inputFields = {
  title: {
    type: _graphql.GraphQLString },

  text: {
    type: _graphql.GraphQLString },

  url: {
    type: _graphql.GraphQLString } };



const outputFields = {
  story: {
    type: _StoryType2.default } };



const createStory = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'CreateStory',
  inputFields,
  outputFields,
  async mutateAndGetPayload(input, ctx) {
    const { data, errors } = (0, _validate2.default)(input, ctx);

    if (errors.length) {
      throw new _errors.ValidationError(errors);
    }

    const rows = await _db2.default.
    table('stories').
    insert(data).
    returning('id');
    return ctx.storyById.load(rows[0]).then(story => ({ story }));
  } });


const updateStory = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'UpdateStory',
  inputFields: _extends({
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) } },
  inputFields),

  outputFields,
  async mutateAndGetPayload(input, ctx) {
    const { t, user } = ctx;
    const { type, id } = (0, _graphqlRelay.fromGlobalId)(input.id);

    if (type !== 'Story') {
      throw new Error(t('The story ID is invalid.'));
    }

    const { data, errors } = (0, _validate2.default)(input, ctx);
    const story = await _db2.default.
    table('stories').
    where('id', '=', id).
    first('*');

    if (!story) {
      errors.push({
        key: '',
        message: 'Failed to save the story. Please make sure that it exists.' });

    } else if (story.author_id !== user.id) {
      errors.push({ key: '', message: 'You can only edit your own stories.' });
    }

    if (errors.length) {
      throw new _errors.ValidationError(errors);
    }

    data.updated_at = _db2.default.raw('CURRENT_TIMESTAMP');

    await _db2.default.
    table('stories').
    where('id', '=', id).
    update(data);
    return ctx.storyById.load(id).then(x => ({ story: x }));
  } });exports.default =


{
  createStory,
  updateStory };
//# sourceMappingURL=mutations.js.map
