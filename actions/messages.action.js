const request = require('request');

module.exports.messagesAction = (socket, io) => {

    socket.on('typing', ({user, channelId}) => {
        io.to(channelId).emit('typing', user);
    });

    socket.on('userMessage', messageData => {
        const { channel_id, text, from } = messageData;

        request.post({
          url: `${process.env.API_URL}/message`,
          form: { channel_id, from, text }
        }, function (err, res, body) {
            // console.log('err', err)
            // console.log('res', res)
            console.log('body', body);
            // io.to(channel_id).emit('messageStatus', 'ОК');
        });

        io.to(channel_id).emit('userMessage', messageData);
    });

};
