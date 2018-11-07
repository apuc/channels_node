const request = require('request');
const r = request.defaults({
    headers: {
      'Accept': '*/*',
      'content-type': 'application/json',
      'Cache-Control': 'no-cache'
    }
});

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', messageData => {
        const { channel_id, text, from } = messageData;
        const message = JSON.stringify({ channel_id, from, text });
        console.log(message);
        r.post(`${process.env.API_URL}/message`, message, function (err, res, body) {
            // console.log('err', err)
            // console.log('res', res)
            console.log('body', body)
        });
        io.to(channel_id).emit('userMessage', messageData);
    });

};
