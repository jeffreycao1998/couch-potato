const letUserFindOrder = () => {
  $('.find-order-deatils-button').on('click', () => {
    const orderId = $('#find-order-id').val();
    
    window.location.assign(`/orders/${orderId}`);
  });
};
