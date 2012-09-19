var PieceDrawer = (function() {

  pill_images = {};
  ['red', 'green', 'blue'].map(function(color) {
    ['left', 'top', 'right', 'bottom'].map(function(dir, index) {
      pill_images[color+'_'+index] = new Image();
      pill_images[color+'_'+index].src = 'images/'+color+'_'+dir+'.png';
    });
  });

  virus_images = {};
  ['red', 'green', 'blue'].map(function(color) {
    virus_images[color] = new Image();
    virus_images[color].src = 'images/virus_'+color+'.png'
  });

  return {

    drawPiece : function(x, y, color, rotation, drawVirus) {

      var eyesize = 4;
      var mouthsize = 20;

      if (ctx) {
        if (drawVirus === true) {
          virus_images[color] && ctx.drawImage(virus_images[color], x*block_size, y*block_size);
        } else {
          pill_images[color+'_'+rotation] && ctx.drawImage(pill_images[color+'_'+rotation], x*block_size, y*block_size);
        }
      }
    },

    drawVirus: function(position, color) {
      this.drawPiece(position.x, position.y, color, 0, true);
    },

    drawLink: function(position1, position2, color1, color2) {
      if (ctx) {
        var x1 = position1.x;
        var y1 = position1.y;
        var x2 = position2.x;
        var y2 = position2.y;

        if (x1 == x2) {
          ctx.fillStyle = color1;
          ctx.fillRect(x1 * block_size, y1 * block_size + (y2 - y1 + 1) * block_size / 4, block_size, block_size / 2);

          ctx.fillStyle = color2;
          ctx.fillRect(x2 * block_size, y2 * block_size + (y1 - y2 + 1) * block_size / 4, block_size, block_size / 2);

          ctx.fillStyle = "black";
          ctx.fillRect(x2 * block_size, Math.max(y1, y2) * block_size, block_size, 2);
        } else {
          ctx.fillStyle = color1;
          ctx.fillRect(x1 * block_size + (x2 - x1 + 1) * block_size / 4, y1 * block_size, block_size / 2, block_size);

          ctx.fillStyle = color2;
          ctx.fillRect(x2 * block_size + (x1 - x2 + 1) * block_size / 4, y2 * block_size, block_size / 2, block_size);

          ctx.fillStyle = "black";
          ctx.fillRect(Math.max(x1, x2) * block_size, y1 * block_size, 2, block_size);
        }
      }
    }
  }
})();
