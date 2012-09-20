var Utils = (function() {
  return {
    stringifyStyles : function(object) {
      var string = '';
      for (attr in object) { string += attr + ':' + object[attr] + ';' }
      return string;
    },

    shading : function(toggle) {
      if(toggle){
        var styles = {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          'z-index': 2000
        };
        var css = this.stringifyStyles(styles);

        var pause = document.createElement('div');
        pause.setAttribute('id', 'pause');
        pause.innerHTML = 'Pause';

        var shadow = document.createElement('div');
        shadow.setAttribute('style', css);
        shadow.setAttribute('id', 'shadow');
        shadow.appendChild(pause);

        document.body.appendChild(shadow);
      } else {
        var shadow = document.getElementById('shadow');
        shadow.parentNode.removeChild(shadow);
      }
    }
  }
})();