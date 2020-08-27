const createItemForDelete = function(menuItem) {
  const item = `
  <div class="delete-item">
  <div class="delete-item-column-1" > <p> ${menuItem.name} </p></div>

  <div class="${menuItem.id} delete-button delete-item-column-2"> <p>DELETE</p> </div>
  </div>`;

  $('.item-to-delete-container').append(item);

};


$(() => {

  $('#search-delete').on('click', () => {
    const query = $('#search-item-name').val().toLowerCase();
    $('#search-item-name').val('');

    $.ajax({
      method: 'GET',
      url: `/api/menu/?q=${query}`
    })
    .done( res =>  {
      $('.item-to-delete-container').empty();
      res.forEach( x => createItemForDelete(x))}
    )
    });

  $(document).on('click', '.delete-button', () => {
    const id = event.target.parentElement.className.split(' ')[0];
    console.log(id);
    $.ajax( {
      method: 'POST',
      url: `/api/menu/delete/${id}`
    }).done(result => window.location.reload());
  })

});
