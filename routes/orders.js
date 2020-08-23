const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });
  
  return router;
};
