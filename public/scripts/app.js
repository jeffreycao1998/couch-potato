$(document).ready(() => {
  getNumberOfCartItems();
  // getUsersLocation();

  letEmployeeAddPickupTime();
  letEmployeeCompleteOrder();

  if (!Cookies.get('cart')) {
    Cookies.set('cart', JSON.stringify({}));
  }
});
