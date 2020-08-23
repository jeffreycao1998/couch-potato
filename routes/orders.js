const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.post("/place_order", (req, res) => {
    console.log(req.body);
    res.send('works');
  });
  
  return router;
};
