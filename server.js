var express = require('express'),
    port    = 8888;

var webServer = express.createServer();

webServer.use(express.static(__dirname + '/public'));
webServer.use(express.static(__dirname + '/src'));

webServer.set('views', __dirname);

webServer.get('/', function(req, res){
  res.render('index');
});

webServer.listen(port);

console.log('Listening on ' + port + '...');
console.log('Press Ctrl + C to stop.');
