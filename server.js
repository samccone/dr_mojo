var express = require('express'),
    port    = 8888;

var webServer = express.createServer();

webServer.use(express.static(__dirname + '/public'));

webServer.set("view engine", "jade");
webServer.set('view options', { layout: false });

webServer.get('/play', function(req, res){
  res.render('play_game');
});

webServer.get('/', function(req, res){
  res.render('index');
});

webServer.listen(port);

console.log('Listening on ' + port + '...');
console.log('Press Ctrl + C to stop.');
