var express = require('express'),
    port    = 8888;

var oneYear = 31557600000;

var webServer = express.createServer();

webServer.use(express.static(__dirname + '/public', { maxAge: oneYear }));
webServer.set("view engine", "jade");
webServer.set('view options', { layout: false });

webServer.get('/play', function(req, res){
  res.render('play_game');
});

webServer.get('/restart', function(req, res) {
  res.render('play_game');
});

webServer.get('/', function(req, res){
  res.render('index');
});

webServer.listen(port);

console.log('Listening on ' + port + ' in ' + webServer.settings.env + ' mode ...');
console.log('Press Ctrl + C to stop.');
