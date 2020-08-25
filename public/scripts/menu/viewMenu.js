const addMenuItems = (menuItems) => {
  $('.menu-container').empty();

  for (let menuItem of menuItems) {
    const listing = `
    <div class="menu-item">
      <div class="menu-item-image" style="background-image: url('${menuItem.photo_url}')"></div>
      <div class="menu-item-description">
        <h3>${menuItem.name}</h3>
        <p>${menuItem.description}</p>
      </div>
      <div class="add-to-cart-container">
        <div id="Pretty-Potato-menu" class="add-to-cart itemId-${menuItem.id}">
          <p>Add</p>
          <p id="Pretty-Potato-price">$${menuItem.price/100}</p>
        </div>
      </div>
    </div>`

    $('.menu-container').append(listing);
  }

  letUserAddToCart();
}

$(document).ready(() => {

  //on click of the menu item, load menu
  $('.menu-tab').on('click', () => {
    let classClicked =  event.target.className;
    const category = classClicked.split(' ')[1];

    if ($('.menu-icon').is(':visible')) {
      $('.menu-tab').slideUp('fast');
      $('.menu-container').css('margin-top', '10px');
    }

    $('.menu-tab').removeClass('selected-nav-item');
    event.target.classList.add('selected-nav-item');
    getItemsOfCategory(category);


  });

  $('.menu-icon').on('click', () => {

    if ($('.menu-tab').is(':visible')) {
      $('.menu-tab').slideUp('fast');
      $('.menu-container').css('margin-top', '10px');
    } else {
      $('.menu-tab').slideDown('fast');
      $('.menu-container').css('margin-top', '250px');
    }
  });

  $(window).resize(() => {
    if ($(window).width() >= 480) {
      $('.menu-tab').show();
    } else {
      $('.menu-tab').hide();
    }
  })



});
