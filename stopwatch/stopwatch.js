var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var clock = document.getElementById('clock');
var timeout;
var hours;
var minutes;
var seconds;
var milliseconds;
var prev;
var running = false;

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);


function start() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  prev = Date.now();
  running = true;
  update();
}

function stop() {
  clearTimeout(timeout);
}

function update() {
  var timeToAdd = Date.now() - prev;

  milliseconds += timeToAdd;

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  }


  clock.innerHTML = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '(' + milliseconds + ')';

  if (running === true) {
    prev = Date.now();
    timeout = setTimeout(update, 10);
  }
}

function pad(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}
