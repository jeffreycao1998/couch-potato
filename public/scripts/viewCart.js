// Prevents scrolling on selector
const preventScroll = (selector) => {


  $(`${selector}`).css('display', 'fixed');
  $(`${selector}`).css('overflow', 'hidden');
};

$(document).ready(() => {
  
  // Reveals your cart
  $('.open-cart').on('click', () => {
    $('#cart-page').css('display', 'block');

    console.log($('#menu-page').scrollHeight);
  });


  // Hides your cart
  $('.shade').on('click', () => {
    $('#cart-page').css('display', 'none');
  });

  $('.back-container').on('click', () => {
    $('#cart-page').css('display', 'none');
  });

})
