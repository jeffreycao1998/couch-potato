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

    console.log(order.id);

    const data = {
      total: (total / 100).toFixed(2),
      mobile: client.mobile,
      orderNumber: order.id
    }

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
              total
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

  router.get('/:id', (req, res) => {
    db.getOrderDetails(req.params.id)
    .then(details => {
      const name = details[0].name;
      const mobile = details[0].mobile;
      const message = details[0].message || ' ';
      const itemNames = [];
      const photoUrls = [];
      const quantities = [];
      const prices = [];
      const pickupTime = details[0].pickuptime || 'awaiting response from restaurant...';

      details.forEach((item) => {
        itemNames.push(item.itemname);
        photoUrls.push(item.photourl);
        quantities.push(item.quantity);
        prices.push((item.price / 100).toFixed(2));
      })

      const data = {
        name,
        mobile,
        message,
        itemNames,
        photoUrls,
        quantities,
        prices,
        pickupTime,
        orderId: req.params.id,
        subtotal: prices.reduce((total, price) => total + Number(price), 0),
      }

      data.tax = (data.subtotal * 0.13).toFixed(2);
      data.total = (Math.round((data.subtotal * 1.13).toFixed(2)/0.05) * 0.05).toFixed(2);

      res.render('order', data);
    });
  });
  
  return router;
};
