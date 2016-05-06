'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scope = 'incoming-webhook,commands';

function button() {
  var client_id = process.env.SLACK_CLIENT_ID;
  return '<a href="https://slack.com/oauth/authorize?scope=' + scope + '&client_id=' + client_id + '">\n      <img alt="Add to Slack"\n        height="40"\n        width="139"\n        src="https://platform.slack-edge.com/img/add_to_slack.png"\n        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x">\n    </a>';
}

exports.default = button;
module.exports = exports['default'];