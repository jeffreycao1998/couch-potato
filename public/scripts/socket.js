
if (window.location.pathname === '/employee') {
  socket = io.connect('http://localhost:8080');
  socket.on('connect', () => {
    socket.emit('owner connected');
  });
}