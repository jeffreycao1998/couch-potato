const socket = io.connect('http://localhost:8080');

socket.on('connect', (data) => {
  socket.emit('join', 'Hello Worl from client');
});