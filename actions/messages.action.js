module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('message', ({message, channelId}) => {
        io.emit('message', message);
    });

};
