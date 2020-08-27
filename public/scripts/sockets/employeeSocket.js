if (window.location.pathname === '/employee') {
  socket = io();

  socket.on('connect', () => {
    socket.emit('owner connected');
  });

  // appends an order card to the /employee route
  socket.on('order placed', (data) => {
    const { order, cart } = JSON.parse(data);
    const orderCreationTime = getHourMinute(order.time_created)

    let orderCardHTML = `
      <div class="order-card card-order-${order.id}">
        <div class="order-information">
          <h4 class="order-num"><a href="/orders/${order.id}" target="_blank">#${order.id}</a></h4>
          <h4 class="order-time">${orderCreationTime}</h4>
        </div>`;

    for (let item in cart) {
      orderCardHTML += `
        <div class="order-item">
          <h4 class="item-quantity">${cart[item].quantity}x</h4>
          <h4 class="item-name">${cart[item].name}</h4>
        </div>`
    }
        
    orderCardHTML += `
        <div class="message">${ order.message ? '*' + order.message : '' }</div>
        <div class="add-pickup-time-buttons">
          <ul>
            <li class="add-pickup-time newOrder-${order.id}">15</li>
            <li class="add-pickup-time neworder-${order.id}">30</li>
            <li class="add-pickup-time newOrder-${order.id}">45</li>
            <li class="add-pickup-time newOrder-${order.id}">60</li>
          </ul>
        </div>
      </div>`

    $('.incoming-orders').append(orderCardHTML);

    letEmployeeAddPickupTime();
  });
}