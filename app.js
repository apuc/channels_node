const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 2368;
const connectedUsers = [];

app.get('/*', (req, res) => {
  res.status(404).end();
});

http.listen(port, () => { console.log(`listening on port ${port}`); });

module.exports.io = io;
module.exports.connectedUsers = connectedUsers;