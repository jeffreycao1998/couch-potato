const letUserAddToCart = () => {
  $('.add-to-cart').on('click', (event) => {
    const itemId = $(event.target).attr('class').split(' ')[1].slice(7);
    const itemName = event.target.id.slice(0, event.target.id.length - 5);
    const itemPrice = $(`#${itemName}-price`).text();

    if (!(itemId in cartItems)) {
      cartItems[itemId] = {
        name: itemName.replace(/-/g,' '),
        price: Number(itemPrice.slice(1)) * 100,
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

      cartItems[itemId] = {
        ...cartItems[itemId],
        quantity: cartItems[itemId].quantity + 1
      }

      $(`#${itemName}-cart`).find('.item-quantity').text(itemQuantity + 1);
    }
    
    getCartTotalPrice(cartItems);
    getNumberOfCartItems(cartItems);
  });
};