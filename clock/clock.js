function updateTime() {
  // create new date object for the current moment
  var now = new Date();

  // get the current hours, minutes, and seconds
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // add 0's before single-digit numbers
  hours = pad(hours);
  minutes = pad(minutes);
  seconds = pad(seconds);

  // update the HTML with the current time
  var time = hours + ':' + minutes + ':' + seconds;
  document.getElementById('clock').innerHTML = time;

  // update the clock again in 10 milliseconds
  setTimeout(updateTime, 10);
}


function pad(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}

updateTime();
