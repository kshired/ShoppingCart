const client = require('../client');

const setSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('join', ({ room }) => {
      socket.join(room);
    });
    socket.on('send message', ({ name, message }) => {
      const msg = name + ' : ' + message;
      console.log(msg);
      io.to(room).emit('receive message', { name, message });
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = setSocket;
