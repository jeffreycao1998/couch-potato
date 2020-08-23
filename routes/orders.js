const express = require('express');
const router  = express.Router();
const { sendSMS } = require('../server_scripts/sendSMS');

let confirmationData;

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.get('/confirmation', (req, res) => {
    res.render('confirmation', confirmationData);
  });

  router.post("/place_order", (req, res) => {
    const { name, mobile, message } = req.body;
    const cart = JSON.parse(req.body.cart);

    db.findClient(name, mobile)
    .then(client => {
      if (!client) {
        db.addClient({name, mobile})
        .then((client) => {
          db.createOrder(client.id, message)
          .then(order => {
            let total = 0;
            for (let itemId in cart) {
              const quantity = cart[itemId].quantity;
              const price = cart[itemId].price * quantity;
              total += total;

              db.addItemToOrder(order.id, itemId, quantity, price)
            }
            // sendSMS(`Hi, ${name}. Your order number is ${order.id}. Your total is $${total / 100}.`, mobile);
            confirmationData = {
              client,
              order,
              total,
            }
            return res.end();
          });
        });
      } else {
        db.createOrder(client.id, message)
        .then(order => {
          for (let itemId in cart) {
            const quantity = cart[itemId].quantity;
            const price = cart[itemId].price * quantity;

            db.addItemToOrder(order.id, itemId, quantity, price)
          }
          // sendSMS(`Hi, ${name}. Your order number is ${order.id}. Your total is $${total / 100}.`, mobile);
          confirmationData = {
            client,
            order,
            total,
          }
          return res.end();
        });
      }
    });
  });
  
  return router;
};
