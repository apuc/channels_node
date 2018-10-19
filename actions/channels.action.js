const { getClientsInChannel } = require('../helpers/clients');
const { connectedUsers } = require('../app');

module.exports.channelsAction = (socket, io) => {

  socket.on('joinChannel', function ({channelId}) {
    const { username } = connectedUsers[socket.id];

    socket.join(channelId);
    socket.emit('message', {
      message: `${username} joined to ${channelId}`
    });
    socket.to(channelId).emit('message', {
      message: `${username} joined!`
    });
    // io.to(params['channelId']).emit('message', `Hello ${params.name}!`);
    //
    // getClientsInChannel(params['channelId']).then((clients) => {
    //   io.to(params['channelId']).emit('usersInside', clients);
    // });
  });

  socket.on('leaveChannel', function ({channelId}) {
    const { name } = connectedUsers[socket.id];

    socket.leave(channelId, () => {
      socket.broadcast.to(channelId).emit('message', {
        message: `${name} leave channel!`
      });
    });
  });

};