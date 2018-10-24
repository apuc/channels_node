const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = express.Router();

const port = process.env.PORT || 2368;
const connectedUsers = [];

app.use(express.static('../vue_channels/dist'));

app.set('views', '../vue_channels/dist');

router.get('/*', (req, res, next) => {
    res.sendFile('../vue_channels/dist/index.html');
});

http.listen(port, () => { console.log(`listening on port ${port}`); });

module.exports.io = io;
module.exports.connectedUsers = connectedUsers;