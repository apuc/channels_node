let { connectedUsers } = require('../app');

module.exports.userAction = (socket, io) => {
    socket.on('userInfo', (userData) => {
        connectedUsers[socket.id] = userData;
    });


};