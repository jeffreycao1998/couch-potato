const getDistanceFromStore = (userCoordinates) => {
  $.ajax({
    url: '/api/distanceFromStore',
    method: 'POST',
    data: { userCoordinates },
  })
  .then(res => {
    const { distance, duration } = JSON.parse(res);

    $('.location-distance').text(`${distance.text}`);
    $('.location-drivingtime').text(`Driving: ${duration.text}`);
  });

};