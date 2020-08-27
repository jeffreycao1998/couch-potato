$(document).ready(() => {
  if (!Cookies.get('cart')) {
    Cookies.set('cart', JSON.stringify({}));
  }

  getNumberOfCartItems();
  getUsersLocation();
  
  letUserFindOrder();
  letEmployeeAddPickupTime();
  letEmployeeCompleteOrder();
});
