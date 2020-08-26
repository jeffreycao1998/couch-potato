$(document).ready(() => {
  getNumberOfCartItems();
  // getUsersLocation();
  
  letUserFindOrder();
  letEmployeeAddPickupTime();
  letEmployeeCompleteOrder();

  if (!Cookies.get('cart')) {
    Cookies.set('cart', JSON.stringify({}));
  }
});
