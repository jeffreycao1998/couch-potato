const getDistanceFromStore = (userCoordinates) => {

  $.get('/api/distanceFromStore', (req, res) => {
    console.log(res);
  });
};