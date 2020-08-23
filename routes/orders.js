const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.post("/place_order", (req, res) => {
    const { name, mobile, cart } = req.body;

    db.addClient({name, mobile}, (res) => {
      console.log(res);
    });

    console.log(db);

    res.send('works');
  });
  // console.log(db);
  
  return router;
};
