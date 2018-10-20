const { connectedUsers } = require('../app');

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', ({message, channelId}) => {
        const {username, id} = connectedUsers[socket.id];
        io.to(channelId).emit('userMessage', {username, id, message});
    });


};
