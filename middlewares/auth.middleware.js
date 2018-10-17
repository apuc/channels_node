module.exports.isAuthorized = (socket, next) => {
  const token = socket.handshake.query.token;
  // console.log(token);
  // make sure the handshake data looks good as before
  // if error do this:
  // next(new Error('not authorized'));
  // else just call next
  next();
};