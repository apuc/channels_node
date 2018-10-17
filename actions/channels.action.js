const { getClientsInChannel } = require('../helpers/clients');

module.exports.channelsAction = (socket, io) => {
  socket.on('joinToChannel', function (params) {
    socket.join(params['channelId']);

    socket.broadcast.to(params['channelId']).emit('message', 'New user connected!');
    io.to(params['channelId']).emit('message', `Hello ${params.name}!`);

    getClientsInChannel(params['channelId']).then((clients) => {
      io.to(params['channelId']).emit('usersInside', clients);
    });
  });

  socket.on('leaveChannel', function (params) {
    socket.broadcast.to(params['channelId']).emit('message', 'User leave');
  });
};