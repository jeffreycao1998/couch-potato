
const createMenuItem = (menuItem) => {
  return `
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
    </div>
  `
}




