const express = require('express');
const router  = express.Router();
const { getDistanceFromLocation } = require('../server_scripts/axios');

module.exports = (db, io) => {
  router.post("/distanceFromStore", (req, res) => {
    getDistanceFromLocation(req.body.userCoordinates, (result) => {
      res.send(JSON.stringify(result[0]));
    });
  });

  router.post('/menu/delete/:id', (req, res) => {
    console.log(req.params.id)
    db.deleteMenuItemById(req.params.id)
    .then(results => res.send(results))
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  });

  router.get('/menu/?', (req, res) => {
    db.searchMenuItemByName(req.query.q)
    .then(results => res.send(results))
    .catch(e => {
      console.error(e);
      res.send(e)
  })
  });

  router.post('/menu/new', (req, res) => {
    const { name, category, price, photo_url, description } = req.body;
    db.addItemToMenu(name, category, price, photo_url, description)
    .then( res.redirect('/employee/editmenu/'))
    .catch(e => {
      console.error(e);
      res.send(e)
  })
  })


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
