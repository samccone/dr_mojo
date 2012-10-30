module.exports = function(parse_app) {
  return {
    addHighScore: function(name, score, callback) {
      parse_app.insert('GameScore', { score: score }, function (err, response) {
        if(callback)
          callback(err, response);
      });
    },

    getHighScore: function(callback) {
      parse_app.findMany('GameScore', '?order=-score&limit=1', function (err, response) {
        if(callback)
          callback(err, response.results);
      });
    }
  }
}
