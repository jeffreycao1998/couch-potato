const getDistanceFromStore = (userCoordinates) => {

  $.get('/api/distanceFromStore', (req, res) => {
    console.log(res);
  });
};

const getItemsOfCategory= (category) => {
  $.ajax(`/api/menu/${category}`, {method: 'GET'})
    .then(res => {
      for (let potato of res) {
        potatoesDb[potato.id] = {
          name: potato.name,
          price: potato.price,
        }
      };
      
      addMenuItems(res)
    })
    .catch(err => {
      console.error(err);
    })
};