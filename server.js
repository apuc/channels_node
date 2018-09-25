const express = require('express');

const app = express();
const port = process.env.port || 2368;
const router = express.Router();

app.use(express.static('../vue_channels/dist'));

app.engine('.html', require('ejs').render);

app.set('views', '../vue_channels/dist');

router.get('/*', (req, res, next) => {
    res.sendFile('/var/www/vue_channels/dist/index.html');
});


app.use('/', router);

app.listen(port);

console.log('App running on port', port);