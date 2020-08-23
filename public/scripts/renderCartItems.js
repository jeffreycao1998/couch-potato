const renderCartItems = () => {
  const cart = JSON.parse(Cookies.get('cart'));
  let template = ``;

  for (let item in cart) {
    template += `
    <div id="${cart[item].name}-cart" class="cart-item-container">
      <div class="cart-item">
        <h5 class="cart-item-label">${cart[item].name.replace(/-/g,' ')}</h5>
        <h5 class="cart-item-cost">$${cart[item].price / 100}</h5>
      </div>
      <div class="cart-item-buttons">
        <ion-icon name="close-circle"></ion-icon>
        <div class="adjust-quantity">
          <ion-icon name="remove-circle-outline"></ion-icon>
          <div class="item-quantity">${cart[item].quantity}</div>
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>
      </div>
    </div>`;
  }

  $('.cart-items').html(template);
};