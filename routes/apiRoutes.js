module.exports = function(router, database) {

  router.get('/:id', (req, res) => {
    database.getMenuItemsByCategory(req.params.id)
    .then(menuItems => res.send(menuItems))
    .catch(e => {
        console.error(e);
        res.send(e)
    })
  });

  return router;
}
