const { getClientsInChannel } = require('../helpers/clients');

module.exports.channelsAction = (socket, io) => {

  socket.on('joinToChannel', function ({user, channelId}) {
    socket.join(channelId);

    socket.broadcast.to(channelId).emit('message', 'New user connected!');
    io.to(channelId).emit('message', `Hello ${user}!`);

    getClientsInChannel(channelId).then((clients) => {
      io.to(channelId).emit('usersInside', clients);
    });
  });

  socket.on('leaveChannel', function (params) {
    socket.broadcast.to(params['channelId']).emit('message', 'User leave');
  });
};