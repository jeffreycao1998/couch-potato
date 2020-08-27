const getDistanceFromStore = (userCoordinates) => {
  $.ajax({
    url: '/api/distanceFromStore',
    method: 'POST',
    data: { userCoordinates },
  })
  .then(res => {
    const { distance } = JSON.parse(res);

    $('.location-distance').text(`${distance.text}`);
  });

};