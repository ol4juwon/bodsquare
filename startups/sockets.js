const debug = require("debug")("app:app");
const authservice = require('../app/v1/auth/AuthService')
const taskService = require('../app/v1/tasks/TasksService')
module.exports =async (server) => {
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
            socket.emit('newTaskList',message)
        })
        socket.on('updateTask', (task) => {
            console.log('task', task)
        })
        socket.on('login',async ({loginData})=> {
            const {email, password } = loginData;
            const {error, data} = await authservice.login({email, password})
            
            if(data){
                const tasksss = await taskService.getAll({user_id: data.user_id})
                data.socketid = socket.id;
                socket.emit('loginSuccess', data)
                socket.emit('tasks', {data: tasksss.data.docs})

            }
            if(error)
            socket.emit('loginError', error);

        })
    
    })
}