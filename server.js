let {io, connectedUsers} = require('./app');
const clientsHelper = require('./helpers/clients');

io.on('connection', socket => {

    socket.emit('connected', {});
    
    socket.on('connected', function (userData) {
        connectedUsers[socket.id] = userData;
    });

    socket.on('joinToChannel', function (params) {
        socket.join(params['channelId']);

        socket.broadcast.to(params['channelId']).emit('message', 'New user connected!');
        io.to(params['channelId']).emit('message', `Hello ${params.name}!`);

        clientsHelper.getClientsInChannel(params['channelId']).then((clients) => {
            io.to(params['channelId']).emit('usersInside', clients);
        });
    });

    socket.on('typing', function (params) {
        io.to(params['channelId']).emit('typing', params.user);
    });

    socket.on('disconnect', () => {
        connectedUsers[socket.id] = undefined;
    });
});
