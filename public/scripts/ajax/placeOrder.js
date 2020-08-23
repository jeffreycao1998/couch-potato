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
    const cart = JSON.parse(Cookies.get('cart'));

    const errorMessage = checkFormValues(firstname, lastname, mobile);

    if (!errorMessage) {
      $.ajax({
        url: '/orders/place_order',
        method: 'POST',
        data: { 
          firstname,
          lastname,
          mobile,
          cart
        },
      })
      .then(res => {
        console.log(JSON.parse(res));
      });
    } else {
      $('.error-message-checkout').html(errorMessage);
      $('.error-message-checkout').slideDown('slow');
      resetTimeout();
    }
  });
});
