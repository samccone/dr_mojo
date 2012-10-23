Parse.initialize("8kJxzEB8G8Rx3mYk8kM8snrHryd4dtqTMgd7MKpD", "WRSVmPfF7bf8SFl3duTXMx48pTwLWsAZyda3gzFW");

app.models.Score = Parse.Object.extend({
  className: "GameScore"
});

app.models.Scores =  Parse.Collection.extend({
  model: app.models.Score,

  highScore: function(){
    return this.at(0);
  }
});

function LeaderBoard(callback){
  this.board = [];
  this.getScores(callback);
}

LeaderBoard.prototype.getScores = function(callback) {
  var collection = new app.models.Scores();
  var that = this;

  collection.comparator = function(object) {
    return object.get("score");
  };

  collection.fetch({
    success: function(res) {
      res.each(function(object) {
        that.board.push(object.attributes);
      });
      if(callback){
        callback();
      }
    },
    error: function(collection, error) {
      alert("Score collection can't be reached...");
    }
  });
}

LeaderBoard.prototype.highScore = function() {
  return this.board[this.board.length-1]["score"];
}