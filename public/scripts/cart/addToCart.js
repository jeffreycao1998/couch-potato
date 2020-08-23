const letUserAddToCart = () => {
  $('.add-to-cart').on('click', (event) => {
    const cart = JSON.parse(Cookies.get('cart'));

    const target = event.currentTarget;
    const itemId = $(target).attr('class').split(' ')[1].slice(7);
    const itemName = potatoesDb[itemId].name.replace(/ /g,'-');
    const itemPrice = potatoesDb[itemId].price;

    if (!(itemId in cart)) {
      cart[itemId] = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };
      
    } else {
      const itemQuantity = Number($(`#${itemName}-cart`).find('.item-quantity').text());

      cart[itemId] = {
        ...cart[itemId],
        quantity: cart[itemId].quantity + 1
      }

      $(`#${itemName}-cart`).find('.item-quantity').text(itemQuantity + 1);
    }
    
    Cookies.set('cart', JSON.stringify(cart));

    getNumberOfCartItems();
  });
};