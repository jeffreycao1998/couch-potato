const letUserEditCart = () => {
  $('.remove-item').off('click');

  $('.remove-item').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));
    const itemId = event.target.className.split(' ')[1].slice(7);

    delete cart[itemId];
    Cookies.set('cart', JSON.stringify(cart));
    renderCartItems();
    getCartTotalPrice();
  });
};