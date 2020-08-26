const express = require('express');
const router  = express.Router();
const { getDistanceFromLocation } = require('../server_scripts/axios');

module.exports = (db, io) => {
  router.post("/distanceFromStore", (req, res) => {
    getDistanceFromLocation(req.body.userCoordinates, (result) => {
      res.send(JSON.stringify(result[0]));
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

  // router.post('/menu/new', (req, res) => {
  //   res.send(req.body);
  // })



  return router;
};
