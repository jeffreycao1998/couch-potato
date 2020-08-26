const getHourMinute = (time) => {
  time = time.toString();

  const hour = time.slice(16,18);
  const minute = time.slice(19,21);

  return(`${hour}:${minute}`);
};

module.exports = {
  getHourMinute
}