var request = require('request');
var steam = require('./steam');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {};

  var immediateResponse = {
      "response_type" : "in_channel"
  };

  send(immediateResponse, function (error, status, body) {
  });

  /*if (!req.body.text) {
      return res.status(200).send('Please Input A Game Title');
  }*/

  // write response message and add to payload
  botPayload.text = "Hey " + userName + "! Here's what I could find about <http://store.steampowered.com/app/413150|Stardew Valley> on Steam.";
  botPayload.unfurl_links = false;
  botPayload.attachments = [
      {
          "fallback": "Here's what I could find about Stardew Valley on Steam. It's $14.99 and can be found here: http://store.steampowered.com/app/413150",
          "color": "#818182",
          "fields": [
              {
                  "title": "Price",
                  "value": "$14.99 (0% Off)",
                  "short": true
              },
              {
                  "title": "Release Date",
                  "value": "Feb 26, 2016",
                  "short": true
              },
              {
                  "title": "Genres",
                  "value": "Indie, RPG, Simulation",
                  "short": true
              },
              {
                  "title": "Platforms",
                  "value": "PC, Mac",
                  "short": true
              }
          ],
          "image_url": "https://steamcdn-a.akamaihd.net/steam/apps/256660296/movie.293x165.jpg"
      }
  ];
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
