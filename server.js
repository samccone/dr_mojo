var express = require('express'),
    port    = 8888;

var oneYear = 31557600000;

var app = express.createServer();

app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
app.set("view engine", "jade");
app.set('view options', { layout: false });

app.get('/play', function(req, res){
  res.render('play_game');
});

app.get('/restart', function(req, res) {
  res.render('play_game');
});

app.get('/', function(req, res){
  res.render('index');
});

app.listen(port);

console.log('Listening on ' + port + ' in ' + app.settings.env + ' mode ...');
console.log('Press Ctrl + C to stop.');