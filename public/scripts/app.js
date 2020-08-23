$(document).ready(() => {
  letUserAddToCart();







  //on click of the menu item, load menu
  $('.menu-nav > .menu-tab').on('click', () => {
    let classClicked =  event.target.className;
    const category = classClicked.split(' ')[1];

    $.ajax(`/menu/${category}`, {method: 'GET'})
    .then(res => addMenuItems(res))
    .catch()
  })

});
