module.exports = function(parse_app) {
  return {
    addHighScore: function(name, score, level, callback) {
      parse_app.insert('GameScore', { name: name, score: score, level: level }, function (err, response) {
        if(callback)
          callback(err, response);
      });
    },

    getHighScore: function(callback) {
      parse_app.findMany('GameScore', '?order=-score&limit=10', function (err, response) {
        if(callback)
          callback(err, response.results);
      });
    }
  }
}
