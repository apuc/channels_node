module.exports.channelsAction = (socket, io) => {

  socket.on('joinChannels', function (channelsIds) {
    try {
      channelsIds.forEach(id => {
        socket.join(id);
        socket.emit('systemMessage', {message: `You joined to ${id}`});
      });
    } catch (e) {
      console.error(e)
    }
  });

  socket.on('joinChannel', function (channelId) {
    try {
      socket.join(channelId);
      socket.emit('systemMessage', {message: `You joined to ${channelId}`});
      socket.broadcast.to(channelId).emit('systemMessage', {message: `Someone joined!`});
    } catch (e) {
      console.error(e)
    }
  });

  socket.on('leaveChannel', function (channelId) {
    try {
      socket.leave(channelId, () => {
        socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
        socket.broadcast.to(channelId).emit('systemMessage', {message: `Someone leave channel!`});
      });
    } catch (e) {
      console.error(e)
    }
  });

};