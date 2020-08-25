const loadMap = ({ userLat, userLng }) => {

  $('.google-map').html(`
    <iframe
      width="450"
      height="250"
      frameborder="0" style="border:0"
      src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBnkvyX1V6CRqhANt3_PyUV8iea3ScrWCg&origin=${userLat},${userLng}&destination=Toronto+Zoo&avoid=tolls" allowfullscreen>
    </iframe>`
  );
}