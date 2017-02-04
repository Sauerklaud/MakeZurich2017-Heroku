var express = require('express');
var app = express();

var ttn = require('ttn');

var appId = 'sauerklaud';
var accessKey = 'ttn-account-v2.AAQToobiTgVh3BGgVUaaY437KaBL8J9HkuM5qEnbcMA';
var client = new ttn.Client('eu', appId, accessKey);

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://back:1234@ds035059.mlab.com:35059/heroku_mqq5pbhp');


var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '298067',
  key: '256b563cc59616398c15',
  secret: 'ad03aff71ebb5af9bacc',
  cluster: 'eu',
  encrypted: true
});

client.on('message', function(deviceId, message) {
  console.log(message.payload_raw);

  var collection = db.get('airquality');
  collection.insert({
    "raw" : message.payload_raw.toString(),
  }, function (err, doc) {
  if (err) {
    console.log('Insert DB Error!');
  } 
  });

  //pusher.trigger('my-channel', 'my-event', {
  //  "message": "hello world"
  //});
});

var path = require('path')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









