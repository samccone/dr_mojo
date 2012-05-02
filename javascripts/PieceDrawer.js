var PieceDrawer = (function(){
  return {
    drawPiece : function(x, y, color, drawVirus){
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
		}
      }
    },

	drawVirus : function(position, color) {
		this.drawPiece(position.x, position.y, color, true);
	}
  }
})();
