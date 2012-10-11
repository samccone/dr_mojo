MIDIPlayer = function (url) {
  this.loaded = false;
  this.load(url)
};

MIDIPlayer.prototype = {
  load: function (url) {
    var self = this;

    var fetch = new XMLHttpRequest();
    fetch.open('GET', url);
    fetch.overrideMimeType("text/plain; charset=x-user-defined");
    fetch.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        /* munge response into a binary string */
        var t = this.responseText || "" ;
        var ff = [];
        var mx = t.length;
        var scc= String.fromCharCode;
        for (var z = 0; z < mx; z++) {
          ff[z] = scc(t.charCodeAt(z) & 255);
        }
        self.data = ff.join("");
        self.midifile = MidiFile(self.data);
        self.synth = Synth(44100);
        self.replayer = Replayer(self.midifile, self.synth);
        self.aplayer = AudioPlayer(self.replayer);

        self.loaded = true;
      }
    }
    fetch.send();
  }
}

