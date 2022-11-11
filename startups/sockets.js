const debug = require("debug")("app:app");
module.exports = (server) => {
    var io = require('socket.io')(server,  {
        cors: {
        origins: 'localhost:3000'}
      });
    io.on('connection', (socket) => {
        debug('a user is connected', socket.id)
    socket.emit('welcome','ola');
    socket.on('newUser', () => {
    console.log('new ')
    })
        socket.on('newTask', (message) => {
            console.log('message from', message);
            send('newTask', message)
            socket.emit('done',message)
        })
    
    })
}