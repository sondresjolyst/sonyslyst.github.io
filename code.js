var initialSpan = 150;
var spanFactor = 0.9;

var clockTimer;
var span = initialSpan;
var clicks = 0

function init() {
  var deadline = (new Date()) * 1 + 60 * 1000;
  var correctHue = Math.floor(Math.random() * 361);
  var correctHsl = "hsl(" + correctHue + ", 50%, 70%)";
  var correctTd = Math.floor(Math.random() * 9);
  var assignedColors = [];

  $(".right-color").css({
    background: correctHsl
  });

  $("td").each(function() {
    do {
      hue = Math.floor(Math.random() * 2 * span) + correctHue - span;

      var hueEqualsCorrectHue = hue === correctHue;
      var hueHasBeenAssigned = assignedColors.some(function(e) {
        return e === hue;
      });
    } while (hueEqualsCorrectHue || hueHasBeenAssigned);

    var hsl = "hsl(" + hue + ", 50%, 70%)";

    assignedColors.push(hue);
    $(this).css({
      background: hsl
    });
  });

  $($("td")[correctTd]).css({
    background: correctHsl
  });

  initializeClock('clockdiv', deadline);
}

$("td").click(function() {
  var rgb = $(this).css("backgroundColor");
  var correctRgb = $(".right-color").css("backgroundColor");

  if (rgb === correctRgb) {
    span *= spanFactor;
    init();
    clicks++;
  } else {
    assignedColors = []
    span = initialSpan;
    //alert("Wrong Color!");
    clicks = 0;
    init();
  }
  $("#clicks").html(clicks);
});

init();

//Clock!

function getTimeRemaining(endtime) {
  var t = endtime - (new Date());
  var seconds = Math.floor(t / 1000);
  return {
    'total': t,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockTimer);
      alert("Your time is up!");
      clicks = 0;
      init();
    }
  }

  updateClock();
  if (clockTimer) {
    clearInterval(clockTimer);
  }
  clockTimer = setInterval(updateClock, 1000);
}