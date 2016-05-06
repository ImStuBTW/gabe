'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _save = require('../adapters/dynamo/save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _save2.default; // TODO add redis adapter logic

module.exports = exports['default'];