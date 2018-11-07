let { io } = require('./app');
const { channelsAction } = require('./actions/channels.action');
const { messagesAction } = require('./actions/messages.action');
const { isAuthorized } = require('./middlewares/auth.middleware');

io.use(isAuthorized);

io.on('connection', socket => {

  channelsAction(socket, io);
  messagesAction(socket, io);

  socket.on('disconnect', () => console.log('Someone is disconnect!'));

});