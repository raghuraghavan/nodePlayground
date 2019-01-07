"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.












assignType = assignType;exports.







getType = getType;exports.




mapTo = mapTo;exports.










mapToMany = mapToMany;exports.










mapToValues = mapToValues; /**
                            * Copyright © 2016-present Kriasoft.
                            *
                            * This source code is licensed under the MIT license found in the
                            * LICENSE.txt file in the root directory of this source tree.
                            */ /*
                                * Helper functions for data loaders (src/Context.js)
                                * -------------------------------------------------------------------------- */function assignType(type) {return obj => {// eslint-disable-next-line no-underscore-dangle, no-param-reassign
    if (obj) obj.__type = type;return obj;};}function getType(obj) {// eslint-disable-next-line no-underscore-dangle
  return obj ? obj.__type : undefined;}function mapTo(keys, keyFn) {return rows => {const group = new Map(keys.map(key => [key, null]));rows.forEach(row => group.set(keyFn(row), row));return Array.from(group.values());};}function mapToMany(keys, keyFn) {return rows => {const group = new Map(keys.map(key => [key, []]));rows.forEach(row => (group.get(keyFn(row)) || []).push(row));return Array.from(group.values());};}function mapToValues(keys, keyFn, valueFn) {return rows => {const group = new Map(keys.map(key => [key, null]));rows.forEach(row => group.set(keyFn(row), valueFn(row)));return Array.from(group.values());};
}
//# sourceMappingURL=index.js.map
