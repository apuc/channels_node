const { connectedUsers } = require('../app');
const request = require('request');

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', messageData => {
        const { channel_id } = messageData;
        request.post(`${process.env.API_URL}/message`, messageData.text)
            .on('response', res => {
                console.log('res', res.statusCode)
            })
            .on('error', err => console.log(err));
        io.to(channel_id).emit('userMessage', messageData);
    });


};
