const { connectedUsers } = require('../app');
const request = require('request');
request.defaults({
    headers: {'Content-Type': 'application/json'}
});

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', messageData => {
        const { channel_id, text, from } = messageData;
        const message = {
            channel_id: channel_id.toString(),
            text,
            from: from.toString()
        };
        console.log(message);
        request.post(`${process.env.API_URL}/message`, message, function (err, res, body) {
            // console.log('err', err)
            // console.log('res', res)
            console.log('body', body)
        })
            // .on('response', res => {
            //     console.log('res', res)
            // })
            // .on('error', err => console.log(err));
        io.to(channel_id).emit('userMessage', messageData);
    });


};
