MIDIPlayer = function () {

  this.played = false;
};

MIDIPlayer.prototype = {
  play: function () {
    if (!this.file) {
      return false;
    }
    this.promise.done(_.bind(this.playMidi, this));
  },

  stop: function () {
    if (!this.file) {
      return false;
    }

    this.promise.done(_.bind(this.stopMidi, this));
  },

  load: function (url) {
    this.file = url;
    var self = this;

    this.promise = $.Deferred();

    var fetch = new XMLHttpRequest();
    fetch.open('GET', url);
    fetch.overrideMimeType("text/plain; charset=x-user-defined");
    fetch.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        var t = this.responseText || "" ;
        var ff = [];
        var mx = t.length;
        for (var z = 0; z < mx; z++) {
          ff[z] = String.fromCharCode(t.charCodeAt(z) & 255);
        }
        self.data = ff.join("");
        self.promise.resolve();
      }
    }
    fetch.send();
  },

  playMidi: function () {
    if (this.playing) {
      return false;
    }

    this.midifile = MidiFile(this.data);
    this.synth = Synth(44100);
    this.replayer = Replayer(this.midifile, this.synth);
    this.aplayer = AudioPlayer(this.replayer);
    this.playing = true;
  },

  stopMidi: function () {
    if (!this.playing) {
      return false;
    }

    this.aplayer.stop();
    this.playing = false;
  }


}

