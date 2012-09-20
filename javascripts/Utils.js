var Utils = (function() {
  return {
    shading : function(toggle, message) {
      if(toggle){
        var shadow = document.getElementById('shadow');
        if(shadow){
          var shadingText = document.getElementById('shadingText');
          shadingText.innerHTML = message;

          shadow.appendChild(shadingText);
        } else {
          var shadingText = document.createElement('div');
          shadingText.setAttribute('id', 'shadingText');
          shadingText.innerHTML = message;

          var shadow = document.createElement('div');
          shadow.setAttribute('id', 'shadow');
          shadow.appendChild(shadingText);

          document.body.appendChild(shadow);
        }
      } else {
        var shadow = document.getElementById('shadow');
        shadow.parentNode.removeChild(shadow);
      }
    }
  }
})();