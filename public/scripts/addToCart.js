const letUserAddToCart = () => {
  $('.add-to-cart').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));

    const target = event.currentTarget;
    const itemId = $(target).attr('class').split(' ')[1].slice(7);
    const itemName = potatoesDb[itemId].name.replace(/ /g,'-');
    const itemPrice = potatoesDb[itemId].price;

    if (!(itemId in cart)) {
      cart[itemId] = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };

      const template = `
      <div id="${itemName}-cart" class="cart-item-container">
        <div class="cart-item">
          <h5 class="cart-item-label">${itemName.replace(/-/g,' ')}</h5>
          <h5 class="cart-item-cost">${itemPrice}</h5>
        </div>
        <div class="cart-item-buttons">
          <ion-icon name="close-circle"></ion-icon>
          <div class="adjust-quantity">
            <ion-icon name="remove-circle-outline"></ion-icon>
            <div class="item-quantity">1</div>
            <ion-icon name="add-circle-outline"></ion-icon>
          </div>
        </div>
      </div>`;

      $('.cart-items').append(template);
    } else {
      const itemQuantity = Number($(`#${itemName}-cart`).find('.item-quantity').text());

      cart[itemId] = {
        ...cart[itemId],
        quantity: cart[itemId].quantity + 1
      }

      $(`#${itemName}-cart`).find('.item-quantity').text(itemQuantity + 1);
    }
    
    console.log(cart);
    getCartTotalPrice(cartItems);
    getNumberOfCartItems(cartItems);
  });
};