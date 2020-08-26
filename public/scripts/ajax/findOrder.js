const letUserFindOrder = () => {
  $('.find-order-details-button').on('click', () => {
    const orderId = $('#find-order-id').val();
    
    if (!orderId) return;
    window.location.assign(`/orders/${orderId}`);
  });
};
