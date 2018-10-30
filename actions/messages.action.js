const { connectedUsers } = require('../app');
const request = require('request');

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', ({message, channelId}) => {
        const {username, id} = connectedUsers[socket.id];
        request.post(`${process.env.API_URL}/message`, message)
            .on('response', res => {
                console.log('res', res.statusCode)
            })
            .on('error', err => console.log(err));
        io.to(channelId).emit('userMessage', {username, id, message});
    });


};
