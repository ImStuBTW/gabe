'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;
function index(req, res) {
  var template = req.app.get('template');
  res.render(template);
}
module.exports = exports['default'];