let { io, connectedUsers } = require('./app');
const { channelsAction } = require('./actions/channels.action');
const { messagesAction } = require('./actions/messages.action');
const { isAuthorized } = require('./middlewares/auth.middleware');

io.use(isAuthorized);

io.on('connection', socket => {
  socket.on('connected', (userData) => connectedUsers[socket.id] = {});

  channelsAction(socket, io);
  messagesAction(socket, io);

  socket.on('disconnect', () => connectedUsers[socket.id] = undefined);
});