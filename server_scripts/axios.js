const axios = require('axios');

const getDistanceFromLocation = ({ lat, lng }, cb) => {
  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=43.8177,-79.1859&destinations=${lat}%2C${lng}&key=AIzaSyBnkvyX1V6CRqhANt3_PyUV8iea3ScrWCg`,
  })
  .then(res => {
    cb(res.data.rows[0].elements)
  })
  .catch(err => console.error(err));
};

module.exports = {
  getDistanceFromLocation,
}