const completeOrder = (orderId) => {
  $.ajax({
    url: '/orders/complete',
    method: 'PUT',
    data: { orderId },
  })
  .catch(err => console.error(err));
};

const letEmployeeCompleteOrder = () => {
  $('.pickup-time').off('click');
  $('.pickup-time').on('click', (event) => {
    const orderId = event.target.className.split(' ')[1].slice(9);

    $(`.card-order-${orderId}`).remove();
    completeOrder(orderId);
  });
}