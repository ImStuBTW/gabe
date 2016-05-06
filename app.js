var express = require('express');
var slack = require('slack-express');
var bodyParser = require('body-parser');
var steam = require('./steam');

var app = express();
var port = 3003;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

// basic error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

// hellobot
app.post('/gabe', function(req, res, error) {
    steam.find(req.body.text).then(function(message) {
        message.attachments[0].fields.forEach(function(thing) {
            console.log(thing);
        });
    });
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});

// Configure CronJob to run at midnight and noon.
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0,12 * * *', function() {
  console.log('CronJob Interation Executed.');
  steam.populate();
  }, function () {
      console.log('CronJob Ended.');
  },
  true // Start the job right now
);

// Update Database On Launch
steam.populate();
