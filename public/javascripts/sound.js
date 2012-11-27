window.Sound = (function() {

  var sounds = {
    rotate: "/wav/rotate.wav",
    move: "/wav/move.wav",
    explode: "/wav/explode.wav",
    fever: "/mp3/fever.mp3",
    chill: "/mp3/chill.mp3"
  };

  return {

    song: false,
    canPlay: false,
    operative: false,

    init: function() {
      var _this = this;
      soundManager.setup({
        url: '/flash/',
        onready: function() {
          _.each(sounds, function(url, id) {
            soundManager.createSound({
              id: id,
              url: url
            });
          });
          _this.canPlay = true;
          _this.musicPlay();
        }
      });
    },

    rotate: function() {
      if (this.operative) {
        soundManager.play("rotate");
      }
    },

    move: function() {
      if (this.operative) {
        soundManager.play("move");
      }
    },

    explode: function() {
      if (this.operative) {
        soundManager.play("explode");
      }
    },

    musicSet: function(song) {
      this.song = song;
      if(this.canPlay) {
        this.musicStop();
        this.musicPlay();
      }
    },

    musicPlay: function() {
      if(this.song) {
        this.operative = true;
        soundManager.play(this.song, {
          onfinish: this.musicPlay
        });
      }
    },

    musicStop: function() {
      this.operative = false;
      soundManager.stopAll();
    },

    toggleOnOff: function(){
      if (this.operative) {
        this.musicStop();
      } else {
        this.musicPlay();
      }
    }
  };

})();