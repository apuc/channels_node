const client = require('../middlewares/redis');


module.exports.statusAction = function (socket, io) {

    socket.on('user_online', function (userId) {
        if (userId) {
            const user_id = userId.toString();
            client.rpush(user_id, socket.id);
            client.lrange(user_id, 0, -1, function (err, userConnections) {
                console.log(`Пользователь ${user_id}(${socket.id}) вошел: ${userConnections}`);
            });
        }
    });

    socket.on('get_user_status', function (userId) {
        if (userId) {
            const user_id = userId.toString();
            client.lrange(user_id, 0, -1, function (err, connections) {
                const userStatus = {connections};
                if (connections.length) {
                    userStatus['status'] = 'online';
                    socket.emit('get_user_status', userStatus);
                } else {
                    userStatus['status'] = 'offline';
                    socket.emit('get_user_status', userStatus);
                }
            });
        }
    });

};

module.exports.setUserOffline = function (socket) {
    const user_id = socket.handshake.query.user_id;
    if (user_id !== 'null') {
        client.lrem(user_id, 1, socket.id);
        client.lrange(user_id, 0, -1, function (err, userConnections) {
            console.log(`Пользователь ${user_id}(${socket.id}) вышел: ${userConnections}`);
        });
    }
};