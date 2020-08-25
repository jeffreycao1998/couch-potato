const db = require('./db');

/// Menu items

/**
* Get the name all categories currently in the menu
* @return {Promise<{}>}
*/
const getMenuCategories = function() {
  return db.query(`
  SELECT name
  FROM categories;
  `)
  .then(res=> res.rows[0])
  .catch(e => console.error(e.stack));
}
exports.getMenuCategories = getMenuCategories;

/**
 * Retrieve the menu items in a given category of items
 * @param {Integer} id The category id.
 * @return {Promise<{}>} A promise to the user.
 */

const getMenuItemsByCategory = function(category_id) {
  return db.query(`
  SELECT *
  FROM menu_items
  WHERE category_id = $1;
  `, [category_id])
  .then(res => res.rows)
  .catch(e => console.error(e.stack));
}
exports.getMenuItemsByCategory = getMenuItemsByCategory;


// Orders
/***
 * Create an order in the database
 * @param {Object} items to add
 * @param {Object} client who made the order
 * @returns  {Promise<{}>} with order info
 */

const createOrder = function(client_id, message) {
  return db.query(`
    INSERT INTO orders (client_id, message)
    VALUES ($1, $2) RETURNING *;
    `, [client_id, message])
  .then(res => res.rows[0])
}
exports.createOrder = createOrder;

/***
 *  Add item to an existing order
 * @param {Integer} item_id
 * @param {Integer} quantity
 * @param {Integer} order_id
 * @returns  {Promise<{}>} Item added to the order
 */

 const addItemToOrder = function(order_id, item_id, quantity, price) {
  return db.query(`
    INSERT INTO order_items (order_id, menu_item_id, quantity, price)
    VALUES ($1, $2, $3, $4) RETURNING *;
    `, [order_id, item_id, quantity, price])
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
 }
 exports.addItemToOrder = addItemToOrder;

/***
 * Add an estimated time for order to be ready
 * @param {Integer} order_id
 * @param {Timestap} estimatedTime
 * @returns {Promise<{}>}
 */

 const addEstimatedPickup = function(order_id, estimatedTime) {
  return db.query(`
  UPDATE orders
  SET estimated_pickup = $2
  WHERE id = $1;
  `, [order_id, estimatedTime]
  )
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
 }
exports.addEstimatedPickup = addEstimatedPickup;
// Clients

/***
 * Add a client to the database
 * @param {Object} client with name and mobile number
 * @returns {Promise<{}>} id, name and mobile
 */

const addClient = function(client) {
  return db.query(`
  INSERT INTO clients (name, mobile)
  VALUES ($1, $2) RETURNING *;
  `, [client.name, client.mobile])
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack));
}
exports.addClient = addClient;

/***
 * Find a client in the database, do this to avoid adding a user multiple times
 * @param {Object} client with name and mobile number
 * @returns {Promise<{}>} id, name and mobile
 */
const findClient = function(name, mobile) {
  const values = [ `%${name}%`, mobile];
  return db.query(`SELECT *
  FROM clients
  WHERE name LIKE $1 AND mobile = $2;
  `, values)
  .then(res=> res.rows[0])
  .catch(e => console.error(e.stack));
}
exports.findClient = findClient;

const getOrderDetails = (order_id) => {
  const queryString = `
  SELECT order_items.quantity as quantity, menu_items.name as itemname, order_items.price as price, menu_items.photo_url as photourl, orders.estimated_pickup as pickuptime, orders.message,
  clients.name, clients.mobile
  FROM order_items 
  JOIN menu_items ON menu_item_id = menu_items.id
  JOIN orders ON order_id = orders.id
  JOIN clients ON orders.client_id = clients.id
  WHERE order_id = $1;`

  const values = [order_id];

  return db.query(queryString, values)
  .then(res => res.rows)
  .catch(e => console.error(e));
};
exports.getOrderDetails = getOrderDetails;

const getIncomingOrders = () => {
  const queryString = `
  SELECT orders.id as orderid, orders.message as message, time_created, menu_items.name as itemname, order_items.quantity as itemquantity 
  FROM orders 
  JOIN order_items ON orders.id=order_items.order_id
  JOIN menu_items ON order_items.menu_item_id=menu_items.id
  WHERE orders.id IN (
    SELECT id 
    FROM orders 
    WHERE estimated_pickup IS NULL
  );`;

  return db.query(queryString)
  .then(orders => orders.rows)
  .catch(e => console.error(e));
};
exports.getIncomingOrders = getIncomingOrders;

const getProcessedOrders = () => {
  const queryString = `
  SELECT orders.id as orderid, orders.message as message, time_created, estimated_pickup, menu_items.name as itemname, order_items.quantity as itemquantity
  FROM orders 
  JOIN order_items ON orders.id=order_items.order_id
  JOIN menu_items ON order_items.menu_item_id=menu_items.id
  JOIN clients ON client_id=clients.id
  WHERE orders.id IN (
    SELECT id 
    FROM orders 
    WHERE estimated_pickup IS NOT NULL AND completed = 'false'
  );`;

  return db.query(queryString)
  .then(orders => orders.rows)
  .catch(e => console.error(e));
};
exports.getProcessedOrders = getProcessedOrders

const updatePickupTime = (orderId, pickupTime) => {
  const queryString = `
  UPDATE orders
  SET estimated_pickup=$1
  WHERE id=$2;`;

  const values = [pickupTime, orderId];

  return db.query(queryString, values)
  .then(updatedOrder => updatedOrder.rows)
  .catch(e => console.error(e));
};
exports.updatePickupTime = updatePickupTime;

const completeOrderOnDB = (orderId) => {
  const queryString = `
  UPDATE orders
  SET completed='true'
  WHERE id=$1`;

  const values = [orderId];

  return db.query(queryString, values)
  .then(completedOrder => completedOrder.rows)
  .catch(e => console.error(e));
};
exports.completeOrderOnDB = completeOrderOnDB;