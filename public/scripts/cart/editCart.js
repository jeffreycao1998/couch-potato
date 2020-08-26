const letUserEditCart = () => {
  $('.remove-item, .decrement-item, .increment-item').off('click');

  $('.remove-item').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));
    const itemId = event.target.className.split(' ')[1].slice(7);

    delete cart[itemId];
    Cookies.set('cart', JSON.stringify(cart));

    const total = getCartTotalPrice();
    
    if (total === 0) {
      $('.checkout-button').addClass('disabled-checkout-button');
      $('a').on('click', (event) => {
        event.preventDefault();
      });

    } else {
      $('a').off('click');
      $('.checkout-button').removeClass('disabled-checkout-button');
    }

    renderCartItems();
    getNumberOfCartItems();
  });

  $('.decrement-item').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));
    const itemId = event.target.className.split(' ')[1].slice(10);

    if (cart[itemId].quantity > 1) {
      cart[itemId].quantity -= 1;
      Cookies.set('cart', JSON.stringify(cart));
      
      renderCartItems();
      getCartTotalPrice();
      getNumberOfCartItems();
    }
  });

  $('.increment-item').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));
    const itemId = event.target.className.split(' ')[1].slice(10);

    cart[itemId].quantity += 1;
    Cookies.set('cart', JSON.stringify(cart));
    
    renderCartItems();
    getCartTotalPrice();
    getNumberOfCartItems();
  });
};