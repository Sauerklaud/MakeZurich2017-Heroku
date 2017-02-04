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

  var rawstr = message.payload_raw.toString()
  var data = rawstr.split(";")

  pusher.trigger('my-channel', 'my-event', {
        "pm10": data[1],
        "pm25": data[0],
        "latitude": data[2],
        "longitude": data[3],
        "timestamp": data[4],
        "meas_id": '4342',
        "isValid": 'true'
    });
});

app.get('/sendfakedata', function(request, response) {
  setTimeout(function(){ 

    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.385098',
        "longitude": '8.521089',
        "timestamp": '2343242',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 1000);  
  setTimeout(function(){ 

    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.385436',
        "longitude": '8.521339',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 2000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.385701',
        "longitude": '8.521618',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 3000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.385872',
        "longitude": '8.521790',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 4000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.386002',
        "longitude": '8.522074',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 5000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.386039',
        "longitude": '8.522739',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 6000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '43',
        "latitude": '47.386282',
        "longitude": '8.523313',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 7000);  

    response.render('pages/fakedatasent');
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









