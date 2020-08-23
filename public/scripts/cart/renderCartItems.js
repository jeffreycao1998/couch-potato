const renderCartItems = () => {
  const cart = JSON.parse(Cookies.get('cart'));
  let template = ``;

  for (let itemId in cart) {
    template += `
    <div id="${cart[itemId].name}-cart" class="cart-item-container">
      <div class="cart-item">
        <h5 class="cart-item-label">${cart[itemId].name.replace(/-/g,' ')}</h5>
        <h5 class="cart-item-cost">$${cart[itemId].price / 100}</h5>
      </div>
      <div class="cart-item-buttons">
        <ion-icon class="remove-item remove-${itemId}" name="close-circle"></ion-icon>
        <div class="adjust-quantity">
          <ion-icon class="decrement-item decrement-${itemId}" name="remove-circle-outline"></ion-icon>
          <div class="item-quantity">${cart[itemId].quantity}</div>
          <ion-icon class="increment-item increment-${itemId}" name="add-circle-outline"></ion-icon>
        </div>
      </div>
    </div>`;
  }

  $('.cart-items').html(template);

  letUserEditCart();
};