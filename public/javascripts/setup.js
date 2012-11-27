var speeds = ["LOW", "MED", "HI"];
var musics = ["fever", "chill", "off"];

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

  $("#level_slider").slider({
    value:0,
    min: 0,
    max: 20,
    step: 1,
    change: function( event, ui ) {
      $("#level_amount").html( ui.value );
    }
  });
  $("#level_slider .ui-slider-handle").unbind("keydown");

  $("#speed_slider").slider({
    min: 0,
    max: speeds.length - 1,
    step: 1
  });
  $("#speed_slider .ui-slider-handle").unbind("keydown");

  $("#music_slider").slider({
    min: 0,
    max: musics.length - 1,
    step: 1,
    change: setMusic
  });
  $("#music_slider .ui-slider-handle").unbind("keydown");

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

  $("#level_canvas").on("click", function(e) {
    var value = Math.round(Math.min(Math.max((e.offsetX - 20) / 320 * 20, 0), 20));
    $("#level_amount").html(value);
    $("#level_slider").slider("value", value);
    setFocus("level");
  });

   $("p",".options").each(function(i,element) {
    $(element).on("click", function() {
      if(i < 3) {
        $("#speed_slider").slider("value", i % 3);
        setFocus("speed");
      } else {
        $("#music_slider").slider("value", i % 3);
        setFocus("music");
      }
    });
  });

  setFocus();

  Sound.init()
  setMusic()

});

var focused = 0;
var focus_order = ["level", "speed", "music"];
var focus_handles = {
  level: "#level_slider .ui-slider-handle",
  speed: "#speed_slider .ui-slider-handle",
  music: "#music_slider .ui-slider-handle"
};
var focus_values = {
  level: "#level_slider",
  speed: "#speed_slider",
  music: "#music_slider"
};

var setFocus = function(option) {

  if(!option) {
    $(focus_handles[focus_order[focused]]).focus();
  } else {
    $(focus_handles[option]).focus();
    focused = focus_order.indexOf(option);
  }

}

var setFocusNext = function() {
  focused = (focused + 1) % focus_order.length;
  $(focus_handles[focus_order[focused]]).focus();
}

var setFocusPrev = function() {
  focused = focused === 0 ? focus_order.length - 1 : focused - 1;
  $(focus_handles[focus_order[focused]]).focus();
}

var goLeft = function() {
  var new_value = $(focus_values[focus_order[focused]]).slider("value") - 1;
  $(focus_values[focus_order[focused]]).slider("value", new_value);
}

var goRight = function() {
  var new_value = $(focus_values[focus_order[focused]]).slider("value") + 1;
  $(focus_values[focus_order[focused]]).slider("value", new_value);
}

var setMusic = function () {
  var music = musics[$("#music_slider").slider("value")];
  if (music != "off") {
    Sound.musicSet(music);
  } else {
    Sound.musicStop();
  }
}

$(window).on('keydown', function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);

  switch (code) {
  case 13:
    start();
    break;
  case 37:
    goLeft();
    break;
  case 38:
    setFocusPrev();
    break;
  case 39:
    goRight();
    break;
  case 40:
    setFocusNext();
    break;
  }
});