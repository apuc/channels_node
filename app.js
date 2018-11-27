const express = require('express');
const app = express();
const fs = require('fs');
const privateKey  = fs.readFileSync('./privkey.pem', 'utf8');
const certificate = fs.readFileSync('./fullchain.pem', 'utf8');
const options = {key: privateKey, cert: certificate};
const http = require('http').Server(app);
const https = require('https').Server(options, app);
const io = require('socket.io')(https);
const env = require('dotenv').config();
const helmet = require('helmet');
const path = require('path');
const router = require('./router');

const port = process.env.PORT || 2368;

app.use(helmet());
app.use(express.static(path.join(__dirname, '../vue_channels/dist')));
app.use('*', router);

http.listen(port, () => { console.log(`listening on port ${port}`); });
https.listen(2369, () => { console.log(`listening on port 2369`); });

module.exports.io = io;