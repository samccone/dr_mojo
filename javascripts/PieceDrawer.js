var PieceDrawer = (function(){
  return {
    drawPiece : function(x, y, color, rotation, drawVirus){
      if(ctx) {
        if (drawVirus === true) {
          // draw an X if we are drawing a Virus
          ctx.fillStyle = color;
          ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.moveTo(x*block_size, y*block_size);
          ctx.lineTo(x*block_size + block_size, y*block_size);
          ctx.lineTo(x*block_size + block_size, y*block_size + block_size);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x*block_size+block_size, y*block_size);
          ctx.lineTo(x*block_size + block_size, y*block_size + block_size);
          ctx.lineTo(x*block_size, y*block_size+block_size);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x*block_size, y*block_size);
          ctx.lineTo(x*block_size, y*block_size+block_size);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x * block_size + block_size/2,y * block_size + block_size/2, block_size/2, block_size/2, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();
          switch (rotation){
          	case 0:
              ctx.fillRect((x+.5)*block_size, y*block_size, block_size/2, block_size);
              ctx.fillStyle = 'black'
              ctx.fillRect((x+1)*block_size, y*block_size, -2, block_size);
              break;
          	case -3:
          	case 1:
              ctx.fillRect(x*block_size, (y+.5)*block_size, block_size, block_size/2);
              ctx.fillStyle = 'black'
              ctx.fillRect(x*block_size, (y+1)*block_size, block_size, -2);
              break;
          	case -2:
          	case 2:
              ctx.fillRect(x*block_size, y*block_size, block_size/2, block_size);
              ctx.fillStyle = 'black'
              ctx.fillRect(x*block_size, y*block_size, 2, block_size);
              break;
          	case -1:
          	case 3:
              ctx.fillRect(x*block_size, y*block_size, block_size, block_size/2);
              ctx.fillStyle = 'black'
              ctx.fillRect(x*block_size, y*block_size, block_size, 2);
              break;
          }
        }
      }
    },

    drawVirus : function(position, color) {
      this.drawPiece(position.x, position.y, color, 0, true);
    },

    drawLink : function(position1, position2, color1, color2) {
      if (ctx) {
        var x1 = position1.x
        var y1 = position1.y
        var x2 = position2.x
        var y2 = position2.y

        if (x1 == x2){
          ctx.fillStyle = color1;
          ctx.fillRect(x1*block_size, y1*block_size+(y2-y1+1)*block_size/4, block_size, block_size/2);

          ctx.fillStyle = color2;
          ctx.fillRect(x2*block_size, y2*block_size+(y1-y2+1)*block_size/4, block_size, block_size/2);

          ctx.fillStyle = "black";
          ctx.fillRect(x2*block_size, Math.max(y1,y2)*block_size, block_size, 2);
        } else {
          ctx.fillStyle = color1;
          ctx.fillRect(x1*block_size+(x2-x1+1)*block_size/4, y1*block_size, block_size/2, block_size);

          ctx.fillStyle = color2;
          ctx.fillRect(x2*block_size+(x1-x2+1)*block_size/4, y2*block_size, block_size/2, block_size);

          ctx.fillStyle = "black";
          ctx.fillRect(Math.max(x1,x2)*block_size, y1*block_size, 2, block_size);
        }
      }
    }
  }
})();
