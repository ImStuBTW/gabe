'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = register;

var _save = require('./save');

var _save2 = _interopRequireDefault(_save);

var _api2 = require('./_api');

var _api3 = _interopRequireDefault(_api2);

var _token2 = require('./_token');

var _token3 = _interopRequireDefault(_token2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(token, callback) {
  var url = 'https://slack.com/api/auth.test';
  (0, _api3.default)(url, token, callback);
}

// register app to a slack team
function register(code, callback) {
  (0, _token3.default)(code, function (err, access_token) {
    if (err) {
      callback(err);
    } else {
      (function () {
        var token = access_token;
        var owner = true;

        test(token, function (err, acct) {
          if (err) {
            callback(err);
          } else {
            var user_id = acct.user_id;
            var team_id = acct.team_id;

            (0, _save2.default)({ token: token, owner: owner, user_id: user_id, team_id: team_id }, callback);
          }
        });
      })();
    }
  });
}
module.exports = exports['default'];