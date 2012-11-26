var express = require('express'),
    port    = 8888;

var oneYear = 31557600000;

var app = express.createServer();

var Parse      = require('node-parse-api').Parse;
var APP_ID     = "8kJxzEB8G8Rx3mYk8kM8snrHryd4dtqTMgd7MKpD";
var MASTER_KEY = "DSgulGiahlyXFJ1s9qvSPRW4hdeKrgiozv7U12NS";
var parse_app  = new Parse(APP_ID, MASTER_KEY);

var score = require('./public/javascripts/score.js')(parse_app);

app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));
app.use(express.bodyParser());
app.use(express.csrf());

app.dynamicHelpers({
  token: function(req, res) {
    return req.session._csrf;
  }
});

app.set("view engine", "jade");
app.set('view options', { layout: false });

app.get('/play', function(req, res){
  res.render('play_game');
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/highscore', function(req, res){
  score.getHighScore(function(err, response) {
    res.json({"error": err, "data": response});
  });
});

app.post('/highscore', function(req, res) {
  score.addHighScore(req.body.name, req.body.score, req.body.level, function(err, data) {
    res.json({"error": err, "data": data});
  })
});

app.listen(port);

console.log('Listening on ' + port + ' in ' + app.settings.env + ' mode ...');
console.log('Press Ctrl + C to stop.');
