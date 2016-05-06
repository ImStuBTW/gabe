'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = token;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function token(code, callback) {

  // params
  var url = 'https://slack.com/api/oauth.access';
  var client_id = process.env.SLACK_CLIENT_ID;
  var client_secret = process.env.SLACK_CLIENT_SECRET;

  // defaults
  var headers = { Accept: 'application/json' };
  var json = true;
  var form = { code: code, client_id: client_id, client_secret: client_secret };
  var query = { url: url, headers: headers, form: form, json: json };

  console.log(form);

  _request2.default.post(query, function (err, res) {
    if (err) {
      callback(err);
    } else if (res.body.error) {
      callback(res.body.error);
    } else {
      var _json = res.body;
      delete _json.ok;
      callback(null, _json.access_token);
    }
  });
}
module.exports = exports['default'];