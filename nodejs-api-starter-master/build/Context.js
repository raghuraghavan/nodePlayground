'use strict';Object.defineProperty(exports, "__esModule", { value: true });








var _dataloader = require('dataloader');var _dataloader2 = _interopRequireDefault(_dataloader);



var _db = require('./db');var _db2 = _interopRequireDefault(_db);
var _utils = require('./utils');
var _errors = require('./errors');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                 * Copyright © 2016-present Kriasoft.
                                                                                                                                 *
                                                                                                                                 * This source code is licensed under the MIT license found in the
                                                                                                                                 * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                 */class Context {

  constructor(request) {this.


















    userById = new _dataloader2.default(keys =>
    _db2.default.
    table('users').
    whereIn('id', keys).
    select().
    then((0, _utils.mapTo)(keys, x => x.id)));this.


    emailById = new _dataloader2.default(keys =>
    _db2.default.
    table('emails').
    whereIn('id', keys).
    select().
    then((0, _utils.mapTo)(keys, x => x.id)));this.


    emailsByUserId = new _dataloader2.default(keys =>
    _db2.default.
    table('emails').
    whereIn('user_id', keys).
    select().
    then((0, _utils.mapToMany)(keys, x => x.user_id)));this.


    storyById = new _dataloader2.default(keys =>
    _db2.default.
    table('stories').
    whereIn('id', keys).
    select().
    then((0, _utils.mapTo)(keys, x => x.id)));this.


    storyCommentsCount = new _dataloader2.default(keys =>
    _db2.default.
    table('stories').
    leftJoin('comments', 'stories.id', 'comments.story_id').
    whereIn('stories.id', keys).
    groupBy('stories.id').
    select('stories.id', _db2.default.raw('count(comments.story_id)')).
    then((0, _utils.mapToValues)(keys, x => x.id, x => x.count)));this.


    storyPointsCount = new _dataloader2.default(keys =>
    _db2.default.
    table('stories').
    leftJoin('story_points', 'stories.id', 'story_points.story_id').
    whereIn('stories.id', keys).
    groupBy('stories.id').
    select('stories.id', _db2.default.raw('count(story_points.story_id)')).
    then((0, _utils.mapToValues)(keys, x => x.id, x => x.count)));this.


    commentById = new _dataloader2.default(keys =>
    _db2.default.
    table('comments').
    whereIn('id', keys).
    select().
    then((0, _utils.mapTo)(keys, x => x.id)));this.


    commentsByStoryId = new _dataloader2.default(keys =>
    _db2.default.
    table('comments').
    whereIn('story_id', keys).
    select().
    then((0, _utils.mapToMany)(keys, x => x.story_id)));this.


    commentsByParentId = new _dataloader2.default(keys =>
    _db2.default.
    table('comments').
    whereIn('parent_id', keys).
    select().
    then((0, _utils.mapToMany)(keys, x => x.parent_id)));this.


    commentPointsCount = new _dataloader2.default(keys =>
    _db2.default.
    table('comments').
    leftJoin('comment_points', 'comments.id', 'comment_points.comment_id').
    whereIn('comments.id', keys).
    groupBy('comments.id').
    select('comments.id', _db2.default.raw('count(comment_points.comment_id)')).
    then((0, _utils.mapToValues)(keys, x => x.id, x => x.count)));this.request = request;this.t = request.t;}get user() {return this.request.user;} /*
                                                                                                                                                     * Data loaders to be used with GraphQL resolve() functions. For example:
                                                                                                                                                     *
                                                                                                                                                     *   resolve(post: any, args: any, { userById }: Context) {
                                                                                                                                                     *     return userById.load(post.author_id);
                                                                                                                                                     *   }
                                                                                                                                                     *
                                                                                                                                                     * For more information visit https://github.com/facebook/dataloader
                                                                                                                                                     */ /*
                                                                                                                                                         * Authenticatinon and permissions.
                                                                                                                                                         */ensureIsAuthenticated() {if (!this.user) throw new _errors.UnauthorizedError();}}exports.default =

Context;
//# sourceMappingURL=Context.js.map
