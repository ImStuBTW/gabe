'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _find = require('../adapters/dynamo/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _find2.default; // TODO add redis adapter logic

module.exports = exports['default'];