function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  $('.employee-sign').html(h + ":" + m);
  var t = setTimeout(startTime, 10000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

$(document).ready(() => {
  startTime();
});