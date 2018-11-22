const request = require('request');

module.exports.messagesAction = (socket, io) => {

  socket.on('typing', ({user, channelId}) => {
    io.to(channelId).emit('typing', user);
  });

  socket.on('userMessage', messageData => {
    const {channel_id, text, from, user_id} = messageData;

    request.post({
      url: `${process.env.API_URL}/service/message`,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Service-Auth-Name': 'node',
        'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i'
      },
      form: {channel_id, from, text, user_id}
    }, function (err, res, body) {
      // console.log('err', err)
      // console.log('res', res)
      // console.log('body', body);
      // io.to(channel_id).emit('messageStatus', 'ОК');
    });

    io.to(channel_id).emit('userMessage', messageData);
  });

};
