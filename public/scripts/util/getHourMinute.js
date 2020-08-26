const getHourMinute = (time) => {
  time = time.toString();

  let hour = Number(time.slice(11,13)) - 4;
  let minute = time.slice(14,16);

  if (hour < 10) {
    hour = '0' + hour.toString();
  }

  return(`${hour}:${minute}`);
};