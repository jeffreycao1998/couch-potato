const getCartTotalPrice = (cartItems) => {
  let total = 0;

  for (let item in cartItems) {
    for (let i = 0; i < cartItems[item].quantity; i++) {
      total += cartItems[item].price;
    };
  };

  $('.subtotal-cost').text(`$${Math.round(total) / 100}`);
  $('.tax-cost').text(`$${Math.round(total * .13) / 100}`);
  $('.total-cost').text(`$${Math.round(total * 1.13) / 100}`);
};

const getNumberOfCartItems = (cartItems) => {
  let total = 0;

  for (let item in cartItems) {
    total += cartItems[item].quantity;
  };

  $('.cart-items-total').text(total);
};

// const getCurrentLocation = () => {

// };