const express = require('express');
const router  = express.Router();
const { getDistanceFromLocation } = require('../serverFunctions/axios');

module.exports = (db) => {
  router.get("/distanceFromStore", (req, res) => {
    getDistanceFromLocation({ lat: 43.795712, lng: -79.340424 }, (result) => {
      console.log(result);
      res.send(result);
    });
  });
  
  return router;
};
