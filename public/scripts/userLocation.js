const getUsersLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getDistanceFromStore({
        "lat": position.coords.latitude,
        "lng": position.coords.longitude,
      });
    });
  }
}