let { connectedUsers } = require('../app');

module.exports.userAction = (socket, io) => {
    socket.on('connected', (userData) => {
        connectedUsers[socket.id] = userData;
    });
};