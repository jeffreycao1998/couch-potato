const express = require('express');
const router  = express.Router();
const { sendSMS } = require('../server_scripts/sendSMS');

let confirmationData;

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.get('/confirmation', (req, res) => {
    const {client, order, total} = confirmationData;
    const hour = Number(order.estimated_pickup.toString().slice(16, 18));
    const minute = Number(order.estimated_pickup.toString().slice(19, 21));
    let time = '';

    const data = {
      total,
      name: client.name,
      mobile: client.mobile,
      orderNumber: order.id,
    }

    if (hour / 12 > 1) {
      time += `${hour % 12}:${minute}pm`;
    } else {
      time += `${hour % 12}:${minute}am`;
    }

    data.estimatedPickup = time;

    res.render('confirmation', data);
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
              total += price;

              db.addItemToOrder(order.id, itemId, quantity, price)
            }
            // sendSMS(`Hi, ${name}. Your order number is ${order.id}. Your total is $${total / 100}.`, mobile);
            confirmationData = {
              client,
              order,
              total: total,
            }
            return res.end();
          });
        });
      } else {
        db.createOrder(client.id, message)
        .then(order => {
          let total = 0;
          for (let itemId in cart) {
            const quantity = cart[itemId].quantity;
            const price = cart[itemId].price * quantity;
            total += price;

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
