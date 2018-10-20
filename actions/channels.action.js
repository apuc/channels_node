const { connectedUsers } = require('../app');

module.exports.channelsAction = (socket, io) => {

  socket.on('joinChannels', function (channelsIds) {
      const { username } = connectedUsers[socket.id];

      channelsIds.forEach(id => {
        socket.join(id);
        socket.emit('systemMessage', {message: `You joined to ${id}`});
      });
  });

  socket.on('joinChannel', function (channelId) {
    const { username } = connectedUsers[socket.id];

    socket.join(channelId);
    socket.emit('systemMessage', {message: `You joined to ${channelId}`});
    socket.broadcast.to(channelId).emit('systemMessage', {message: `${username} joined!`});
  });

  socket.on('leaveChannel', function (channelId) {
      const { username } = connectedUsers[socket.id];

      socket.leave(channelId, () => {
          socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
          socket.broadcast.to(channelId).emit('systemMessage', {message: `${username} leave channel!`});
      });
  });

};