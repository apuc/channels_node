const client = require('../middlewares/redis');

// client.rpush('queue', '1', '2', '3');
// client.lrange("queue", 0, -1, function(err, reply){
//     console.log('first', reply);
// });
// client.lrem("queue", 1, '3');
// client.lrange("queue", 0, -1, function(err, reply){
//     console.log('second', reply);
// });

module.exports.statusAction = function (socket, io) {

    socket.on('user_online', function (userId) {
        if (userId) {
            console.log('user_online: ', userId);
            const user_id = userId.toString();
            client.rpush(user_id, socket.id);
            client.lrange(user_id, 0, -1, function (err, userConnections) {
                console.log(`Пользователь ${user_id} вошел: ${userConnections}`);
            });
        }
    });

    socket.on('get_user_status', function (userId) {
        const user_id = userId.toString();
        client.lrange(user_id, 0, -1, function (err, userConnections) {
            const userStatus = {userConnections};
            if (userConnections) {
                userStatus['userStatus'] = 'online';
                socket.emit('get_user_status', userStatus);
            } else {
                userStatus['userStatus'] = 'offline';
                socket.emit('get_user_status', userStatus);
            }
        });
    });

};

module.exports.setUserOffline = function (socket) {
    const user_id = socket.handshake.query.user_id;
    if (user_id !== 'null') {
        client.lrem(user_id, 1, socket.id);
        client.lrange(user_id, 0, -1, function (err, userConnections) {
            console.log(`Пользователь ${user_id} вышел: ${userConnections}`);
        });
    }
};