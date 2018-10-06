const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const connectedUsers = [];

app.get('/*', (req, res) => {
    res.json({message: 'Greetings from node server!'});
});

http.listen(port, () => { console.log(`listening on port: ${port}`); });

module.exports.io = io;
module.exports.connectedUsers = connectedUsers;