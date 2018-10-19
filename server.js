let { io, connectedUsers } = require('./app');
const { channelsAction } = require('./actions/channels.action');
const { messagesAction } = require('./actions/messages.action');
const { userAction } = require('./actions/user.action');
const { isAuthorized } = require('./middlewares/auth.middleware');

io.use(isAuthorized);

io.on('connection', socket => {

  userAction(socket, io);
  channelsAction(socket, io);
  messagesAction(socket, io);

  console.log(connectedUsers);

  socket.on('disconnect', () => connectedUsers[socket.id] = undefined);

});