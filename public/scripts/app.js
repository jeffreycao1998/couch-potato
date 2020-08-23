$(document).ready(() => {
  getNumberOfCartItems();

  // getUsersLocation();

  if (!Cookies.get('cart')) {
    Cookies.set('cart', JSON.stringify({}));
  }
});
