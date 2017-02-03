var express = require('express');
var app = express();

var ttn = require('ttn');

var appId = 'sauerklaud';
var accessKey = 'ttn-account-v2.AAQToobiTgVh3BGgVUaaY437KaBL8J9HkuM5qEnbcMA';

var client = new ttn.Client('70B3D57EF000373F', appId, accessKey);

client.on('message', function(deviceId, message) {
  console.log(message.payload_raw);
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








