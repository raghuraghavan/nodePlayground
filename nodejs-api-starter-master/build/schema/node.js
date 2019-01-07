'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.nodesField = exports.nodeField = exports.nodeInterface = undefined;









var _graphqlRelay = require('graphql-relay');

var _utils = require('../utils'); /**
                                   * Copyright © 2016-present Kriasoft.
                                   *
                                   * This source code is licensed under the MIT license found in the
                                   * LICENSE.txt file in the root directory of this source tree.
                                   */ /* eslint-disable global-require */const { nodeInterface, nodeField, nodesField } = (0, _graphqlRelay.nodeDefinitions)((globalId, context) => {const { type, id } = (0, _graphqlRelay.fromGlobalId)(globalId);
  switch (type) {
    case 'User':
      return context.userById.load(id).then((0, _utils.assignType)('User'));
    case 'Email':
      return context.emailById.load(id).then((0, _utils.assignType)('Email'));
    case 'Story':
      return context.storyById.load(id).then((0, _utils.assignType)('Story'));
    case 'Comment':
      return context.commentById.load(id).then((0, _utils.assignType)('Comment'));
    default:
      return null;}

},
obj => {
  switch ((0, _utils.getType)(obj)) {
    case 'User':
      return require('./user/UserType').default;
    case 'Email':
      return require('./user/EmailType').default;
    case 'Story':
      return require('./story/StoryType').default;
    case 'Comment':
      return require('./comment/CommentType').default;
    default:
      return null;}

});exports.nodeInterface = nodeInterface;exports.nodeField = nodeField;exports.nodesField = nodesField;
//# sourceMappingURL=node.js.map
