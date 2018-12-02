const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const env = require('dotenv').config();
const helmet = require('helmet');
const router = require('./router');

const port = process.env.PORT || 2368;

app.use(helmet());
app.use(express.static(path.join(__dirname, '../vue_channels/dist')));
app.use('*', router);

http.listen(port, () => { console.log(`listening on port ${port}`); });

module.exports.io = io;