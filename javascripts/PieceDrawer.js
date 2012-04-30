var PieceDrawer = (function(){
  return {
    drawPiece : function(x, y, color){
    	if(ctx) {
	      ctx.fillStyle = color;
	      ctx.beginPath();
	      ctx.arc(x * block_size + block_size/2,y * block_size + block_size/2, block_size/2, block_size/2, Math.PI*2, true);
	      ctx.closePath();
	      ctx.fill();
    	}
    }
  }
})();