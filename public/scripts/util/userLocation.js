const getUsersLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoords = {
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      }

      loadMap(userCoords);
      getDistanceFromStore({
        "lat": position.coords.latitude,
        "lng": position.coords.longitude,
      });
    });
  }
}