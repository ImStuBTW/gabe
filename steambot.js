var request = require('request');
var steam = require('./steam');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {};

  var immediateResponse = {
      "response_type" : "in_channel"
  };

  res.status(200).send(immediateResponse);

  if (!req.body.text) {
      return res.status(200).send({'text': 'Please Input A Game Title'});
  }
  else {
      botPayLoad = steam.find(req.body.text);
  }

  // write response message and add to payload
  botPayload.username = 'Gabe';
  botPayload.channel = req.body.channel_id;
  botPayload.response_type = 'in_channel';
  botPayload.icon_emoji = ':video_game:';
  botPayload.response_url = req.body.response_url;

  // send game info
  send(botPayload, function (error, status, body) {
    if (error) {
      return next(error);

    } else if (status !== 200) {
      // inform user that our Incoming WebHook failed
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));

    } else {
      return res.status(200).end();
    }
  });
}


function send (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services' + path;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
