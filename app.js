var express = require('express');
var bodyParser = require('body-parser');
var steam = require('./steam');
var steambot = require('./steambot');

var app = express();
var port = process.env.PORT || 3000;

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

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world, it\'s Gabe.') });

// basic error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

// steambot
app.post('/steam', steambot);

app.listen(port, function () {
  console.log('Gabe listening on port ' + port);
});
