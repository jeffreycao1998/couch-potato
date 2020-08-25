const addPickupTime = (orderId, pickupTime) => {
  $.ajax({
    url: '/orders/pickup_time',
    method: 'PUT',
    data: { orderId, pickupTime },
  })
  .then(res => console.log(res))
  .catch(err => console.error(err));
};

$(document).ready(() => {
  $('.add-pickup-time').on('click', (event) => {
    const minutes = $(event.target).text();
    const orderId = event.target.className.split(' ')[1].slice(9);

    const today = new Date();
    let pickupHour = today.getHours();
    let pickupMinute = today.getMinutes() + Number(minutes);
    let ampm;

    if (pickupMinute / 60 > 1) {
      pickupHour++;
      pickupMinute = (pickupMinute % 60);
    }

    if (pickupHour % 12 > 1) {
      pickupHour = pickupHour % 12;
      ampm = 'pm'
    } else {
      ampm = 'am'
    }

    if (pickupMinute < 10) {
      pickupMinute = '0' + pickupMinute.toString();
    }
    if (pickupHour < 10) {
      pickupHour = '0' + pickupHour.toString();
    }
    
    const pickupTime = `${pickupHour}:${pickupMinute}${ampm}`;
    console.log(pickupTime);

    addPickupTime(orderId, pickupTime);
  });
});