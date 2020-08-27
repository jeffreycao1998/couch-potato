const express = require('express');
const router  = express.Router();
const { sendSMS } = require('../server_scripts/sendSMS');

const storeOrderInDB = (db, client, message, cart, res, name, mobile) => {
  db.createOrder(client.id, message)
    .then(order => {
      let total = 0;
      let orderMessage = `New Order: #${order.id}\n`
      for (let itemId in cart) {
        const quantity = cart[itemId].quantity;
        const price = cart[itemId].price * quantity;
        total += price;

        orderMessage += `${cart[itemId].quantity}x ${cart[itemId].name}\n`

        db.addItemToOrder(order.id, itemId, quantity, price)
      }
      // sendSMS(orderMessage, process.env.CAMILO_NUMBER);
      // sendSMS(`Hi, ${name}. \nYour order number is ${order.id}. \nYour total is $${total / 100} and we'll let you know when your order is ready!`, mobile);
      return res.send(JSON.stringify({ order, cart }));
    });
};

module.exports = (db, io) => {
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.get('/confirmation', (req, res) => {
    res.render('confirmation');
  });

  router.post("/place_order", (req, res) => {
    const { name, mobile, message } = req.body;
    const cart = JSON.parse(req.body.cart);

    db.findClient(name, mobile)
    .then(client => {
      if (!client) {
        db.addClient({name, mobile})
        .then((client) => {
          storeOrderInDB(db, client, message, cart, res, name, mobile);
        });
      } else {
        storeOrderInDB(db, client, message, cart, res, name, mobile);
      }
    });
  });

  router.put('/pickup_time', (req, res) => {
    const { orderId, pickupTime } = req.body;

    db.updatePickupTime(orderId, pickupTime)
    .then(result => res.end())
    .catch(err => console.error(err));

    db.getNameAndMobile(orderId)
    .then(userDetails => {
      // sendSMS(`Order #${orderId} ready at ${pickupTime}`, userDetails.mobile);
    })
  });

  router.put('/complete', (req, res) => {
    const { orderId } = req.body;

    db.completeOrderOnDB(orderId)
    .then(result => res.end())
    .catch(err => console.error(err));
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
        subtotal: (prices.reduce((total, price) => total + Number(price), 0)).toFixed(2),
      }

      data.tax = (data.subtotal * 0.13).toFixed(2);
      data.total = (Math.round((data.subtotal * 1.13).toFixed(2)/0.05) * 0.05).toFixed(2);

      res.render('order', data);
    })
    .catch((err) => res.send('invalid order number'));
  });
  
  return router;
};
