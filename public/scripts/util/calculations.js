const getCartTotalPrice = () => {
  const cart = JSON.parse(Cookies.get('cart'));
  let total = 0;

  for (let item in cart) {
    for (let i = 0; i < cart[item].quantity; i++) {
      total += cart[item].price;
    };
  };

  $('.subtotal-cost').text(`$${(Math.round(total) / 100).toFixed(2)}`);
  $('.tax-cost').text(`$${(Math.round(total * .13) / 100).toFixed(2)}`);
  $('.total-cost').text(`$${(Math.round((total * 1.13 / 100).toFixed(2) / 0.05) * 0.05).toFixed(2)}`);

  return total;
};

const getNumberOfCartItems = () => {
  const cart = JSON.parse(Cookies.get('cart'));
  let total = 0;

  for (let item in cart) {
    total += cart[item].quantity;
  };

  $('.cart-items-total').text(total);
};