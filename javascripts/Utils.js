var Utils = (function() {
  return {
    shading : function(toggle) {
      if(toggle){
        var pause = document.createElement('div');
        pause.setAttribute('id', 'pause');
        pause.innerHTML = 'Pause';

        var shadow = document.createElement('div');
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