const request = require('request');

module.exports.isAuthorized = (socket, next) => {
    // const token = socket.handshake.query['token'];
    // request.get({
    //     url: `${process.env.API_URL}/user/me`,
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Accept': 'application/json',
    //         'Content-type': 'application/json'
    //     }
    // }, function (err, res) {
    //     if (err) {
    //         next(new Error(err));
    //     } else if (res.statusCode === 200) {
    //         next();
    //     } else if (res.statusCode === 401) {
    //         next(new Error(`Error from socket: Not authenticated! Status code: ${res.statusCode}`));
    //     } else {
    //         next(new Error(`Error from socket: Status code ${res.statusCode}`))
    //     }
    // });
    next();
};