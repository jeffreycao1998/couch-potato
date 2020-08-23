let currentPos;

$(document).ready(() => {
  getCartTotalPrice();
  
  // Reveals your cart
  $('.open-cart').on('click', () => {
    renderCartItems();
    getCartTotalPrice();

    currentPos = window.scrollY;

    $('#cart-page').css('display', 'block');
    slide('.cart-container', 375);
    toggleScrollOn('#menu-page', currentPos);
  });


  // Hides your cart
  $('.shade, .back-container').on('click', () => {

    // ensures cart is fully in view before you can close it
    if ($('.cart-container').css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
      slide('.cart-container', 375);

      // waits for slide animation to end
      setTimeout(() => {
        $('#cart-page').css('display', 'none');
        toggleScrollOn('#menu-page', currentPos);
      }, 400)
    }
  });

})
