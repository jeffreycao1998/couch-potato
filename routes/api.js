const express = require('express');
const router  = express.Router();
const { getDistanceFromLocation } = require('../server_scripts/axios');

module.exports = (db) => {
  router.get("/distanceFromStore", (req, res) => {
    getDistanceFromLocation({ lat: 43.795712, lng: -79.340424 }, (result) => {
      console.log(result);
      res.send(result);
    });
  });

  router.get('/menu/:id', (req, res) => {
    db.getMenuItemsByCategory(req.params.id)
    .then(menuItems => res.send(menuItems))
    .catch(e => {
        console.error(e);
        res.send(e)
    })
  });

  return router;
};
