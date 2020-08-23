const getDistanceFromStore = (userCoordinates) => {
  console.log(userCoordinates);
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

    // don't remove, don't use the api if not working on it!
    console.log('comment out getUsersLocation() in scripts/app.js');
  });

};