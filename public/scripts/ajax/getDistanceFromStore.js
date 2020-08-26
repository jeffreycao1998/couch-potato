const getDistanceFromStore = (userCoordinates) => {
  $.ajax({
    url: '/api/distanceFromStore',
    method: 'POST',
    data: { userCoordinates },
  })
  .then(res => {
    const { distance, duration } = JSON.parse(res);

    $('.user-location').css('display', 'flex');
    $('.location-distance').text(`${distance.text}`);
    $('.location-drivingtime').text(`Driving: ${duration.text}`);
  });

};