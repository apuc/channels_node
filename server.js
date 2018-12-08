let { io } = require('./app');
const { channelsAction } = require('./actions/channels.action');
const { messagesAction } = require('./actions/messages.action');
const { isAuthorized } = require('./middlewares/auth.middleware');
const { statusAction, setUserOffline } = require('./actions/status.action');

io.use(isAuthorized);

io.on('connection', socket => {
  console.log(socket.handshake.query.user_id);

  channelsAction(socket, io);
  messagesAction(socket, io);
  statusAction(socket, io);

  socket.on('disconnect', () => {
    console.log('Someone is disconnect!');
    setUserOffline(socket)
  });

});