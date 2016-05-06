'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = api;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// make an api call
//
// usage:
//
//   api('https://slack.com/api/api.test', 'fake-token', (err, data)=> {
//
//   })
//
function api(url, token, callback) {
  // defaults
  var headers = { Accept: 'application/json' };
  var json = true;
  var form = { token: token };
  var query = { url: url, headers: headers, form: form, json: json };

  _request2.default.post(query, function (err, res) {
    if (err) {
      callback(err);
    } else if (res.body.error) {
      callback(res.body.error);
    } else {
      var _json = res.body;
      delete _json.ok;
      callback(null, _json);
    }
  });
}
module.exports = exports['default'];