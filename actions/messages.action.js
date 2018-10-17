module.exports.messagesAction = (socket, io) => {
  socket.on('typing', function (params) {
    io.to(params['channelId']).emit('typing', params.user);
  });
};
