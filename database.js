const db = require('./db');


/// Menu items

/**
* Get the name all categories currently in the menu
* @return {Promise<{}>}
*/
const getMenuCategories = function() {
  return db.query(`
  SELECT name
  FROM categories
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
  WHERE category_id = $1
  `, [category_id])
  .then(res => {
    return res.rows
  })
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

const createOrder = function(order_id, client_id) {
  return db.query(`
    INSERT INTO orders (order_id, client_id)
    VALUES ($1, $2) RETURNING *
    `, [order_id, client_id])
  .then(res => res.rows[0])
}
exports.createOrder = createOrder;

/***
 *  Add item to an existing order
 * @param {Integer} item_id
 * @param {Integer} quantity
 * @param {Integer} order_id
 * @param {Text} (optional) a message form the client regarding the item
 * @returns  {Promise<{}>} Item added to the order
 */

 const addItemToOrder = function(order_id, item_id, quantity, message = "") {
  return db.query(`
    INSERT INTO order_items (order_id, menu_item_id, message, quantity, price)
    VALUES ($1, $2, $3, $4, (SELECT price FROM menu_items WHERE id = $2)) RETURNING *
    `, values)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack))
 }
 exports.addItemToOrder = addItemToOrder;


/***
 * Submit a completed order
 * @param {Object} items to add
 * @param {Object} client who made the order
 * @returns {Promise<{}>} with order info
 */
const submitOrder = function(order_id) {
  return db.query(`
  UPDATE orders
  SET time_created = NOW()::TIMESTAMP
  WHERE id = $1
  `, [order_id])
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}
exports.submitOrder = submitOrder;


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
  WHERE id = $1
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
  WHERE name LIKE $1 AND mobile = $2
  `, values)
  .then(res=> res.rows[0])
  .catch(e => console.error(e.stack));
}
exports.findClient = findClient;
