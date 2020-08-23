
const addMenuItem = (menuItem) => {
  $('.menu-container').append(menuItem);
}

const clearMenu = () => {
  $('.menu-container').empty();
}

const addMenuItems = (menuItems) => {
  clearMenu();

  for (let menuItem of menuItems) {
    const listing = createMenuItem(menuItem);
    addMenuItem(listing);
  }
}



