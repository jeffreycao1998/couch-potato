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
 * Get a single user from the database given their email.
 * @param {Integer} id. The category id.
 * @return {Promise<{}>} A promise to the user.
 */

const getMenuItemsByCategories = function(category_id) {
  return db.query(`
  SELECT *
  FROM menu_items
  WHERE category_id = $1
  `, [category_id])
  .then(res => res.rows)
  .catch(e => console.error(e.stack));
}
exports.getMenuItemsByCategories = getMenuItemsByCategories;



// Orders

/***
 * Pass an order from the cart into the database
 * @param {Object} items to add
 * @param {Object} client who made the order
 *
 */

const sendOrder = function(order_id, client_id) {

}
exports.sendOrder = sendOrder;


/***
 * Add a client to the database
 * @param {Object} client
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
