'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /**
                                                                                                                                                                                                                                                                                                                                    * Copyright © 2016-present Kriasoft.
                                                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                    */



var _graphql = require('graphql');
var _graphqlRelay = require('graphql-relay');






var _db = require('../../db');var _db2 = _interopRequireDefault(_db);
var _StoryType = require('./StoryType');var _StoryType2 = _interopRequireDefault(_StoryType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const stories = {
  type: (0, _graphqlRelay.connectionDefinitions)({
    name: 'Story',
    nodeType: _StoryType2.default,
    connectionFields: {
      totalCount: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) } } }).

  connectionType,
  args: _graphqlRelay.forwardConnectionArgs,
  async resolve(root, args, ctx) {
    const limit = typeof args.first === 'undefined' ? '10' : args.first;
    const offset = args.after ? (0, _graphqlRelay.cursorToOffset)(args.after) + 1 : 0;

    const [data, totalCount] = await Promise.all([
    _db2.default.
    table('stories').
    orderBy('created_at', 'desc').
    limit(limit).
    offset(offset).
    then(rows => {
      rows.forEach(x => ctx.storyById.prime(x.id, x));
      return rows;
    }),
    _db2.default.
    table('stories').
    count().
    then(x => x[0].count)]);


    return _extends({},
    (0, _graphqlRelay.connectionFromArraySlice)(data, args, {
      sliceStart: offset,
      arrayLength: totalCount }), {

      totalCount });

  } };exports.default =


{
  stories };
//# sourceMappingURL=queries.js.map
