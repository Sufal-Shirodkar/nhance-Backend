//install libraries
const { Server } = require("socket.io")
const http = require('http')
require("dotenv").config();
const express = require('express')

const port = 3330
const cors = require('cors')
const { checkSchema } = require("express-validator");


//required files
const configureDb = require('./config/db')
const userController = require('./App/controllers/userController')
const groupController = require('./App/controllers/groupController')

//validation files
const {userRegistrationValidation,loginValidationSchema} = require('./App/validations/userValidation')
const {authenticateUser} = require('./App/middleware/auth')
// app level middleware
const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
configureDb()

//socket connection
const io = new Server(server,{cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:true,
}})
 
io.on("connection",(socket)=>{
    console.log('User connected',socket.id)
    socket.on('join', (data) => {
        console.log(`User joined with data: ${data}`);
        // Handle the join event, e.g., add user to a room
        socket.join(data.roomId);
        // Send a welcome message or other information
        socket.emit('welcome', { message: 'Welcome to the room!',id:data.roomId});
    });
    socket.on('message1', (data) => {
        console.log(data)
        const {username,reciever,room,message} = data
        // socket.join(data.room)
        socket.to(data.room).emit('recieve_message',{
            message:{username:username,reciever:reciever,message:message}
        })
       
    });

    // Handle room message
    socket.on('room-message', (data) => {
        console.log(data);
        socket.to(data.roomId).emit('receive-message', data.message);
    });

    socket.on("disconnect",()=>{
        console.log(`User ${socket.id} has left`)
    })
   
})


// set up routes
app.post('/api/users/register',checkSchema(userRegistrationValidation),userController.register)
app.post('/api/users/login',checkSchema(loginValidationSchema),userController.login)
app.get('/api/users',authenticateUser,userController.list)
app.post('/api/groups',authenticateUser,groupController.create)
app.get('/api/groups',authenticateUser,groupController.list)
app.put('/api/groups/:id',authenticateUser,groupController.update)
server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
