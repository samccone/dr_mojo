window.Sound = (function () {
  var RATE = 44100;
  var BUFFER_SIZE = 1000;
  var PI2 = Math.PI * 2;
  var VOLUME = 0.1;

  var buffers = {};
  var ready = false;

  var audioContext = window.AudioContext || window.webkitAudioContext ||
    window.mozAudioContext;

  if (audioContext) {
    var ac = new audioContext();
    ready = true;
  }

  var beep = function () {
    if (!ready) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments);
    var length = args.shift();
    var now = ac.currentTime;
    var node;

    _.each(args, function(freq, index) {
      buffers[freq] = buffers[freq] || prepareBuffer(freq);
      node = ac.createBufferSource(0);
      var start = node.start ? 'start' : 'noteOn';
      var stop  = node.stop  ? 'stop'  : 'noteOff';
      node.buffer = buffers[freq];
      node.loop = true;
      node.connect(ac.destination);
      node[start](now + length * index);
      node[stop](now + length * (index + 1));
    })
  }

  var prepareBuffer = function (freq) {
    var buffer = ac.createBuffer(1, BUFFER_SIZE, RATE);
    var channel = buffer.getChannelData(0);
    var step = freq / RATE;

    for (var i=0; i < BUFFER_SIZE; i++) {
      // square wave
      channel[i] = Math.sin(i * step * PI2) > 0 ? VOLUME : -VOLUME;
    }
    return buffer;
  }

  return {
    rotate : function () { beep(0.03, 400, 420); },
    move   : function () { beep(0.03, 400, 450); }
  }
})();
