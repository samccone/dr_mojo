var speeds = ["LOW", "MED", "HI"];
var musics = ["FEVER", "CHILD", "OFF"];
var midiFiles = { 'FEVER' : 'master01.mid', 'CHILD' : 'master02.mid' };

drawingConfig = {
  level_count:      20,
  level_line_size:  340,
  level_start_x:    20,
  level_start_y:    5,
  level_end_y:      15,
  level_slice_size: 16
};

function Setup() {
  this.level = $( "#level_slider" ).slider( "value" );
  this.speed = speeds[ $( "#speed_slider" ).slider( "value" ) ];
  this.music = musics[ $( "#music_slider" ).slider( "value" ) ];
};

function start(){
  var settings = new Setup();

  window.location.href = "play?" + jQuery.param(settings);
};

function populateLeaderBoard(){

  var board    = $("tbody","#leader_board"),
      template = _.template([
    "<% _.times(5, function(i) { %>",
    "  <tr>",
    "    <td><%= ['1st','2nd','3rd','4th','5th'][i] %></td>",
    "    <td><%= leaders[i] && leaders[i].score || '***' %></td>",
    "    <td><%= leaders[i] && leaders[i].level || '***' %></td>",
    "    <td><%= leaders[i] && leaders[i].name || '***' %></td>",
    "  </tr>",
    "<% }); %>"
  ].join(""));

  board.html(template({
    leaders: []
  }));

  $.get("/highscore", {}, function(response) {
    board.html(template({
      leaders: _.sortBy(response.data, function(leader){
        return parseInt(leader.score);
      }).reverse()
    }));
  });

};

function drawLevelLine(){
  var canvas = document.getElementById("level_canvas"),
      context = canvas.getContext("2d");

  context.strokeStyle = 'white';
  context.lineWidth   = 2;

  context.beginPath();
  context.moveTo(drawingConfig.level_start_x, 10);
  context.lineTo(drawingConfig.level_line_size, 10);
  context.stroke();
  context.closePath();

  for (i=0; i <= drawingConfig.level_count; i++){
    var x = drawingConfig.level_start_x + i * drawingConfig.level_slice_size,
        start_y = drawingConfig.level_start_y,
        end_y = drawingConfig.level_end_y;

    if(i % 5 == 0){
      start_y -= 5;
      end_y += 5;
    }

    context.beginPath();
    context.moveTo(x, start_y);
    context.lineTo(x, end_y);
    context.stroke();
    context.closePath();
  }
}

$(function(){
  $( "#level_slider" ).slider({
    value:0,
    min: 0,
    max: 20,
    step: 1,
    slide: function( event, ui ) {
      $( "#level_amount" ).html( ui.value );
    }
  });

  $( "#speed_slider" ).slider({
    min: 0,
    max: speeds.length - 1,
    step: 1
  });

  $( "#music_slider" ).slider({
    min: 0,
    max: musics.length - 1,
    step: 1,
    change: setMusic
  });

  $("#play").bind('click', function(){
    start();
    return false;
  });

  drawLevelLine();

  populateLeaderBoard();

  $('#level_slider .ui-slider-handle').focus(function() {
    $("#level_title").addClass('border');
    $("#speed_title").removeClass('border');
    $("#music_title").removeClass('border');
  });

  $('#speed_slider .ui-slider-handle').focus(function() {
    $("#speed_title").addClass('border');
    $("#level_title").removeClass('border');
    $("#music_title").removeClass('border');
  });

  $('#music_slider .ui-slider-handle').focus(function() {
    $("#music_title").addClass('border');
    $("#speed_title").removeClass('border');
    $("#level_title").removeClass('border');
  });

  setMusic();
});

var player;
var setMusic = function () {
  var music = musics[ $( "#music_slider" ).slider( "value" ) ];
  var midiFile = midiFiles[music];

  player = player || new MIDIPlayer();

  if (midiFile) {
    player.stop();
    player.load('/midi/' + midiFile);
    player.play();
  } else {
    player.stop();
  }
}

window.addEventListener('keydown', function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);

  switch (code) {
  case 13:
    start();
    break;
  case 38:
    console.log('up');
    break;
  case 40:
    console.log('down');
    break;
  }
});