const errorTimeouts = [];

const resetTimeout = () => {
  const timeout = setTimeout(() => {
    $('.error-message-checkout').slideUp('slow');
  }, 3000);

  if (errorTimeouts.length === 0) {
    errorTimeouts.push(timeout);
  } else {
    clearTimeout(errorTimeouts[0])
    errorTimeouts.shift();
    errorTimeouts.push(timeout);
  }
}

$(document).ready(() => {
  $('.place-order-button').on('click', () => {
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const mobile = $('#mobile').val();
    const message = $('#extra-details').val();
    const cart = JSON.parse(Cookies.get('cart'));

    let errorMessage = checkFormValues(firstname, lastname, mobile);
    if (Object.keys(cart).length === 0) {
      errorMessage += "Your cart is empty. <br>";
    }

    if (!errorMessage) {
      $.ajax({
        url: '/orders/place_order',
        method: 'POST',
        data: { 
          name: `${firstname} ${lastname}`,
          mobile,
          cart: JSON.stringify(cart),
          message
        },
      }).then(res => {
        Cookies.set('cart', JSON.stringify({}));
        socket = io.connect('http://localhost:8080');
        socket.on('connect', () => {
          socket.emit('order placed');
        });
        window.location.assign('/orders/confirmation');
      });
    } else {
      $('.error-message-checkout').html(errorMessage);
      $('.error-message-checkout').slideDown('slow');
      resetTimeout();
    }
  });
});
